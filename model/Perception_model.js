var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PerceptionSchema = new Schema({
    patient_id:String,
    Perception1:{type:Schema.Types.String},
    Perception2:{type:Schema.Types.String},
    Perception3:{type:Schema.Types.String},
    PerceptionExample:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
});

module.exports = mongoose.model('Perception', PerceptionSchema);