var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IllnessSchema = new Schema({
   
    patient_id:String,
    DurationOfCurruntIllness:String,
    CurruntEpisodeNumber:Number,
    ModeOfOnset:String,
    Course:String,
    PredisposingFactors:String,
    PrecipatingFactors:String,
    PrepetuatingFactors:String,
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},





});

module.exports = mongoose.model('Illness', IllnessSchema);