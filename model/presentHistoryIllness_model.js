var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PresentHistorySchema = new Schema({
    patient_id:String,
    history:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
});

module.exports = mongoose.model('PresentHistory', PresentHistorySchema);