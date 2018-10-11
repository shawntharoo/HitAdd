// var mongoose = require('mongoose');
// var Cities = mongoose.model('cities');
var googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API
})
var qs = require('qs');

/**
 * Retrieve ads according to requirement
 *
 * @param req
 * @param res
 */

exports.getNearbyCities = function (req, res) {
    var city = req.query.city;
    googleMapsClient.geocode({
        address: city+', Sri Lanka'
    }, function (err, response) {
        if(!err){
            // console.log(response);
            googleMapsClient.placesNearby({
                location:response.json.results[0].geometry.location,
                radius:10000,
                type:'locality'
            }, function(err,response){
                var outArr = new Array();
                if(!err){
                    
                    var apiRes = response.json.results
                    for(var i=0;i<apiRes.length;i++){
                        outArr.push(apiRes[i].name)
                    }
                    res.status(200).json(outArr)
                }
            })
            
        }
    })
}