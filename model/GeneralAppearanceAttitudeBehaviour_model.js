var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GeneralAtptuSchema = new Schema({
    patient_id:String,
    Appearance:{type:Schema.Types.String},
    LevelofGrooming:{type:Schema.Types.String},
    LevelofCleanliness:{type:Schema.Types.String},
    LevelofConsciousness:{type:Schema.Types.String},
    Gait:{type:Schema.Types.String},
    Posture:{type:Schema.Types.String},
    ModeOfEntry:{type:Schema.Types.String},
    Cooperative:{type:Schema.Types.String},
    EyetoEyeContact:{type:Schema.Types.String},
    Rapport:{type:Schema.Types.String},
    Gesturing:{type:Schema.Types.String},
    OtherMovements:{type:Schema.Types.String},
    otherCatatolicPhemenon:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
    
});

module.exports = mongoose.model('General_Aptitude_Behaviour', GeneralAtptuSchema);