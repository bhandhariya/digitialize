var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComplaintSchema = new Schema({
   
    patient_id:String,
    complain:String,
    createdBy:String,
    creationDate:{type:Schema.Types.Date},
    complain_duration:{type:Schema.Types.String}





});

module.exports = mongoose.model('Complain', ComplaintSchema);