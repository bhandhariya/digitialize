var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AffectSchema = new Schema({
    patient_id:String,
    Subjective:{type:Schema.Types.String},
    Objectivetext:{type:Schema.Types.String},
    Objective:{type:Schema.Types.String},
    Congruence:{type:Schema.Types.String},
    Stability:{type:Schema.Types.String},
    Range:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
    
});

module.exports = mongoose.model('Affect', AffectSchema);