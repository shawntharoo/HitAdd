var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    phone_number: {type: String, required: true, unique: true},
    country_code: {type: String, required: true},
    firstname: String,
    lastname: String,
    password: String,
    favorite : [{type: mongoose.Schema.Types.ObjectId, ref: 'advertisements'}]
});

mongoose.model('User', UserSchema);

