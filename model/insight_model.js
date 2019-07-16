var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InsightSchema = new Schema({
    patient_id:String,
    AwarenessofAbnormalBehaviourExperience:{type:Schema.Types.String},
    AttributiontoPhysicalCause:{type:Schema.Types.String},
    RecognitionofPersonalResponsibility:{type:Schema.Types.String},
    WillingnesstotakeTreatement:{type:Schema.Types.String},
    Grade:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
    
});

module.exports = mongoose.model('Insight', InsightSchema);