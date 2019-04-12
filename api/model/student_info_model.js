var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const AutoIncrement = require('mongoose-sequence')(mongoose);
var studentAddress= require('../model/student_address_model');
var infoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  
  student_name: {
    type: String,
    required: true,
    default: "User12"
  },
  register_number: {
      type: Number,
      required: true,
      default: 1234567890 
  },
  mobile_number: {
    type: Number,
    required: true,
    default: 9597123456
  },
   //address: { type: Schema.Types.ObjectId, ref: studentAddress }
 
}, { collection: 'studentInfo' });


module.exports = mongoose.model('studentInfo', infoSchema);
