var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FamillyHistorySchema = new Schema({
    patient_id:String,
    mentalHistory:{type:Schema.Types.String},
    environHistory:{type:Schema.Types.String},
    attitudeHistory:{type:Schema.Types.String},
    livingHistory:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
    familyTree:{type:Schema.Types.String},
    modifyBy:{type:Schema.Types.String},
    modifyDate:{type:Schema.Types.Date}
    
});

module.exports = mongoose.model('FamilyHistory', FamillyHistorySchema);