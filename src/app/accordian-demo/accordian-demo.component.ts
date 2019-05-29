import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
// import { AngularFireStorage } from "angularfire2/storage";
import { Observable } from 'rxjs';

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
    this.ChiefComplain = this.fb.group({
      id:[''],
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
    this.arout.paramMap.subscribe(e=>{
      this.id=e.get('id')
      console.log(this.id);
    })
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
    console.log(dt);
   
   
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
    console.log(dt)
    // this.Illness.reset({
    //   DurationOfCurruntIllness : '',
    //   CurruntEpisodeNumber : '',
    //   ModeOfOnset:'',
    //   Course:"",
    //   PredisposingFactors : '',
    //   PrecipatingFactors : '',
    //   PrepetuatingFactors : ''
    // });
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
    console.log(dt);
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
    console.log(dt);
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
    console.log(dt);
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
    console.log(dt);
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
    console.log(dt);
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
    console.log(dt);
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
    console.log(dt)
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
    console.log(dt)
    this.HomicideAttempt="";
    this.preMorbidpersonality="";
  }
  Appearance;LevelofGrooming;LevelofCleanliness;LevelofConsciousness;Gait;Posture;ModeOfEntry;Cooperative;EyetoEyeContact;Rapport;Gesturing;
  OtherMovements;otherCatatolicPhemenon
  Appearancechane(){
    // console.log(this.Appearance)
    // console.log(this.LevelofGrooming)
    // console.log(this.LevelofCleanliness)
    // console.log(this.LevelofConsciousness)
    // console.log(this.Gait)
    // console.log(this.Posture)
    // console.log(this.ModeOfEntry)
    // console.log(this.Cooperative)
    //console.log(this.otherCatatolicPhemenon)
  }
  PsychomotorActivity;Initiation;ReactionTime;Speed;LevelofConsciousnessinSpeech;Output;PressureOfSpeech;Volume;Tone;Manner;Relavance;Coherence;Other;example;
  Subjective;Objectivetext;Objective;Congruence;Stability;Range;
}
