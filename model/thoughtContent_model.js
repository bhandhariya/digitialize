var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThoughtContecntSchema = new Schema({
    patient_id:String,
    Stream:{type:Schema.Types.String},
    Form:{type:Schema.Types.String},
    FormExample:{type:Schema.Types.String},
    ThoughtContent:{type:Schema.Types.String},
    ThoughtContentExample:{type:Schema.Types.String},
    First:{type:Schema.Types.String},
    Second:{type:Schema.Types.String},
    Third:{type:Schema.Types.String},
    Fourth:{type:Schema.Types.String},
    Fifth:{type:Schema.Types.String},
    ThoughtContentExample2:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
    
});

module.exports = mongoose.model('ThoughtContent', ThoughtContecntSchema);