var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var appSchema = new Schema({
    phone_number:{type:String},
    ad_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'advertisements' },
    app_date:{type: Date},
    comments:{type:String},
    status:{type: Number},
    adIdStr:{type:String}
    
});
mongoose.model('appointments',appSchema);