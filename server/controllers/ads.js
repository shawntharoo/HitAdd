var mongoose = require('mongoose');
var ads = mongoose.model('advertisements');
var qs = require('qs');
var apps = mongoose.model('appointments');
mongoose.Promise = require('bluebird');
var underscore = require("underscore");
var User = mongoose.model('User');

/**
 * Retrieve ads according to requirement
 *
 * @param req
 * @param res
 */
exports.retrieveAds = function (req, res) {
    console.log(req.body);
    var location = req.body.location.toUpperCase();
    var rooms = req.body.noOfRooms + "";
    var category = req.body.category;
    var type = req.body.type;
    var minArea = req.body.minArea;
    var maxArea = req.body.maxArea;
    var minPrice = req.body.minPrice * 10000;
    var maxPrice = req.body.maxPrice * 10000;
    var phone_number = req.body.phone_number;
    var onlyLastSevenDays = req.body.showLastSeven;

    ads.find({ category: category }).exec(function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).json({ message: err })
        } else {
            var maxminFilter = [];
            var priceorareaFilter = [];
            var filterEbedrooms = [];
            var filterEtype = [];
            var docJson = [];
            var finalResult = [];
            var inData = [];
            var id;
            var item_id;
            var docs_id;

            for (var i = 0; i < docs.length; i++) {
                docJson.push(docs[i]._doc);
            }

            var filterAll = underscore.where(docJson, { location: location, bedrooms: rooms, rent_sale: type });
            if (filterAll != 0) {
                underscore.filter(filterAll, function (item) {
                    if ((item.price[0] >= minPrice && item.price[0] <= maxPrice) && (item.land_size[0] >= minArea && item.land_size[0] <= maxArea)) {
                        maxminFilter.push(item);
                    }
                })
                if (maxminFilter != 0) {
                    // res.status(200).json(maxminFilter);
                    finalResult = maxminFilter;
                } else {
                    underscore.filter(filterAll, function (item) {
                        if ((item.price[0] >= minPrice && item.price[0] <= maxPrice) || (item.land_size[0] >= minArea && item.land_size[0] <= maxArea)) {
                            priceorareaFilter.push(item);
                        }
                    })
                    if (priceorareaFilter != 0) {
                        // res.status(200).json(priceorareaFilter);
                        finalResult = priceorareaFilter;
                    } else {
                        // res.status(200).json(filterAll);
                        finalResult = filterAll;
                    }
                }
            } else {
                var filterEbedrooms = underscore.where(docJson, { location: location, rent_sale: type });
                if (filterEbedrooms != 0) {
                    underscore.filter(filterEbedrooms, function (item) {
                        if ((item.price[0] >= minPrice && item.price[0] <= maxPrice) && (item.land_size[0] >= minArea && item.land_size[0] <= maxArea)) {
                            maxminFilter.push(item);
                        }
                    })

                    if (maxminFilter != 0) {
                        // res.status(200).json(maxminFilter);
                        finalResult = maxminFilter;
                    } else {
                        underscore.filter(filterEbedrooms, function (item) {
                            if ((item.price[0] >= minPrice && item.price[0] <= maxPrice) || (item.land_size[0] >= minArea && item.land_size[0] <= maxArea)) {
                                priceorareaFilter.push(item);
                            }
                        })
                        if (priceorareaFilter != 0) {
                            // res.status(200).json(priceorareaFilter);
                            finalResult = priceorareaFilter;
                        } else {
                            // res.status(200).json(filterEbedrooms);
                            finalResult = filterEbedrooms;
                        }
                    }

                } else {

                    var filterEtype = underscore.where(docJson, { location: location });
                    if (filterEtype != 0) {
                        underscore.filter(filterEtype, function (item) {
                            if ((item.price[0] >= minPrice && item.price[0] <= maxPrice) && (item.land_size[0] >= minArea && item.land_size[0] <= maxArea)) {
                                maxminFilter.push(item);
                            }
                        })

                        if (maxminFilter != 0) {
                            // res.status(200).json(maxminFilter);
                            finalResult = maxminFilter;
                        } else {
                            underscore.filter(filterEtype, function (item) {
                                if ((item.price[0] >= minPrice && item.price[0] <= maxPrice) || (item.land_size[0] >= minArea && item.land_size[0] <= maxArea)) {
                                    priceorareaFilter.push(item);
                                }
                            })
                            if (priceorareaFilter != 0) {
                                // res.status(200).json(priceorareaFilter);
                                finalResult = priceorareaFilter;
                            } else {
                                // res.status(200).json(filterEtype);
                                finalResult = filterEtype;
                            }
                        }

                    } else {
                        // res.status(200).json(docJson);
                        finalResult = docJson;
                    }
                }
            }
            for(var i=0; i<finalResult.length; i++){
                id = finalResult[i]._id;
                inData.push(mongoose.Types.ObjectId(id));
            }
            res.status(200).json(finalResult);
        }
    })
}

/**
 * Retrieve topads
 *
 * @param req
 * @param res
 */
exports.topAds = function (req, res) {
    const aggregatorOpts = [
        {
            $group: {
                _id: "$adIdStr",
                count: { $sum: 1 }
            }
        },
        { "$sort": { count: -1 } },
        { "$limit": 5 }
    ]
    apps.aggregate(aggregatorOpts)
        .then(function (docs) {
            topAdds = [];
            docs.forEach(function (u) {
                topAdds.push(ads.findOne({ _id: mongoose.Types.ObjectId(u._id) }));
            });
            return Promise.all(topAdds);
        }).then(function (listOfAdds) {
            res.send(listOfAdds);
        }).catch(function (error) {
            res.status(500).send('one of the queries failed', error);
        })
}

/**
 * Retrieve favorite ads for each user
 *
 * @param req
 * @param res
 */
exports.favoriteAds = function (req, res) {
    var phone_number = req.body.phone_number;
    User.find({ phone_number: phone_number }).populate('favorite').exec(function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).json({ "error": "error getting appointments" })
        } else {
            res.status(200).json(docs);
        }
    })
}

/**
 * Retrieve favorite ads for each user
 *
 * @param req
 * @param res
 */
exports.addToFavorite = function (req, res) {
    var phone_number = req.body.phone_number;
    var ad_id = req.body.ad_id;
    User.findOneAndUpdate({ phone_number: phone_number, favorite: {$ne : mongoose.Types.ObjectId(ad_id)} }, { $addToSet: { favorite: mongoose.Types.ObjectId(ad_id) } }, { new: true }).exec(function (err, docs) {
        if (err) {
            res.status(500).json({ "message": "error updating favorite" })
        } else {
            res.status(200).json({ "message": "favorite add updated successfully" })
        }
    })
}

/**
 * Retrieve favorite ads for each user
 *
 * @param req
 * @param res
 */
exports.removeFromFavorite = function (req, res) {
    var phone_number = req.body.phone_number;
    var ad_id = req.body.ad_id;
    User.findOneAndUpdate({ phone_number: phone_number }, { $pull: { favorite: mongoose.Types.ObjectId(ad_id) } }, { new: true }).populate('favorite').exec(function (err, docs) {
        if (err) {
            res.status(500).json({ "message": "error deleting favorite" })
        } else {
            res.status(200).json(docs);
        }
    })
}


/**
 * ************************************************************************************************************
 * Retrieve ads according to requirement
 *
 * @param req
 * @param res
 */
exports.retrieveAdsSample = function (req, res) {
    console.log(req.body);
    var location = req.body.location.toUpperCase();
    var rooms = req.body.noOfRooms;
    //var priceRange = req.body.priceRange;
    var category = req.body.category;
    var type = req.body.type;
    //var areaRange = req.body.areaRange;
    var minArea = req.body.minArea;
    var maxArea = req.body.maxArea;
    var minPrice = req.body.minPrice * 10000;
    var maxPrice = req.body.maxPrice * 10000;

    var onlyLastSevenDays = req.body.showLastSeven;
    ads.find({ category: category }).exec(function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).json({ message: err })
        } else {
            var docJson = [];
            var priceJson = [];
            var areaJson = [];
            for (var i = 0; i < docs.length; i++) {
                docJson.push(docs[i]._doc);
            }
            var locationFiltered = underscore.where(docJson, { location: location });
            if (locationFiltered.length != 0) {
                var typeFiltered = underscore.where(locationFiltered, {
                    rent_sale: type
                });
                if (typeFiltered.length != 0) {
                    var bedroomFiltered = underscore.where(typeFiltered, {
                        bedrooms: rooms
                    });
                    if (bedroomFiltered.length != 0) {
                        underscore.filter(bedroomFiltered, function (item) {
                            if (item.price[0] >= minPrice && item.price[0] <= maxPrice) {
                                priceJson.push(item);
                            }
                        })
                        if (priceJson.length != 0) {
                            underscore.filter(priceJson, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(priceJson);
                            }
                        } else {
                            underscore.filter(bedroomFiltered, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(bedroomFiltered);
                            }
                        }

                    } else {
                        underscore.filter(typeFiltered, function (item) {
                            if (item.price[0] >= minPrice && item.price[0] <= maxPrice) {
                                priceJson.push(item);
                            }
                        })
                        if (priceJson.length != 0) {
                            underscore.filter(priceJson, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(priceJson);
                            }
                        } else {
                            underscore.filter(typeFiltered, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(typeFiltered);
                            }
                        }
                    }
                } else {
                    var bedroomFiltered = underscore.where(locationFiltered, {
                        bedrooms: rooms
                    });
                    if (bedroomFiltered.length != 0) {
                        underscore.filter(bedroomFiltered, function (item) {
                            if (item.price[0] >= minPrice && item.price[0] <= maxPrice) {
                                priceJson.push(item);
                            }
                        })
                        if (priceJson.length != 0) {
                            underscore.filter(priceJson, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(priceJson);
                            }
                        } else {
                            underscore.filter(bedroomFiltered, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(bedroomFiltered);
                            }
                        }
                    } else {
                        underscore.filter(locationFiltered, function (item) {
                            if (item.price[0] >= minPrice && item.price[0] <= maxPrice) {
                                priceJson.push(item);
                            }
                        })
                        if (priceJson.length != 0) {
                            underscore.filter(priceJson, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(priceJson);
                            }
                        } else {
                            underscore.filter(locationFiltered, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(locationFiltered);
                            }
                        }
                    }
                }
            } else {
                var typeFiltered = underscore.where(docJson, {
                    rent_sale: type
                });
                if (typeFiltered.length != 0) {
                    var bedroomFiltered = underscore.where(typeFiltered, {
                        bedrooms: rooms
                    });
                    if (bedroomFiltered.length != 0) {
                        underscore.filter(bedroomFiltered, function (item) {
                            if (item.price[0] >= minPrice && item.price[0] <= maxPrice) {
                                priceJson.push(item);
                            }
                        })
                        if (priceJson.length != 0) {
                            underscore.filter(priceJson, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(priceJson);
                            }
                        } else {
                            underscore.filter(bedroomFiltered, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(bedroomFiltered);
                            }
                        }
                    } else {
                        underscore.filter(typeFiltered, function (item) {
                            if (item.price[0] >= minPrice && item.price[0] <= maxPrice) {
                                priceJson.push(item);
                            }
                        })
                        if (priceJson.length != 0) {
                            underscore.filter(priceJson, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(priceJson);
                            }
                        } else {
                            underscore.filter(typeFiltered, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(typeFiltered);
                            }
                        }
                    }
                } else {
                    var bedroomFiltered = underscore.where(docJson, {
                        bedrooms: rooms
                    });
                    if (bedroomFiltered.length != 0) {
                        underscore.filter(bedroomFiltered, function (item) {
                            if (item.price[0] >= minPrice && item.price[0] <= maxPrice) {
                                priceJson.push(item);
                            }
                        })
                        if (priceJson.length != 0) {
                            underscore.filter(priceJson, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(priceJson);
                            }
                        } else {
                            underscore.filter(bedroomFiltered, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(bedroomFiltered);
                            }
                        }
                    } else {
                        underscore.filter(docJson, function (item) {
                            if (item.price[0] >= minPrice && item.price[0] <= maxPrice) {
                                priceJson.push(item);
                            }
                        })
                        if (priceJson.length != 0) {
                            underscore.filter(priceJson, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(priceJson);
                            }
                        } else {
                            underscore.filter(docJson, function (item) {
                                if (item.land_size[0] >= minArea && item.land_size[0] <= maxArea) {
                                    areaJson.push(item);
                                }
                            })
                            if (areaJson.length != 0) {
                                res.status(200).json(areaJson);
                            } else {
                                res.status(200).json(docJson);
                            }
                        }
                    }
                }
            }

        }
    })
}