var Patient=require('../model/patient_model');
var mongoose=require('mongoose');
var Children=require('../model/children_model');
var Complain=require('../model/complain_model');
var Illness=require('../model/illness_model');
var History=require('../model/history_model');
var PresentHistory=require('../model/presentHistoryIllness_model');
var PastHistory=require('../model/pastHostoryIllness_model');
var PastHiHisrotyOfModeOfIntakestory=require('../model/historyOfModeOfIntake_model');
var TreatementHistory=require('../model/treatementHistory_model');
var FamilyHistory=require('../model/familyHistory_model');
var PersonalHistory=require('../model/personalHistory_model');
var SubstaneceHistory=require('../model/substanceHistory_model');
var LegalHistory=require('../model/legalHistory_model');
var GeneralAptitudeBehaviour=require('../model/GeneralAppearanceAttitudeBehaviour_model');
var PsychomotorActivitySpeech=require('../model/PsychomotorActivitySpeech_model');
var Affect=require('../model/affect_model');
var ThoughtContent=require('../model/thoughtContent_model');
var Possession=require('../model/possession_model');
var Perception=require('../model/Perception_model');
var CognitiveFunction=require('../model/congnitiveFunction_model');
var Intelligence=require('../model/intelligence_model');
var Judgement=require('../model/judgement_model');
var Insight=require('../model/insight_model');
var GPE=require('../model/generalPhysicalExamination_model');



exports.createNewPatient=function(req,res,next){
    console.log(req.body)
    var pat=new Patient({
        _id:new mongoose.Types.ObjectId,
        cretatedBy:req.body.cretatedBy,
        cretionTime:Date.now(),
        doctorName:req.body.doctorName,
        addmission_date:req.body.addmissionDate,
        first_name:req.body.firstName,
        last_name:req.body.lastName,
        middle_name:req.body.middleName,
        profile_image:req.body.imageURL,
        permanent_address:req.body.permanentAddress,
        permanent_mobile:req.body.mobileNumber,
        permanent_residance_number:req.body.residanceNumber,
        permanent_landline:req.body.landlineNumber,
        correspondence_address:req.body.correspondenceAddress,
        officeNumber:req.body.officeNumber,
        email:req.body.email,
        DOB:req.body.DOB,
        age:req.body.age,
        sex:req.body.gender,
        marrital_status:req.body.maritalStatus,
        education:req.body.education,
        occupation:req.body.occupation,
        
    });
    pat.save(function(err,patient){
        if(!err && patient){
            res.status(200).send(patient)
        }else{
            res.status(400).send(err);
        }
    })
}


exports.getall=function(req,res,next){

    Patient.find().populate('childrensdetails').exec(function(err,pat){
        if(!err && pat){
            res.send(pat)
        }
    })
}

exports.getpatByID=function(req,res,next){
    var data=req.body;
    Patient.findById(data.data).exec(function(err,pat){
        if(!err && pat){
            res.send(pat)
        }
    })
}


exports.getpatByName=function(req,res,next){
    var data=req.body;
    console.log(data)
    Patient.find({first_name:{$regex:data.name}}).exec(function(err,pat){
        if(!err && pat){
            res.send(pat)
        }else{
            console.log(err)
        }
    })
}

exports.addPersonal=function(req,res,next){
    var data=req.body;
    console.log(data)
    Patient.findByIdAndUpdate(data.id,{
        permanent_address:data.ParmentAddress,
        permanent_mobile:data.Mobile,
        permanent_fax:data.OfficeFax,
        permanent_residance_number:data.Residence,
        permanent_landline:data.Landline,
        correspondence_address:data.CorrespondenceAddress,
        correspondence_mobile:data.Mobile,
        correspondence_fax:data.OfficeFax,
        correspondence_residance_number:data.Residence,
        correspondence_landline:data.Landline,
        email:data.Email,
        DOB:data.DateOfBirth,
        age:data.Age,
        sex:data.Gender,
        marrital_status:data.MaterialStatus,
        education:data.Education,
        occupation:data.Occupation

    }).exec(function(err,patien){
        if(!err && patien){
            res.send(patien)
        }else{
            console.log(err)
        }
    })
}

exports.addFamilyData=function(req,res,next){
    var data=req.body;
    console.log(data)
    

    Patient.findByIdAndUpdate(data.id, {$set:{
    father_name:data.fatherName,
    father_address:data.fatherAddress,
    father_number:data.fatherNumber,
    father_email:data.fatherEmail,
    guardian_name:data.guardianName,
    guardian_contact_number:data.guardianNumber,
    guardian_email:data.guardianEmail,
    guardian_address:data.guardianAddress,
    spouse_name:data.spouseName,
    spouse_age:data.spouseAge,
    spouse_occupation:data.spouseOccupation,
    spouse_address:data.spouseAddress,
    spouse_relation_status:data.relationShipStatus,
    no_of_childern:data.childernsCount,
    lastUpdate:Date.now(),
    updatedBy:data.updatedBy
    }},(err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    
        res.send(doc)
    });
}

exports.addGuardian=function(req,res,next){
    var data=req.body;
    Patient.findByIdAndUpdate(data.id,{
        guardian_name:data.guardian_name,
        guardian_contact_number:data.guardian_contact_number,
        guardian_email:data.guardian_email,
        guardian_address:data.guardian_address
    }).exec(function(err,patien){
        if(!err && patien){
            res.send(patien)
        }else{
            res.send(err)
        }
    })
}

exports.addChildren=function(req,res,next){
    var data=req.body;
    var Child=new Children({
        patient_id:data.id,
        name:data.NameOfChild,
        number:data.ContactNo,
        email:data.Email,
        address:data.Address
    })
    Child.save(function(err,chi){
        if(!err && chi){
            res.send(chi)
        }else{
            res.send(err)
        }
    })
}

exports.addcomplain=function(req,res,next){
    var data = req.body;
    console.log(data);
    var complain=new Complain({
        patient_id:data.id,
        createdBy:data.createdBy,
        creationDate:Date.now(),
        complain:data.ComplaintName,
        complain_duration:data.ComplaintDuration
    })
    complain.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}

exports.addIllness=function(req,res,next){
    var data = req.body;
    console.log(data)
    var ill=new Illness({
        patient_id:data.id,
        DurationOfCurruntIllness:data.DurationOfCurruntIllness,
        CurruntEpisodeNumber:data.CurruntEpisodeNumber,
        ModeOfOnset:data.ModeOfOnset,
        Course:data.Course,
        PredisposingFactors:data.PredisposingFactors,
        PrecipatingFactors:data.PrecipatingFactors,
        PrepetuatingFactors:data.PrepetuatingFactors,
        createdBy:data.createdBy,
        creationDate:Date.now(),
    })
    ill.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}

exports.addHistory=function(req,res,next){
    var data = req.body;
    var his=new History({
        patient_id:data.id,
        History : data.History,
        PsychiatricHistory:data.PsychiatricHistory,
        MedicalSurgicalHistory:data.MedicalSurgicalHistory,
        PresentTreateHistory:data.PresentTreateHistory,
        PastTreateHistory:data.PastTreateHistory,
        FamilyMentalHistory:data.FamilyMentalHistory,
        FamilyEnvironmentHistory:data.FamilyEnvironmentHistory,
        FamilyAttituteHistory:data.FamilyAttituteHistory,
        LivingConditionHistory:data.LivingConditionHistory,
        BirthHistory:data.BirthHistory,
        ImmunizationHistory:data.ImmunizationHistory,
        DevelopmentHistory:data.DevelopmentHistory,
        EducationHistory:data.EducationHistory,
        OccupationHistory:data.OccupationHistory,
        MarritalSexualHistory:data.MarritalSexualHistory,
        MenstrualObstetricHistory:data.MenstrualObstetricHistory,
        HistoryOfChoise:data.HistoryOfChoise,
        HistoryOfTotalDurationOfUse:data.HistoryOfTotalDurationOfUse,
        HistoryOfDurationOfRegularlUse:data.HistoryOfDurationOfRegularlUse,
        HistoryOfDailyIntake:data.HistoryOfDailyIntake,
        HistoryofLastIntakeOfDrug:data.HistoryofLastIntakeOfDrug,
        HistoryOfModeOfIntake:data.HistoryOfModeOfIntake,   
        HomosideAttepts:data.HomosideAttepts,
        PreMorbidPersonality:data.PreMorbidPersonality  
    })
    his.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })

}


exports.addPresentHistory=function(req,res){
    var data=req.body;
    console.log(data)
    var history=new PresentHistory({
        patient_id:data.id,
        history:data.history,
        createdBy:data.createdBy,
        creationDate:Date.now()
    });
    history.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })

}


exports.addPastHistory=function(req,res){
    var data=req.body;
    var history=new PastHistory({
        patient_id:data.id,
        history:data.history,
        createdBy:data.createdBy,
        creationDate:Date.now()
    });
    history.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}


exports.AddHistoryOfModeOfIntake=function(req,res){
    var data=req.body;
    console.log(data)
    var history=new PastHiHisrotyOfModeOfIntakestory({
        patient_id:data.id,
        PsychatricHistory:data.PsychiatricHistory,
        MedicalHistory:data.MedicalcHistory,
        createdBy:data.createdBy,
        creationDate:Date.now()
    })
    console.log(history)
    history.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}



exports.TestAPI=function(req,res){
    var data=req.body;
    console.log(data)
    var obj=new Perception({
    patient_id:data.id,
    Perception1:data.Perception1,
    Perception2:data.Perception2,
    Perception3:data.Perception2,
    PerceptionExample:data.PerceptionExample,
    createdBy:data.createdBy,
    creationDate:Date.now()
    })
    console.log(obj);
    obj.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}

exports.addTreatementHistory=function(req,res){
    var data=req.body;
    console.log(data)
    var history=new TreatementHistory({
        patient_id:data.id,
        PresentTreatementHistory:data.PresentTreatementHistory,
        PastTreatementHistory:data.PastTreatementHistory,
        createdBy:data.createdBy,
        creationDate:Date.now()
        
    })
    history.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}

exports.addFamilyHistory=function(req,res){
    var data=req.body;
    console.log(data)
    var history=new FamilyHistory({
        patient_id:data.id,
        mentalHistory:data.mental,
        environHistory:data.environment,
        attitudeHistory:data.attitute,
        livingHistory:data.living,
        createdBy:data.createdBy,
        creationDate:Date.now(),
        familyTree:data.familyTree
    })
    history.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}

exports.addPersonalHistory=function(req,res){
    var data=req.body;
    console.log(data)
    var history=new PersonalHistory({
        patient_id:data.id,
        BirthHistory:data.Birth,
    ImmunizationHistory:data.Immunization,
    DevelopmentHistory:data.Development,
    EducationHistory:data.Education,
    OccupationHistory:data.Occupation,
    MarritalHistory:data.Marrital,
    SexualHistory:data.Sexual,
    MenstrualandobstetricHistory:data.Menstrualandobstetric,
    createdBy:data.createdBy,
    creationDate:Date.now()
    })
    history.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}


exports.addSubstanceHistory=function(req,res){
    var data=req.body;
    console.log(data)
    var history=new SubstaneceHistory({
        patient_id:data.id,
        HistoryOfChoiseOfSubstance:data.HistoryOfChoiseOfSubstance,
        HistoryOfTotalDurationOfUse:data.HistoryOfTotalDurationOfUse,
        HistoryOfDurationOfRegularUse:data.HistoryOfDurationOfRegularUse,
        HistoryOfDailyIntake:data.HistoryOfDailyIntake,
        HistoryOfLastIntakeOfDrug:data.HistoryOfLastIntakeOfDrug,
        createdBy:data.createdBy,
        creationDate:Date.now()
    })
    history.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}

exports.addLegalHistory=function(req,res){
    var data=req.body;
    console.log(data)
    var history=new LegalHistory({
        patient_id:data.id,
        HomicideAttempt:data.HomicideAttempt,
        preMorbidpersonality:data.preMorbidpersonality,
        createdBy:data.createdBy,
        creationDate:Date.now()
    })
    history.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}


exports.deleteAllDB=function(req,res){
    Patient.remove(function(err,pat){
        if(!err && pat){
            console.log(pat)
        }else{
            console.log(err)
        }
    })
}

exports.getAlldatafortable=function(req,res){
    Patient.findById(req.body.id)
    .populate('childrensdetails')
    .populate('Complaintsdetails')
    .populate('Illnessdetails')
    .populate('PresentHistoryDetails')
    .populate('PastHistoryDetails')
    .populate('PastHiHisrotyOfModeOfIntakestorydetails')
    .populate('TreateMentHistoryDetails')
    .populate('FamilyHistoryDetails')
    .populate('PersonalHistoryDetails')
    .populate('SubstanceHistoryDetails')
    .populate('LegalHistoryDetails')
    .populate('generalAptitudeBehaviourDetails')
    .populate('PsychomotorActivitySpeechDetails')
    .populate('AffectsDetails')
    .populate('ThoughtContentDetails')
    .populate('PossessionDetails')
    .populate('PerceptionDetails')
    .populate('CognitiveFunctionDetails')
    .populate('IntelligenceDetails')
    .populate('JudgementDetails')
    .populate('InsightDetails')
    .populate('GPEDetails')
    .exec(function(err,pat){
        if(pat){
            res.send(pat)
        }
    })
}

exports.getPatientCount=function(req,res){
    Patient.countDocuments(function(err,pat){
        if(pat){
            res.send({pat:pat})
        }else{
            console.log(err)
        }
    })
}

exports.addGeneralAptitudeBehaviour=function(req,res){
    var data=req.body;
    console.log(data)
    var obj=new GeneralAptitudeBehaviour({
        patient_id:data.id,
        Appearance:data.Appearance,
      LevelofGrooming:data.LevelofGrooming,
      LevelofCleanliness:data.LevelofCleanliness,
      LevelofConsciousness:data.LevelofConsciousness,
      Gait:data.Gait,
      Posture:data.Posture,
      ModeOfEntry:data.ModeOfEntry,
      Cooperative:data.Cooperative,
      EyetoEyeContact:data.EyetoEyeContact,
      Rapport:data.Rapport,
      Gesturing:data.Gesturing,
      OtherMovements:data.OtherMovements,
      otherCatatolicPhemenon:data.otherCatatolicPhemenon,
      createdBy:data.createdBy,
      creationDate:Date.now()
    })
    obj.save(function(err,com){
        if(!err && com){
            res.send(com)
        }else{
            console.log(err)
        }
    })
}


exports.addPsychomotorActivitySpeech=function(req,res){
    var data=req.body;
   
    var obj=new PsychomotorActivitySpeech({
        patient_id:data.id,
        PsychomotorActivity:data.PsychomotorActivity,
        Initiation:data.Initiation,
        ReactionTime:data.ReactionTime,
        Speed:data.Speed,
        LevelofConsciousnessinSpeech:data.LevelofConsciousnessinSpeech,
        Output:data.Output,
        PressureOfSpeech:data.PressureOfSpeech,
        Volume:data.Volume,
        Tone:data.Tone,
        Manner:data.Manner,
        Relavance:data.Relavance,
        Coherence:data.Coherence,
        Other:data.Other,
        example:data.example,
        createdBy:data.createdBy,
        creationDate:Date.now()
    })
   
    obj.save(function(err,com){
        if(!err && com){
            console.log(com)
            res.send(com)
        }else{
            console.log(err)
        }
    })
}


exports.addAffect=function(req,res){
    var data=req.body;
   
    var obj=new Affect({
        patient_id:data.id,
        Subjective:data.Subjective,
        Objectivetext:data.Objectivetext,
        Objective:data.Objective,
        Congruence:data.Congruence,
        Stability:data.Stability,
        Range:data.Range,
        createdBy:data.createdBy,
        creationDate:Date.now()
       
    })
   
    obj.save(function(err,com){
        if(!err && com){
            console.log(com)
            res.send(com)
        }else{
            console.log(err)
        }
    })
}


exports.addThoughtContent=function(req,res){
    var data=req.body;
   console.log(data)
    var obj=new ThoughtContent({
        patient_id:data.id,
        Stream:data.Stream,
        Form:data.Form,
        FormExample:data.FormExample,
        ThoughtContent:data.ThoughtContent,
        ThoughtContentExample:data.ThoughtContentExample,
        First:data.First,
        Second:data.Second,
        Third:data.Third,
        Fourth:data.Fourth,
        Fifth:data.Fifth,
        ThoughtContentExample2:data.ThoughtContentExample2,
        createdBy:data.createdBy,
        creationDate:Date.now()
       
    })
   
    obj.save(function(err,com){
        if(!err && com){
            console.log(com)
            res.send(com)
        }else{
            console.log(err)
        }
    })
}

exports.addPossession=function(req,res){
    var data=req.body;
   console.log(data)
    var obj=new Possession({
        patient_id:data.id,
        Obsession:data.Obsession,
        Complusion:data.Complusion,
        ObsessiveCompulsive:data.ObsessiveCompulsive,
        ThoughtAlienationPhenomenon:data.ThoughtAlienationPhenomenon,
        ThoughtAlienationPhenomenonExample:data.ThoughtAlienationPhenomenonExample,
        createdBy:data.createdBy,
        creationDate:Date.now()
       
    })
   
    obj.save(function(err,com){
        if(!err && com){
            console.log(com)
            res.send(com)
        }else{
            console.log(err)
        }
    })
}


exports.addCongnitiveFunction=function(req,res,next){
    var data=req.body;
    console.log(data);
   
    var obj=new CognitiveFunction({
        patient_id:data.id,
        ConsciousLevel:data.ConsciousLevel,
  Attention:data.Attention,
  AttentionDigitForward:data.AttentionDigitForward,
  AttentionDigitBackward:data.AttentionDigitBackward,
  Concentration:data.Concentration,
  ConcentrationSerialSubstraction:data.ConcentrationSerialSubstraction,
  Orientation:data.Orientation,
  OrientationTime:data.OrientationTime,
  OrientationTimeCheck:data.OrientationTimeCheck,
  OrientationPlace:data.OrientationPlace,
  OrientationPlaceCheck:data.OrientationPlaceCheck,
  OrientationPerson:data.OrientationPerson,
  OrientationPersonCheck:data.OrientationPersonCheck,
  Memory:data.Memory,
  RecentVerbalRecall3ObjAfter5Minut:data.RecentVerbalRecall3ObjAfter5Minut,
  RecentVerbalRecall3ObjAfter10Minut:data.RecentVerbalRecall3ObjAfter10Minut,
  RecentVerbalRecall5ObjAfter5Minut:data.RecentVerbalRecall5ObjAfter5Minut,
  RecentVerbalRecall5ObjAfter10Minut:data.RecentVerbalRecall5ObjAfter10Minut,
  RecentVisualRecallAfter5Minut:data.RecentVisualRecallAfter5Minut,
  RecentVisualRecallAfter10Minut:data.RecentVisualRecallAfter10Minut,
  RemotePersonalEvents:data.RemotePersonalEvents,
  RemoteImPersonalEvents:data.RemoteImPersonalEvents,
  RemoteIllnessRelatedEvents:data.RemoteIllnessRelatedEvents,
  createdBy:data.createdBy,
  creationDate:Date.now()
    })
    obj.save(function(err,result){
        if(!err && result){
            res.send(result)
        }else{
            console.log(err)
        }
    })
}

exports.addIntelligence=function(req,res,next){
    var data=req.body;
    console.log(data);
   
    var obj=new Intelligence({
        patient_id:data.id,
        IntelligenceComprehension:data.IntelligenceComprehension,
        IntelligenceComprehensionCheck:data.IntelligenceComprehensionCheck,
        IntelligenceVocabulary:data.IntelligenceVocabulary,
        IntelligenceVocabularyCheck:data.IntelligenceVocabularyCheck,
        GeneralFundofInformation:data.GeneralFundofInformation,
        GeneralFundofInformationCheck:data.GeneralFundofInformationCheck,
        ArithmeticAbility:data.ArithmeticAbility,
        ArithmeticAbilityCheck:data.ArithmeticAbilityCheck,
        Abstraction:data.Abstraction,
        InterpretationofProverb:data.InterpretationofProverb,
        SimilaritiesbetweenPairedObject:data.SimilaritiesbetweenPairedObject,
        DIsSimilaritiesbetweenPairedObject:data.DIsSimilaritiesbetweenPairedObject,
        createdBy:data.createdBy,
        creationDate:Date.now()
        
    })
    obj.save(function(err,result){
        if(!err && result){
            res.send(result)
        }else{
            console.log(err)
        }
    })
}


exports.addJudgement=function(req,res,next){
    var data=req.body;
    console.log(data);
   
    var obj=new Judgement({
        patient_id:data.id,
        JudgementPerosnal:data.JudgementPerosnal,
        JudgementSocial:data.JudgementSocial,
        JudgementTest:data.JudgementTest,
        createdBy:data.createdBy,
        creationDate:Date.now()
        
        
    })
    obj.save(function(err,result){
        if(!err && result){
            res.send(result)
        }else{
            console.log(err)
        }
    })
}

exports.addInsight=function(req,res,next){
    var data=req.body;
    console.log(data);
   
    var obj=new Insight({
        patient_id:data.id,
        AwarenessofAbnormalBehaviourExperience:data.AwarenessofAbnormalBehaviourExperience,
      AttributiontoPhysicalCause:data.AttributiontoPhysicalCause,
      RecognitionofPersonalResponsibility:data.RecognitionofPersonalResponsibility,
      WillingnesstotakeTreatement:data.WillingnesstotakeTreatement,
      Grade:data.Grade,
      createdBy:data.createdBy,
      creationDate:Date.now()
        
        
    })
    obj.save(function(err,result){
        if(!err && result){
            res.send(result)
        }else{
            console.log(err)
        }
    })
}

exports.addGPE=function(req,res,next){
    var data=req.body;
    console.log(data);
   
    var obj=new GPE({
        patient_id:data.id,
        GPEConsciousness:data.GPEConsciousness,
        GPEBuilt:data.GPEBuilt,
        GPEInspection:data.GPEInspection,
        GPEPluse:data.GPEPluse,
        GPERespiration:data.GPERespiration,
        GPEBodyTemperature:data.GPEBodyTemperature,
        GPEBloodPressure:data.GPEBloodPressure,
        RespiratorySystem:data.RespiratorySystem,
        CardioVescularSystem:data.CardioVescularSystem,
        GPEGastroIntestinalSystem:data.GPEGastroIntestinalSystem,
        CentralNervousSystem:data.CentralNervousSystem,
        createdBy:data.createdBy,
        creationDate:Date.now()
        
        
    })
    obj.save(function(err,result){
        if(!err && result){
            res.send(result)
        }else{
            console.log(err)
        }
    })
}

exports.addPatPerception=function(req,res){
    var data=req.body;
    console.log(data)
}

exports.EditPresentHistory=function(req,res){
    var data=req.body;
    PresentHistory.findByIdAndUpdate(data.id,{history:data.history}).exec(function(err,DOC){
        if(DOC){
           res.send(DOC)
        }else{
            console.log(err)
        }
    })
  }


  exports.editPastHistory=function(req,res){
    var data=req.body;
    console.log(data)
    PastHiHisrotyOfModeOfIntakestory.findByIdAndUpdate(data.id,{
        ModifyBy:data.modifyBy,
        modifyDate:Date.now(),
        PsychatricHistory:data.PsychatricHistory,
        MedicalHistory:data.MedicalHistory,
    }).exec(function(err,DOC){
        if(DOC){
           res.send(DOC)
        }else{
            console.log(err)
        }
    })
  }

  exports.editTreatementHistory=function(req,res){
    var data=req.body;
    console.log(data)
    TreatementHistory.findByIdAndUpdate(data.id,{
        ModifyBy:data.modifyBy,
        modifyDate:Date.now(),
        PresentTreatementHistory:data.PresentHistory,
        PastTreatementHistory:data.PastHistory,
    }).exec(function(err,DOC){
        if(DOC){
           res.send(DOC)
        }else{
            console.log(err)
        }
    })
  }

  exports.editFamilyHistoryHistory=function(req,res){
    var data=req.body;
    console.log(data)
    FamilyHistory.findByIdAndUpdate(data.id,{
        ModifyBy:data.modifyBy,
        modifyDate:Date.now(),
        mentalHistory:data.mentalHistory,
        environHistory:data.environHistory,
        attitudeHistory:data.attitudeHistory,
        livingHistory:data.livingHistory
    }).exec(function(err,DOC){
        if(DOC){
           res.send(DOC)
        }else{
            console.log(err)
        }
    })
  }


  exports.editPersonalHistory=function(req,res){
    var data=req.body;
    console.log(data)
    PersonalHistory.findByIdAndUpdate(data.id,{
        ModifyBy:data.modifyBy,
        modifyDate:Date.now(),
        BirthHistory:data.BirthHistory,
    ImmunizationHistory:data.ImmunizationHistory,
    DevelopmentHistory:data.DevelopmentHistory,
    EducationHistory:data.EducationHistory,
    OccupationHistory:data.OccupationHistory,
    MarritalHistory:data.MarritalHistory,
    SexualHistory:data.SexualHistory,
    MenstrualandobstetricHistory:data.MenstrualandobstetricHistory,
    }).exec(function(err,DOC){
        if(DOC){
           res.send(DOC)
        }else{
            console.log(err)
        }
    })
  }

  exports.editsubstanceHistory=function(req,res){
    var data=req.body;
    console.log(data)
    SubstaneceHistory.findByIdAndUpdate(data.id,{
        ModifyBy:data.modifyBy,
        modifyDate:Date.now(),
        HistoryOfChoiseOfSubstance:data.HistoryOfChoiseOfSubstance,
        HistoryOfTotalDurationOfUse:data.HistoryOfTotalDurationOfUse,
        HistoryOfDurationOfRegularUse:data.HistoryOfDurationOfRegularUse,
        HistoryOfDailyIntake:data.HistoryOfDailyIntake,
        HistoryOfLastIntakeOfDrug:data.HistoryOfLastIntakeOfDrug,
    }).exec(function(err,DOC){
        if(DOC){
           res.send(DOC)
        }else{
            console.log(err)
        }
    })
  }

  exports.editLegalHistory=function(req,res){
    var data=req.body;
    console.log(data)
    LegalHistory.findByIdAndUpdate(data.id,{
        ModifyBy:data.modifyBy,
        modifyDate:Date.now(),
        HomicideAttempt:data.HomicideAttempt,
        preMorbidpersonality:data.preMorbidpersonality,
        
    }).exec(function(err,DOC){
        if(DOC){
           res.send(DOC)
        }else{
            console.log(err)
        }
    })
  }