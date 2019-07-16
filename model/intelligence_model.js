var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IntelligenceSchema = new Schema({
    patient_id:String,
    IntelligenceComprehension:{type:Schema.Types.String},
    IntelligenceComprehensionCheck:{type:Schema.Types.String},
    IntelligenceVocabulary:{type:Schema.Types.String},
    IntelligenceVocabularyCheck:{type:Schema.Types.String},
    GeneralFundofInformation:{type:Schema.Types.String},
    GeneralFundofInformationCheck:{type:Schema.Types.String},
    ArithmeticAbility:{type:Schema.Types.String},
    ArithmeticAbilityCheck:{type:Schema.Types.String},
    Abstraction:{type:Schema.Types.String},
    InterpretationofProverb:{type:Schema.Types.String},
    SimilaritiesbetweenPairedObject:{type:Schema.Types.String},
    DIsSimilaritiesbetweenPairedObject:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
    
});

module.exports = mongoose.model('Intelligence', IntelligenceSchema);