var express = require('express');
require('dotenv').config();
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({ session: expressSession });
require('./model/auth_model.js')
require('./model/user_model.js');
require('./model/ad_model.js');
require('./model/appointment_model.js');

var cors = require('cors');

console.log("Logged in as - "+process.env.MONGO_USER)

var options = {
    user : process.env.MONGO_USER,
    pass : process.env.MONGO_PASS
}
var server = require('http').Server(app);

//mongoose.connect(process.env.MONGO_URL,options);
mongoose.connect(process.env.MONGO_URL,options)
var db = mongoose.connection;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(
    expressSession(
        {
            'secret': 'SUPERSECRET',
            resave: true,
            saveUninitialized: true
        }
    )
);
db.once('open', function (err) {
    if (err) {
        console.log("Error Opening the DB Connection: ", err);
        return;
    }
    app.use(expressSession({
        secret: 'SUPERSECRET',
        cookie: { maxAge: 60 * 60 * 1000 },
        store: new mongoStore({
            db: mongoose.connection.db,
            collection: 'sessions'
        }),
        resave: true,
        saveUninitialized: true
    }));
    var port = '1500' || 5151;
    server.listen(port);
    console.log("Magic happening on port " + port);
});

var router = express.Router();
var auth = require('./controllers/auth');
var ads = require('./controllers/ads');
var apps = require('./controllers/appointments');
var cities = require('./controllers/cities');

router.route('/auth/register').post(auth.requestPhoneVerification);
router.route('/auth/verify').post(auth.verifyPhoneToken);
router.route('/auth/login').post(auth.login);
router.route('/ads/getads').post(ads.retrieveAds);
router.route('/ads/favorites').post(ads.favoriteAds);
router.route('/ads/addToFavorites').post(ads.addToFavorite);
router.route('/ads/removeFavorites').post(ads.removeFromFavorite);
router.route('/ads/topads').get(ads.topAds);
router.route('/app/addAppointment').post(apps.addAppointments);
router.route('/app/getAppointment').post(apps.getAppointments);
router.route('/app/changeAppointmentStatus').post(apps.changeAppointmentStatus);

router.route('/ads/cities').get(cities.getNearbyCities);

app.use('/api',router);

