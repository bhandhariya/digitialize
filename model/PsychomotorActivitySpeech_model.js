var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PsychometriActivitySpeechAchema = new Schema({
    patient_id:String,
    PsychomotorActivity:{type:Schema.Types.String},
    Initiation:{type:Schema.Types.String},
    ReactionTime:{type:Schema.Types.String},
    Speed:{type:Schema.Types.String},
    LevelofConsciousnessinSpeech:{type:Schema.Types.String},
    Output:{type:Schema.Types.String},
    PressureOfSpeech:{type:Schema.Types.String},
    Volume:{type:Schema.Types.String},
    Tone:{type:Schema.Types.String},
    Manner:{type:Schema.Types.String},
    Relavance:{type:Schema.Types.String},
    Coherence:{type:Schema.Types.String},
    Other:{type:Schema.Types.String},
    example:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
});

module.exports = mongoose.model('PsychometricActivitySpeech', PsychometriActivitySpeechAchema);