var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LegalHistorySchema = new Schema({
    patient_id:String,
    HomicideAttempt:{type:Schema.Types.String},
    preMorbidpersonality:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
    modifyBy:{type:Schema.Types.String},
    modifyDate:{type:Schema.Types.Date}
    
});

module.exports = mongoose.model('LegalHistory', LegalHistorySchema);