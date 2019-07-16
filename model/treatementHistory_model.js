var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TreateMentHistorySchema = new Schema({
    patient_id:String,
    PresentTreatementHistory:{type:Schema.Types.String},
    PastTreatementHistory:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
    modifyBy:{type:Schema.Types.String},
    modifyDate:{type:Schema.Types.Date}
});

module.exports = mongoose.model('TreatementHistory', TreateMentHistorySchema);