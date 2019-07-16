var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GPESchema = new Schema({
    patient_id:String,
    GPEConsciousness:{type:Schema.Types.String},
    GPEBuilt:{type:Schema.Types.String},
    GPEInspection:{type:Schema.Types.String},
    GPEPluse:{type:Schema.Types.String},
    GPERespiration:{type:Schema.Types.String},
    GPEBodyTemperature:{type:Schema.Types.String},
    GPEBloodPressure:{type:Schema.Types.String},
    RespiratorySystem:{type:Schema.Types.String},
    CardioVescularSystem:{type:Schema.Types.String},
    GPEGastroIntestinalSystem:{type:Schema.Types.String},
    CentralNervousSystem:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
    
});

module.exports = mongoose.model('GPE', GPESchema);