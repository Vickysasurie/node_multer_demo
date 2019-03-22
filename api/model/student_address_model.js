var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var addressSchema = new Schema({
    _id: Schema.Types.ObjectId,
    state:String,
    city:String,
    village:String
},{collection:'studentAddress'})



module.exports=mongoose.model('studentAddress',addressSchema);