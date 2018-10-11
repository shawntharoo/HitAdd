var crypto = require('crypto');
var mongoose = require('mongoose');
var Auth = mongoose.model('Auth');
var User = mongoose.model('User');
var qs = require('qs');

const Client = require('authy-client').Client;
const authy = new Client({ key: process.env.AUTHY_API });
var phoneReg = require('../lib/phone_verification')(process.env.AUTHY_API);
function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

/**
 * Register a phone
 *
 * @param req
 * @param res
 */
exports.requestPhoneVerification = function (req, res) {
    var phone_number = req.body.phone_number;
    var country_code = req.body.country_code;
    var via = 'sms';

    console.log("body: ", req.body);

    if (phone_number && country_code && via) {
        phoneReg.requestPhoneVerification(phone_number, country_code, via, function (err, response) {
            if (err) {
                console.log('error creating phone reg request', err);
                res.status(500).json(err);
            } else {
                console.log('Success register phone API call: ', response);
                res.status(200).json(response);
            }
        });
    } else {
        console.log('Failed in Register Phone API Call', req.body);
        res.status(500).json({ message: "Fields are missing" });
    }

};
/**
 * Confirm a phone registration token
 *
 * @param req
 * @param res
 */
exports.verifyPhoneToken = function (req, res) {
    var country_code = req.body.country_code;
    var phone_number = req.body.phone_number;
    var token = req.body.token;
    var firstname = req.body.first_name;
    var lastname = req.body.last_name;
    var password = req.body.password;

    if (phone_number && country_code && token) {
        phoneReg.verifyPhoneToken(phone_number, country_code, token, function (err, response) {
            if (err) {
                console.log('error creating phone reg request', err);
                res.status(500).json(err);
            } else {
                console.log('Confirm phone success confirming code: ', response);
                if (response.success) {

                    User.findOne({ phone_number: phone_number }).exec(function (err, user) {
                        if (err) {
                            console.log('find existing user error', err);
                            res.status(500).json(err);
                            return;
                        }
                        if (user) {
                            User.findOneAndUpdate({ phone_number: phone_number }, { $set: { country_code: country_code, firstname: firstname, lastname: lastname, password: hashPW(password) } }, { new: true }, function (err, doc) {
                                if (err) {
                                    console.log('Error Updating User', err);
                                    res.status(500).json(err);
                                } else {
                                    res.status(200).json(doc);
                                }
                            });
                        } else {
                            user = new User({ phone_number: phone_number });
                            user.set('country_code', country_code);
                            user.set('firstname', firstname);
                            user.set('lastname', lastname);
                            user.set('password', hashPW(password));
                            user.save(function (err, doc) {
                                if (err) {
                                    console.log('Error Creating User', err);
                                    res.status(500).json(err);
                                } else {
                                    res.status(200).json(doc);
                                }
                            });
                        }
                    });

                    req.session.ph_verified = true;
                } else {
                    res.status(200).json(response);
                }
            }

        });
    } else {
        console.log('Failed in Confirm Phone request body: ', req.body);
        res.status(500).json({ message: "Missing fields" });
    }
};

exports.login = function (req, res) {
    var country_code = req.body.country_code;
    var phone_number = req.body.phone_number;
    var password = req.body.password;

    User.findOne({phone_number:phone_number}).exec(function(err,user){
        if (!user) {
            err = 'Username Not Found';
        } else if (('password' in req.body) && (user.password !==
            hashPW(req.body.password.toString()))) {
            err = 'Wrong Password';
        } else {
            createSession(req, res, user);
        }

        if (err) {
            res.status(500).json(err);
        }
    })
};
function createSession(req, res, user) {
    req.session.regenerate(function () {
        req.session.loggedIn = true;
        // req.session.user = user.id;
        req.session.username = user.phone_number;
        req.session.msg = 'Authenticated as: ' + user.phone_number;
        res.status(200).json({message:"login success"});
    });
}