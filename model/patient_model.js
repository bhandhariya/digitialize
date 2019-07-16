var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    _id:{type:Schema.Types.ObjectId,required:true},
    cretatedBy:{type:Schema.Types.String,},
    cretionTime:{type:Schema.Types.Date},
    doctorName:{type:Schema.Types.String,required:true},
    addmission_date:{type:Schema.Types.Date},
    first_name:{type:Schema.Types.String},
    middle_name:{type:Schema.Types.String},
    last_name:{type:Schema.Types.String},
    profile_image:{type:Schema.Types.String},
    permanent_address:{type:Schema.Types.String},
    permanent_mobile:{type:Schema.Types.Number,required:true,unique:true},
    // permanent_fax:{type:Schema.Types.Number},
    permanent_residance_number:{type:Schema.Types.Number},
    permanent_landline:{type:Schema.Types.Number},
    correspondence_address:{type:Schema.Types.String},
    // correspondence_mobile:{type:Schema.Types.Number},
    // correspondence_fax:{type:Schema.Types.Number},
    // correspondence_residance_number:{type:Schema.Types.Number},
    // correspondence_landline:{type:Schema.Types.Number},
    officeNumber:{type:Schema.Types.Number},
    email:{type:Schema.Types.String},
    DOB:{type:Schema.Types.Date},
    age:{type:Schema.Types.Number},
    sex:{type:Schema.Types.String},
    marrital_status:{type:Schema.Types.String},
    education:{type:Schema.Types.String},
    occupation:{type:Schema.Types.String},

    ///done
    father_name:{type:Schema.Types.String},
    father_address:{type:Schema.Types.String},
    father_number:{type:Schema.Types.Number},
    father_email:{type:Schema.Types.String},
    guardian_name:{type:Schema.Types.String},
    guardian_contact_number:{type:Schema.Types.Number},
    guardian_email:{type:Schema.Types.String},
    guardian_address:{type:Schema.Types.String},
    spouse_name:{type:Schema.Types.String},
    spouse_age:{type:Schema.Types.Number},
    spouse_occupation:{type:Schema.Types.String},
    spouse_address:{type:Schema.Types.String},
    spouse_relation_status:{type:Schema.Types.String},
    no_of_childern:{type:Schema.Types.Number},
    lastUpdate:{type:Schema.Types.Date},
    updatedBy:{type:Schema.Types.String}





},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

PatientSchema.virtual('childrensdetails',{
    ref:'Children',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('Complaintsdetails',{
    ref:'Complain',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('Illnessdetails',{
    ref:'Illness',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('PresentHistoryDetails',{
    ref:'PresentHistory',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('PastHistoryDetails',{
    ref:'PastHistory',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('PastHiHisrotyOfModeOfIntakestorydetails',{
    ref:'PastHiHisrotyOfModeOfIntakestory',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('TreateMentHistoryDetails',{
    ref:'TreatementHistory',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('FamilyHistoryDetails',{
    ref:'FamilyHistory',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})


PatientSchema.virtual('PersonalHistoryDetails',{
    ref:'PersonalHistory',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})


PatientSchema.virtual('SubstanceHistoryDetails',{
    ref:'SubstanceHistory',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})


PatientSchema.virtual('LegalHistoryDetails',{
    ref:'LegalHistory',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('generalAptitudeBehaviourDetails',{
    ref:'General_Aptitude_Behaviour',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})


PatientSchema.virtual('PsychomotorActivitySpeechDetails',{
    ref:'PsychometricActivitySpeech',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})


PatientSchema.virtual('AffectsDetails',{
    ref:'Affect',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('ThoughtContentDetails',{
    ref:'ThoughtContent',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})


PatientSchema.virtual('PossessionDetails',{
    ref:'Possession',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('PerceptionDetails',{
    ref:'Perception',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})


PatientSchema.virtual('CognitiveFunctionDetails',{
    ref:'CognitiveFunction',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})


PatientSchema.virtual('IntelligenceDetails',{
    ref:'Intelligence',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('JudgementDetails',{
    ref:'Judgement',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('InsightDetails',{
    ref:'Insight',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})

PatientSchema.virtual('GPEDetails',{
    ref:'GPE',
    localField: '_id',
    foreignField: 'patient_id',
    justOne: false
})



module.exports = mongoose.model('Patient', PatientSchema);