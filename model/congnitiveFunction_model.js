var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CognitiveFunctionSchema = new Schema({
    patient_id:String,
    ConsciousLevel:{type:Schema.Types.String},
    Attention:{type:Schema.Types.String},
    AttentionDigitForward:{type:Schema.Types.String},
    AttentionDigitBackward:{type:Schema.Types.String},
    Concentration:{type:Schema.Types.String},
    ConcentrationSerialSubstraction:{type:Schema.Types.String},
    Orientation:{type:Schema.Types.String},
    OrientationTime:{type:Schema.Types.String},
    OrientationTimeCheck:{type:Schema.Types.String},
    OrientationPlace:{type:Schema.Types.String},
    OrientationPlaceCheck:{type:Schema.Types.String},
    OrientationPerson:{type:Schema.Types.String},
    OrientationPersonCheck:{type:Schema.Types.String},
    RecentMemoryAfter5Mint:{type:Schema.Types.String},
    RecentMemoryAfter10Mint:{type:Schema.Types.String},
    RecentVerbalRecall3ObjAfter5Minut:{type:Schema.Types.String},
    RecentVerbalRecall3ObjAfter10Minut:{type:Schema.Types.String},
    RecentVerbalRecall5ObjAfter5Minut:{type:Schema.Types.String},
    RecentVerbalRecall5ObjAfter10Minut:{type:Schema.Types.String},
    RecentVisualRecallAfter5Minut:{type:Schema.Types.String},
    RecentVisualRecallAfter10Minut:{type:Schema.Types.String},
    RemotePersonalEvents:{type:Schema.Types.String},
    RemoteImPersonalEvents:{type:Schema.Types.String},
    RemoteIllnessRelatedEvents:{type:Schema.Types.String},
    createdBy:{type:Schema.Types.String},
    creationDate:{type:Schema.Types.Date},
});

module.exports = mongoose.model('CognitiveFunction', CognitiveFunctionSchema);