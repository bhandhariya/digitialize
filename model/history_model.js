var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
    patient_id:String,
    History:{type:Schema.Types.String},
    PsychiatricHistory:{type:Schema.Types.String},
    MedicalSurgicalHistory:{type:Schema.Types.String},
    PresentTreateHistory:{type:Schema.Types.String},
    PastTreateHistory:{type:Schema.Types.String},
    FamilyMentalHistory:{type:Schema.Types.String},
    FamilyEnvironmentHistory:{type:Schema.Types.String},
    FamilyAttituteHistory:{type:Schema.Types.String},
    LivingConditionHistory:{type:Schema.Types.String},
    BirthHistory:{type:Schema.Types.String},
    ImmunizationHistory:{type:Schema.Types.String},
    DevelopmentHistory:{type:Schema.Types.String},
    EducationHistory:{type:Schema.Types.String},
    OccupationHistory:{type:Schema.Types.String},
    MarritalSexualHistory:{type:Schema.Types.String},
    MenstrualObstetricHistory:{type:Schema.Types.String},
    HistoryOfChoise:{type:Schema.Types.String},
    HistoryOfTotalDurationOfUse:{type:Schema.Types.String},
    HistoryOfDurationOfRegularlUse:{type:Schema.Types.String},
    HistoryOfDailyIntake:{type:Schema.Types.String},
    HistoryofLastIntakeOfDrug:{type:Schema.Types.String},
    HistoryOfModeOfIntake:{type:Schema.Types.String},
    HomosideAttepts:{type:Schema.Types.String},
    PreMorbidPersonality:{type:Schema.Types.String},
});

module.exports = mongoose.model('History', HistorySchema);