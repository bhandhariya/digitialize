var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChildernSchema = new Schema({
   
    patient_id:String,
    name:String,
    number:{type:Schema.Types.Number},
    email:String,
    address:String





});

module.exports = mongoose.model('Children', ChildernSchema);