var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdSchema = new Schema({
    bedrooms: { type: String },
    ad_id: { type: String },
    price: { type: Array },
    land_size: { type: Array },
    contact: { type: Array },
    description: {type: String},
    location: {type: String},
    category: {type: String},
    bathrooms: {type: String},
    rent_sale: {type : String},
    house_size: {type: Array}
});
mongoose.model('advertisements',AdSchema);