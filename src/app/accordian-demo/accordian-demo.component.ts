import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-accordian-demo',
  templateUrl: './accordian-demo.component.html',
  styleUrls: ['./accordian-demo.component.css']
})
export class AccordianDemoComponent implements OnInit {
  id;
  datePickerConfig: Partial<BsDatepickerConfig>;
  ChiefComplain: any;
  Illness:any;
  public loading = false;
  @ViewChild('ChiefForm') ChiefForm;
  @ViewChild('IllnessForm') IllnessForm;
  validationMessages  = {
    'ComplaintName' : {
                    'required': 'First Name is Required',
                    'minlength': '5 Characters is Required'
                  },
    'ComplaintDuration':{
      'required': 'First Name is Required',
    }
   
};

IllnessvalidationMessages  = {
  'DurationOfCurruntIllness' : {
    'required': 'DurationOfCurruntIllness is Required'
  },
'CurruntEpisodeNumber' : {
  'required': 'CurruntEpisodeNumber  is Required'
},
'ModeOfOnset' : {
  'required': 'ModeOfOnset is Required'
},
'Course' : {
'required': 'Course is Required'
},
'PredisposingFactors' : {
'required': 'PredisposingFactors is Required'
},
'PrecipatingFactors' : {
'required': 'PrecipatingFactors Age is Required'
},
'PrepetuatingFactors' : {
            'required': 'PrepetuatingFactors is Required'
          }
};

IllnessformErrors = {
  'DurationOfCurruntIllness' : '',
  'CurruntEpisodeNumber' : '',
  'ModeOfOnset' : '',
  'Course' : '',
  'PredisposingFactors' : '',
  'PrecipatingFactors' : '',
  'PrepetuatingFactors' : ''
};


formErrors = {
          'ComplaintName' : '',
          'ComplaintDuration' : ''
};
submmited: boolean = false;
  constructor(@Inject(HttpClient) public http,   private router:Router,private fb: FormBuilder,private arout:ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      });
   }

  ngOnInit() {
    this.arout.paramMap.subscribe(e=>{
      this.id=e.get('id')
      console.log(this.id);
    })
    this.ChiefComplain = this.fb.group({
      id:[this.id],
      ComplaintName : ['',[Validators.required]],
      ComplaintDuration : ['',[Validators.required]]
    
    });
    this.Illness = this.fb.group({
      id:[''],
      DurationOfCurruntIllness : ['',[Validators.required]],
      CurruntEpisodeNumber : ['',[Validators.required]],
      ModeOfOnset : ['',[Validators.required]],
      Course : ['',[Validators.required]],
      PredisposingFactors : ['',[Validators.required]],
      PrecipatingFactors : ['',[Validators.required]],
      PrepetuatingFactors : ['',[Validators.required]]
    });

    this.ChiefComplain.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
    this.Illness.valueChanges.subscribe(value =>{
      this.IllnesslogValidationMessages();
    });
   
    this.ChiefComplain.get('id').setValue(this.id);
    this.Illness.get('id').setValue(this.id)
  }
  chiefComplaintSubmit(formData){
    this.submmited = true;
   
    this.logValidationMessages();
    if(this.ChiefComplain.valid && this.ChiefComplain.get('id')!=""){
      console.log(formData);

     
     this.http.post('https://digitalapp001.herokuapp.com/api/pat/addcomplain',formData).subscribe(this.ChiefcomplainCB)
    }
  }
  ChiefcomplainCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.submmited = false;
    this.ChiefComplain.reset({id:this.id});
   this.ChiefForm.resetForm({
     id:this.id
   });
  }
  IllnessonSubmit(formData){
    this.submmited = true;
    this.IllnesslogValidationMessages();
    if(this.Illness.valid){
      console.log(formData);
         this.http.post('https://digitalapp001.herokuapp.com/api/pat/addIllness',formData).subscribe(this.Illnesscb)
    }
  }
  Illnesscb=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.submmited=false;
    this.Illness.reset({
      id:this.id
    });
    this.IllnessForm.resetForm();
  }

  logValidationMessages(group: FormGroup = this.ChiefComplain): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
        this.formErrors[key] = '';
          if (abstractControl && !abstractControl.valid && (abstractControl.touched || this.submmited)) {
            const messages = this.validationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
              }
            }
          }
          if (abstractControl instanceof FormGroup) {
            this.logValidationMessages(abstractControl);
          } 
      });
  }
  IllnesslogValidationMessages(group: FormGroup = this.Illness): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
        this.IllnessformErrors[key] = '';
          if (abstractControl && !abstractControl.valid && (abstractControl.touched || this.submmited)) {
            const messages = this.IllnessvalidationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.IllnessformErrors[key] += messages[errorKey] + ' ';
              }
            }
          }
          if (abstractControl instanceof FormGroup) {
            this.logValidationMessages(abstractControl);
          } 
      });
  }

  HistoryOfPresentIllness;
  addHistoryOfPresentIllness(){
    var obj={
      id:this.id,
      history:this.HistoryOfPresentIllness
    }
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPresentHistory',obj).subscribe(this.addHistoryOfPresentIllnessCB)
    
  }
  addHistoryOfPresentIllnessCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.HistoryOfPresentIllness=""
  }
  HistoryOfPastIllness;
  addHistoryOfPastIllness(){
    var obj={
      id:this.id,
      history:this.HistoryOfPastIllness
    }
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPastHistory',obj).subscribe(this.addHistoryOfPastIllnessCB)    
  }
  addHistoryOfPastIllnessCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.HistoryOfPastIllness=""
  }
  MedicalcHistory;PsychiatricHistory;
  addHistoryOfModeOfIntake(){
    var obj={
      id:this.id,
      psy:this.PsychiatricHistory,
      med:this.MedicalcHistory
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addHistoryOfModeOfIntake',obj).subscribe(this.addHistoryOfModeOfIntakeCB)
  }
  addHistoryOfModeOfIntakeCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.MedicalcHistory="";
    this.PsychiatricHistory=""
  }
  PresentTreateMent;PastTreateMent;
  addTreatementHostory(){
    var obj={
      id:this.id,
      Present:this.PresentTreateMent,
      Past:this.PastTreateMent
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addTreatementHistory',obj).subscribe(this.addTreatementHostoryCB)
  }
  addTreatementHostoryCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.PresentTreateMent="";
    this.PastTreateMent=""
  }
  mental;environment;attitute;living;
  addFamilyHistory(){
    var obj={
      id:this.id,
      mental:this.mental,
      environment:this.environment,
      attitute:this.attitute,
      living:this.living
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addFamilyHistory',obj).subscribe(this.addFamilyHistoryCB)
  }
  addFamilyHistoryCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.mental="";
    this.environment="";
    this.attitute="";
    this.living="";
    
  }
  Birth;Immunization;Development;Education;Occupation;MarritalandSexual;Menstrualandobstetric;
  addPersonalHistory(){
    var obj={
      id:this.id,
      Birth:this.Birth,
      Immunization:this.Immunization,
      Development:this.Development,
      Education:this.Education,
      Occupation:this.Occupation,
      MarritalandSexual:this.MarritalandSexual,
      Menstrualandobstetric:this.Menstrualandobstetric
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPersonalHistory',obj).subscribe(this.addPersonalHistoryCB)
  }
  addPersonalHistoryCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.Birth="";
    this.Immunization="";
    this.Development="";
    this.Education="";
    this.Occupation="";
    this.MarritalandSexual="";
    this.Menstrualandobstetric="";
  }
  HistoryOfChoiseOfSubstance;HistoryOfTotalDurationOfUse;HistoryOfDurationOfRegularUse;HistoryOfDailyIntake;HistoryOfLastIntakeOfDrug;
  addSubstanceHistory(){
    var obj={
      id:this.id,
      HistoryOfChoiseOfSubstance:this.HistoryOfChoiseOfSubstance,
      HistoryOfTotalDurationOfUse:this.HistoryOfTotalDurationOfUse,
      HistoryOfDurationOfRegularUse:this.HistoryOfDurationOfRegularUse,
      HistoryOfDailyIntake:this.HistoryOfDailyIntake,
      HistoryOfLastIntakeOfDrug:this.HistoryOfLastIntakeOfDrug
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addSubstanceHistory',obj).subscribe(this.addSubstanceHistoryCB)
  }
  addSubstanceHistoryCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.HistoryOfChoiseOfSubstance="";
    this.HistoryOfTotalDurationOfUse="";
    this.HistoryOfDurationOfRegularUse="";
    this.HistoryOfDailyIntake="";
    this.HistoryOfLastIntakeOfDrug="";
  }
  HomicideAttempt;preMorbidpersonality;
  addLegalHistory(){
    var obj={
      id:this.id,
      HomicideAttempt:this.HomicideAttempt,
      preMorbidpersonality:this.preMorbidpersonality
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addLegalHistory',obj).subscribe(this.addLegalHistoryCB)
  }
  addLegalHistoryCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.HomicideAttempt="";
    this.preMorbidpersonality="";
  }
  Appearance;LevelofGrooming;LevelofCleanliness;LevelofConsciousness;Gait;Posture;ModeOfEntry;Cooperative;EyetoEyeContact;Rapport;Gesturing;
  OtherMovements;otherCatatolicPhemenon
  addGeneralAppearanceAttitudeBehaviour(){
    var obj={
      id:this.id,
      Appearance:this.Appearance,
      LevelofGrooming:this.LevelofGrooming,
      LevelofCleanliness:this.LevelofCleanliness,
      LevelofConsciousness:this.LevelofConsciousness,
      Gait:this.Gait,
      Posture:this.Posture,
      ModeOfEntry:this.ModeOfEntry,
      Cooperative:this.Cooperative,
      EyetoEyeContact:this.EyetoEyeContact,
      Rapport:this.Rapport,
      Gesturing:this.Gesturing,
      OtherMovements:this.OtherMovements,
      otherCatatolicPhemenon:this.otherCatatolicPhemenon

    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addGeneralAptitudeBehaviour',obj).subscribe(this.addGeneralAppearanceAttitudeBehaviourCB)
  }
  addGeneralAppearanceAttitudeBehaviourCB=(dt)=>{
   
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    }
      this.Appearance="";
      this.LevelofGrooming="",
      this.LevelofCleanliness="",
      this.LevelofConsciousness="",
      this.Gait="",
      this.Posture="",
      this.ModeOfEntry="",
      this.Cooperative="",
      this.EyetoEyeContact="",
      this.Rapport="",
      this.Gesturing="",
      this.OtherMovements="",
      this.otherCatatolicPhemenon=""
  }

  PsychomotorActivity;Initiation;ReactionTime;Speed;LevelofConsciousnessinSpeech;Output;PressureOfSpeech;Volume;Tone;Manner;Relavance;Coherence;Other;example;

  addPsychomotorActivitySpeech(){
    var obj={
      id:this.id,
      PsychomotorActivity:this.PsychomotorActivity,
      Initiation:this.Initiation,
      ReactionTime:this.ReactionTime,
      Speed:this.Speed,
      LevelofConsciousnessinSpeech:this.LevelofConsciousnessinSpeech,
      Output:this.Output,
      PressureOfSpeech:this.PressureOfSpeech,
      Volume:this.Volume,
      Tone:this.Tone,
      Manner:this.Manner,
      Relavance:this.Relavance,
      Coherence:this.Coherence,
      Other:this.Other,
      example:this.example

    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPsychomotorActivitySpeech',obj).subscribe(this.addPsychomotorActivitySpeechCB)
  }
  addPsychomotorActivitySpeechCB=(dt)=>{
    
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    }
      this.PsychomotorActivity="",
      this.Initiation="",
      this.ReactionTime="",
      this.Speed="",
      this.LevelofConsciousnessinSpeech="",
      this.Output="",
      this.PressureOfSpeech="",
      this.Volume="",
      this.Tone="",
      this.Manner="",
      this.Relavance="",
      this.Coherence="",
      this.Other="",
      this.example=""
      
  }


  Subjective;Objectivetext;Objective;Congruence;Stability;Range;

  addAffect(){
    var obj={
      id:this.id,
      Subjective:this.Subjective,
      Objectivetext:this.Objectivetext,
      Objective:this.Objective,
      Congruence:this.Congruence,
      Stability:this.Stability,
      Range:this.Range
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addAffect',obj).subscribe(this.addAffectCB)
  }
  addAffectCB=(dt)=>{
    console.log(dt)
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.Subjective="",
      this.Objectivetext="",
      this.Objective="",
      this.Congruence="",
      this.Stability="",
      this.Range=""
    }
  }
  Stream;Form;FormExample;ThoughtContent;ThoughtContentExample;First;Second;Third;Fourth;Fifth;ThoughtContentExample2;
  
  addThoughtContent(){
    var obj={
      id:this.id,
      Stream:this.Stream,
      Form:this.Form,
      FormExample:this.FormExample,
      ThoughtContent:this.ThoughtContent,
      ThoughtContentExample:this.ThoughtContentExample,
      First:this.First,
      Second:this.Second,
      Third:this.Third,
      Fourth:this.Fourth,
      Fifth:this.Fifth,
      ThoughtContentExample2:this.ThoughtContentExample2
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addThoughtContent',obj).subscribe(this.addThoughtContentCB)
  }
  addThoughtContentCB=(dt)=>{
    console.log(dt)
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.Stream="",
      this.Form="",
      this.FormExample="",
      this.ThoughtContent="",
      this.ThoughtContentExample="",
      this.First="",
      this.Second="",
      this.Third="",
      this.Fourth="",
      this.Fifth="",
      this.ThoughtContentExample2=""
    }
  }
  
  
  Obsession;Complusion;ObsessiveCompulsive;
  ThoughtAlienationPhenomenon;ThoughtAlienationPhenomenonExample;
  addPossession(){
    var obj={
      id:this.id,
      Obsession:this.Obsession,
      Complusion:this.Complusion,
      ObsessiveCompulsive:this.ObsessiveCompulsive,
      ThoughtAlienationPhenomenon:this.ThoughtAlienationPhenomenon,
      ThoughtAlienationPhenomenonExample:this.ThoughtAlienationPhenomenonExample
    }
    console.log(obj);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPossession',obj).subscribe(this.addPossessionCB)
  }
  addPossessionCB=(dt)=>{
    console.log(dt)
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.Obsession="",
      this.Complusion="",
      this.ObsessiveCompulsive="",
      this.ThoughtAlienationPhenomenon="",
      this.ThoughtAlienationPhenomenonExample=""
    }
  }



  Perception1;Perception2;Perception3;PerceptionExample;
  addPerception(){
    var obj={
      id:this.id,
      Perception1:this.Perception1,
      Perception2:this.Perception2,
      Perception3:this.Perception3,
      PerceptionExample:this.PerceptionExample
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/test',obj).subscribe(this.addPerceptionCB)
  }
  addPerceptionCB=(dt)=>{
   
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.Perception1="",
      this.Perception2="",
      this.Perception3="",
      this.PerceptionExample=""
    }
  }

  ConsciousLevel;Attention;AttentionDigitForward;AttentionDigitBackward;Concentration;ConcentrationSerialSubstraction;Orientation;OrientationTime;OrientationTimeCheck;
  OrientationPlace;OrientationPlaceCheck;OrientationPerson;OrientationPersonCheck;
  Memory;
  RecentVerbalRecall3ObjAfter5Minut;RecentVerbalRecall3ObjAfter10Minut;RecentVerbalRecall5ObjAfter5Minut;RecentVerbalRecall5ObjAfter10Minut;
  RecentVisualRecallAfter5Minut;RecentVisualRecallAfter10Minut;
  RemotePersonalEvents;RemoteImPersonalEvents;RemoteIllnessRelatedEvents;

  addCognitiveFunction(){
  var obj={
  id:this.id,
  ConsciousLevel:this.ConsciousLevel,
  Attention:this.Attention,
  AttentionDigitForward:this.AttentionDigitForward,
  AttentionDigitBackward:this.AttentionDigitBackward,
  Concentration:this.Concentration,
  ConcentrationSerialSubstraction:this.ConcentrationSerialSubstraction,
  Orientation:this.Orientation,
  OrientationTime:this.OrientationTime,
  OrientationTimeCheck:this.OrientationTimeCheck,
  OrientationPlace:this.OrientationPlace,
  OrientationPlaceCheck:this.OrientationPlaceCheck,
  OrientationPerson:this.OrientationPerson,
  OrientationPersonCheck:this.OrientationPersonCheck,
  Memory:this.Memory,
  RecentVerbalRecall3ObjAfter5Minut:this.RecentVerbalRecall3ObjAfter5Minut,
  RecentVerbalRecall3ObjAfter10Minut:this.RecentVerbalRecall3ObjAfter10Minut,
  RecentVerbalRecall5ObjAfter5Minut:this.RecentVerbalRecall5ObjAfter5Minut,
  RecentVerbalRecall5ObjAfter10Minut:this.RecentVerbalRecall5ObjAfter10Minut,
  RecentVisualRecallAfter5Minut:this.RecentVisualRecallAfter5Minut,
  RecentVisualRecallAfter10Minut:this.RecentVisualRecallAfter10Minut,
  RemotePersonalEvents:this.RemotePersonalEvents,
  RemoteImPersonalEvents:this.RemoteImPersonalEvents,
  RemoteIllnessRelatedEvents:this.RemoteIllnessRelatedEvents
  }
  console.log(obj)
  this.http.post('https://digitalapp001.herokuapp.com/api/pat/addCongnitiveFunction',obj).subscribe(this.addCognitiveFunctionCB)
  }
  addCognitiveFunctionCB=(dt)=>{
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    if(dt){
  this.ConsciousLevel="",
  this.Attention="",
  this.AttentionDigitForward="",
  this.AttentionDigitBackward="",
  this.Concentration="",
  this.ConcentrationSerialSubstraction="",
  this.Orientation="",
  this.OrientationTime="",
  this.OrientationTimeCheck="",
  this.OrientationPlace="",
  this.OrientationPlaceCheck="",
  this.OrientationPerson="",
  this.OrientationPersonCheck="",
  this.Memory="",
  this.RecentVerbalRecall3ObjAfter5Minut="",
  this.RecentVerbalRecall3ObjAfter10Minut="",
  this.RecentVerbalRecall5ObjAfter5Minut="",
  this.RecentVerbalRecall5ObjAfter10Minut="",
  this.RecentVisualRecallAfter5Minut="",
  this.RecentVisualRecallAfter10Minut="",
  this.RemotePersonalEvents="",
  this.RemoteImPersonalEvents="",
  this.RemoteIllnessRelatedEvents=""
    }
    
  }
  


  IntelligenceComprehension;IntelligenceComprehensionCheck;
  IntelligenceVocabulary;IntelligenceVocabularyCheck;
  GeneralFundofInformation;GeneralFundofInformationCheck;
  ArithmeticAbility;ArithmeticAbilityCheck;
  Abstraction;InterpretationofProverb;SimilaritiesbetweenPairedObject;DIsSimilaritiesbetweenPairedObject;
  addIntelligence(){
    var obj={
      id:this.id,
      IntelligenceComprehension:this.IntelligenceComprehension,
      IntelligenceComprehensionCheck:this.IntelligenceComprehensionCheck,
      IntelligenceVocabulary:this.IntelligenceVocabulary,
      IntelligenceVocabularyCheck:this.IntelligenceVocabularyCheck,
      GeneralFundofInformation:this.GeneralFundofInformation,
      GeneralFundofInformationCheck:this.GeneralFundofInformationCheck,
      ArithmeticAbility:this.ArithmeticAbility,
      ArithmeticAbilityCheck:this.ArithmeticAbilityCheck,
      Abstraction:this.Abstraction,
      InterpretationofProverb:this.InterpretationofProverb,
      SimilaritiesbetweenPairedObject:this.SimilaritiesbetweenPairedObject,
      DIsSimilaritiesbetweenPairedObject:this.DIsSimilaritiesbetweenPairedObject
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addIntelligence',obj).subscribe(this.addIntelligenceCB)
  }

  addIntelligenceCB=(dt)=>{
   
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    if(dt){
      this.IntelligenceComprehension="",
      this.IntelligenceComprehensionCheck="",
      this.IntelligenceVocabulary="",
      this.IntelligenceVocabularyCheck="",
      this.GeneralFundofInformation="",
      this.GeneralFundofInformationCheck="",
      this.ArithmeticAbility="",
      this.ArithmeticAbilityCheck="",
      this.Abstraction="",
      this.InterpretationofProverb="",
      this.SimilaritiesbetweenPairedObject="",
      this.DIsSimilaritiesbetweenPairedObject=""
    }
  }

  JudgementPerosnal;JudgementSocial;JudgementTest;

  addJudgement(){
    var obj={
      id:this.id,
      JudgementPerosnal:this.JudgementPerosnal,
      JudgementSocial:this.JudgementSocial,
      JudgementTest:this.JudgementTest
    }
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addJudgement',obj).subscribe(this.JudgementCB)
  }
  JudgementCB=(dt)=>{
    
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.JudgementPerosnal="",
      this.JudgementSocial="",
      this.JudgementTest=""
    }
  }


  AwarenessofAbnormalBehaviourExperience;AttributiontoPhysicalCause;RecognitionofPersonalResponsibility;WillingnesstotakeTreatement;Grade;
  addInsight(){
    var obj={
      id:this.id,
      AwarenessofAbnormalBehaviourExperience:this.AwarenessofAbnormalBehaviourExperience,
      AttributiontoPhysicalCause:this.AttributiontoPhysicalCause,
      RecognitionofPersonalResponsibility:this.RecognitionofPersonalResponsibility,
      WillingnesstotakeTreatement:this.WillingnesstotakeTreatement,
      Grade:this.Grade
    }
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addInsight',obj).subscribe(this.addInsightCB)

  }
  addInsightCB=(dt)=>{
   
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
  this.AwarenessofAbnormalBehaviourExperience=""
  this.AttributiontoPhysicalCause=""
  this.RecognitionofPersonalResponsibility=""
  this.WillingnesstotakeTreatement=""
  this.Grade=""
    }
  }


  GPEConsciousness;GPEBuilt;GPEInspection;GPEPluse;GPERespiration;GPEBodyTemperature;GPEBloodPressure;
  RespiratorySystem;CardioVescularSystem;GPEGastroIntestinalSystem;CentralNervousSystem;

  addGeneralPhysicalExamination(){
    var obj={
      id:this.id,
      GPEConsciousness:this.GPEConsciousness,
      GPEBuilt:this.GPEBuilt,
      GPEInspection:this.GPEInspection,
      GPEPluse:this.GPEPluse,
      GPERespiration:this.GPERespiration,
      GPEBodyTemperature:this.GPEBodyTemperature,
      GPEBloodPressure:this.GPEBloodPressure,
      RespiratorySystem:this.RespiratorySystem,
      CardioVescularSystem:this.CardioVescularSystem,
      GPEGastroIntestinalSystem:this.GPEGastroIntestinalSystem,
      CentralNervousSystem:this.CentralNervousSystem
    }
    console.log(obj)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addGPE',obj).subscribe(this.addGeneralAppearanceAttitudeBehaviourCB)

    }
      addGeneralPhysicalExaminationCB=(dt)=>{
        if(dt){
          Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
          this.GPEConsciousness=""
          this.GPEBuilt=""
          this.GPEInspection=""
          this.GPEPluse=""
          this.GPERespiration=""
          this.GPEBodyTemperature=""
          this.GPEBloodPressure=""
          this.RespiratorySystem=""
          this.CardioVescularSystem=""
          this.GPEGastroIntestinalSystem=""
          this.CentralNervousSystem=""
    
        }
      }
}
