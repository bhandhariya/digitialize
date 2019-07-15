import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-accordian-demo',
  templateUrl: './accordian-demo.component.html',
  styleUrls: ['./accordian-demo.component.css']
})
export class AccordianDemoComponent implements OnInit {
  form:FormGroup;
  Streamorders=[
    {id:'Normal',name:'Normal'},
    {id:'Circumstantial',name:'Circumstantial'},
    {id:'Tengential',name:'Tengential'},
    {id:'Abnormal',name:'Abnormal'}
  ];
  Formorders=[
    {id:'Adequate',name:'Adequate'},
    {id:'Inadequate',name:'Inadequate'},
    {id:'Omission',name:'Omission'},
    {id:'Fusion',name:'Fusion'},
    {id:'Derailment',name:'Derailment'},
    {id:'Substitution',name:'Substitution'}
  ]
  PredisposingFactorsPresentvar;
  PredisposingFactorsPresent(u){
    if(u.PredisposingFactors=="Present"){
      console.log(u.PredisposingFactors)
      this.PredisposingFactorsPresentvar=1
    }else{
      console.log(u.PredisposingFactors)
      this.PredisposingFactorsPresentvar=""
    }
  };
  PrecipitatingFactorsPresentvar;
  PrecipitatingFactorsPresent(u){
    if(u.PrecipatingFactors=="Present"){
      console.log(u.PrecipatingFactors)
      this.PrecipitatingFactorsPresentvar=1
    }else{
      console.log(u.PrecipatingFactors)
      this.PrecipitatingFactorsPresentvar=""
    }
  };
  PerpetuatingFactorsPresentvar;
  PerpetuatingFactorsPresent(u){
    if(u.PrepetuatingFactors=="Present"){
      console.log(u.PrepetuatingFactors)
      this.PerpetuatingFactorsPresentvar=1
    }else{
      console.log(u.PrepetuatingFactors)
      this.PerpetuatingFactorsPresentvar=""
    }
  };
  // OtherMovements;
  // OtherMovementsPresent(u){
  //   if(u.PrepetuatingFactors=="Present"){
  //     console.log(u.PrepetuatingFactors)
  //     this.PerpetuatingFactorsPresentvar=1
  //   }else{
  //     console.log(u.PrepetuatingFactors)
  //     this.PerpetuatingFactorsPresentvar=""
  //   }
  // };
  VarCheckPAOtherMovements;
  CheckPAOtherMovements(u){
    if(u=="Present"){
      this.VarCheckPAOtherMovements="";
    }else{
      this.VarCheckPAOtherMovements=1;
    }
  }
  VarCheckPAOtherCatatonicPhenomenonMovements;
  CheckPAOtherCatatonicPhenomenonMovements(u){
    if(u=="Present"){
      this.VarCheckPAOtherCatatonicPhenomenonMovements="";
    }else{
      this.VarCheckPAOtherCatatonicPhenomenonMovements=1;
    }
  }
  varPsychomotorActivity='raja';
  changeIncreasePsychomotorActivity(){
    this.varPsychomotorActivity=""

  }
  uploadFamilyTree(event){
    const file = event.target.files[0];
    console.log(file);
    var randomString=Math.floor(Date.now() / 1000);
    const filePath = 'familyTree'+randomString;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    task.snapshotChanges().pipe(
      finalize(() =>{ var url = fileRef.getDownloadURL()
        url.subscribe(e=>{
          console.log(e)
         this.FamilyHistoryForm.get('familyTree').setValue(e)
        })
      } )
   )
  .subscribe(e=>{
    
  })

  }
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
  constructor(@Inject(HttpClient) public http,   private router:Router,private fb: FormBuilder,private arout:ActivatedRoute,
  private storage:AngularFireStorage) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      });
     
   
   }
   

  
  myForm = this.fb.group({
    useremail: this.fb.array([])
  });
  streamchekForm= this.fb.group({
    useremail: this.fb.array([])
  });
  thoughtContentcheckForm=this.fb.group({
    useremail: this.fb.array([])
  });
  onChange(name:string, isChecked: boolean) {
    const emailFormArray = <FormArray>this.myForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.ThoughtContentForm.get('Form').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }
  streamChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.streamchekForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.ThoughtContentForm.get('Stream').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }
  ThoughtContentOrder=[
    {id:'Normal',name:'Idea'},
    {id:'Circumstantial',name:'Over Valued Ideas'},
    {id:'Tengential',name:'Delusion'},
    {id:'Abnormal',name:'Somatic Proccupation'},
    {id:'Tengential',name:'Sucidal Ideation'},
    {id:'Abnormal',name:'Depressive Cognition'}
  ];
  ThoughtContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.thoughtContentcheckForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.ThoughtContentForm.get('ThoughtContent').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }
  FirstThoughtContentOrder=[
    {id:'Worthlessness',name:'Worthlessness'},
    {id:'Hopelessness',name:'Hopelessness'},
    {id:'Helpnessness',name:'Helpnessness'},
    {id:'Guilt',name:'Guilt'},
    {id:'Ill Health',name:'Ill Health'},
    {id:'Poverty',name:'Poverty'}
  ];
  FirstThoughtContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  FirstThoughtContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.FirstThoughtContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.ThoughtContentForm.get('First').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }
  SecondThoughtContentOrder=[
    {id:'Nihilistic',name:'Nihilistic'},
    {id:'Hypocondrical',name:'Hypocondrical'},
    {id:'Death Wish',name:'Death Wish'},
    {id:'Sucidial Ideas',name:'Sucidial Ideas'},
    {id:'Grandiose Ability and Indentity',name:'Grandiose Ability and Indentity'}
  ];
  SecondThoughtContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  SecondThoughtContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.SecondThoughtContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.ThoughtContentForm.get('Second').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }
  
  ThirdThoughtContentOrder=[
    {id:'Nihilistic',name:'Reference'},
    {id:'Hypocondrical',name:'Control'},
    {id:'Death Wish',name:'Influence'},
    {id:'Sucidial Ideas',name:'Persecution'},
    {id:'Grandiose Ability and Indentity',name:'Bodily Change'},
    {id:'',name:'Bizarre'},
    {id:'',name:'Religious'},
  ];
  ThirdThoughtContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  ThirdThoughtContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.ThirdThoughtContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.ThoughtContentForm.get('Third').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  FourthThoughtContentOrder=[
    {id:'Nihilistic',name:'Fentastic Delusion'},
    {id:'Hypocondrical',name:'Delusional Memory'},
    {id:'Death Wish',name:'Delusional Confabulation'}
  ];
  FourthThoughtContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  FourthThoughtContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.FourthThoughtContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.ThoughtContentForm.get('Fourth').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  FifthThoughtContentOrder=[
    {id:'Nihilistic',name:'Single'},
    {id:'Hypocondrical',name:'Multiple'},
    {id:'Death Wish',name:'Simple'},
    {id:'Nihilistic',name:'Elaborate'},
    {id:'Hypocondrical',name:'Systematized'},
    {id:'Death Wish',name:'Non-Systematized'},
    {id:'Nihilistic',name:'Mood Congruent'},
    {id:'Hypocondrical',name:'Incongruent'},
    {id:'Death Wish',name:'Degree of Distress'},
    {id:'Nihilistic',name:'Interference With Work'},
    {id:'Hypocondrical',name:'Reaction to Phenomenon'},
    {id:'Death Wish',name:'Primary Delusion'},
    {id:'Death Wish',name:'Secondry Delusion'},
  ];
  FifthThoughtContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  FifthThoughtContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.FifthThoughtContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.ThoughtContentForm.get('Fifth').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }
  ObsessionContentOrder=[
    {id:'Nihilistic',name:'Thought'},
    {id:'Hypocondrical',name:'Doubt'},
    {id:'Death Wish',name:'Impluse Stepping'},
    {id:'Nihilistic',name:'Image'},
    {id:'Hypocondrical',name:'Rumination'},
    {id:'Death Wish',name:'Absent'}
  ];
  ObsessionContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  ObsessionContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.ObsessionContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.PossessionForm.get('Obsession').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  CompulsionContentOrder=[
    {id:'Nihilistic',name:'Yielding'},
    {id:'Hypocondrical',name:'Controlling'},
    {id:'Death Wish',name:'Cognitive Compulsion'}
  ];
  CompulsionContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  CompulsionContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.CompulsionContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.PossessionForm.get('Complusion').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  ThoughtAlienationPhenomenonContentOrder=[
    {id:'Nihilistic',name:'Thought Insertion'},
    {id:'Hypocondrical',name:'Withdrawal'},
    {id:'Death Wish',name:'Thought Broadcast'},
    {id:'Death Wish',name:'Thought Commentry'}
  ];
  ThoughtAlienationPhenomenonContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  ThoughtAlienationPhenomenonContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.ThoughtAlienationPhenomenonContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.PossessionForm.get('ThoughtAlienationPhenomenon').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }


  Perception1ContentOrder=[
    {id:'Nihilistic',name:'Pseudo Hallucination/Illusion'},
    {id:'Hypocondrical',name:'Hallucination'}
  ];
  Perception1ContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  Perception1ContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.Perception1ContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.PerceptionForm.get('Perception1').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  Perception2ContentOrder=[
    {id:'Nihilistic',name:'Auditory'},
    {id:'Hypocondrical',name:'Visual'},
    {id:'Nihilistic',name:'Olfactory'},
    {id:'Hypocondrical',name:'Gustatory'},
    {id:'Nihilistic',name:'Tactile'},
    {id:'Hypocondrical',name:'Somatic'},
  ];
  Perception2ContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  Perception2ContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.Perception2ContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.PerceptionForm.get('Perception2').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  Perception3ContentOrder=[
    {id:'Nihilistic',name:'Depersonalization'},
    {id:'Hypocondrical',name:'Derelization'},
    {id:'Hypocondrical',name:'Illusion'}
  ];
  Perception3ContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  Perception3ContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.Perception3ContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.PerceptionForm.get('Perception3').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }


  OrientationTimeContentOrder=[
    {id:'Nihilistic',name:'Approximate Time'},
    {id:'Hypocondrical',name:'Day-Night'},
    {id:'Hypocondrical',name:'Date'},
    {id:'Nihilistic',name:'Day'},
    {id:'Hypocondrical',name:'Month'},
    {id:'Hypocondrical',name:'Year'},
  ];
  OrientationTimeContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  OrientationTimeContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.OrientationTimeContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.CognitiveFunctionForm.get('OrientationTime').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  OrientationPlaceContentOrder=[
    {id:'Nihilistic',name:'Kind of Place'},
    {id:'Hypocondrical',name:'Area'},
    {id:'Hypocondrical',name:'City'},
  ];
  OrientationPlaceContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  OrientationPlaceContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.OrientationPlaceContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.CognitiveFunctionForm.get('OrientationPlace').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }


  OrientationPersonContentOrder=[
    {id:'Nihilistic',name:'Self'},
    {id:'Hypocondrical',name:'Close Associates'},
    {id:'Hypocondrical',name:'Other Staf'},
  ];
  OrientationPersonContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  OrientationPersonContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.OrientationPersonContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.CognitiveFunctionForm.get('OrientationPerson').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  IntelligenceComprehensionContentOrder=[
    {id:'Nihilistic',name:'Simple Commands'},
    {id:'Hypocondrical',name:'Complex Commands'}
  ];
  IntelligenceComprehensionContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  IntelligenceComprehensionContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.IntelligenceComprehensionContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.IntelligenceForm.get('IntelligenceComprehension').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  IntelligenceVocabularyContentOrder=[
    {id:'Nihilistic',name:'Common Object'},
    {id:'Hypocondrical',name:'Uncommon Object'},
    {id:'Hypocondrical',name:'Part of Object'}
  ];
  IntelligenceVocabularyContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  IntelligenceVocabularyContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.IntelligenceVocabularyContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.IntelligenceForm.get('IntelligenceVocabulary').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  GeneralFundofInformationContentOrder=[
    {id:'Nihilistic',name:'Name of the President of India'},
    {id:'Hypocondrical',name:'Currunt Affairs'},
    {id:'Hypocondrical',name:'Name of the Common State Capital'}
  ];
  GeneralFundofInformationContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  GeneralFundofInformationContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.GeneralFundofInformationContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.IntelligenceForm.get('GeneralFundofInformation').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  ArithmeticAbilityContentOrder=[
    {id:'Nihilistic',name:'Mental Arithmetic'},
    {id:'Hypocondrical',name:'Written Sums'}
  ];
  ArithmeticAbilityContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  ArithmeticAbilityContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.ArithmeticAbilityContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.IntelligenceForm.get('ArithmeticAbility').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  GPEBuiltContentOrder=[
    {id:'Nihilistic',name:'Average'},
    {id:'Hypocondrical',name:'Lean'},
    {id:'Nihilistic',name:'Obese'},
    {id:'Hypocondrical',name:'Tall'},
    {id:'Nihilistic',name:'Dwarf'}
  ];
  GPEBuiltContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  GPEBuiltContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.GPEBuiltContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.GeneralPhysicalExaminationForm.get('GPEBuilt').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }

  GPEInspectionContentOrder=[
    {id:'Nihilistic',name:'Normal'},
    {id:'Hypocondrical',name:'Pallor'},
    {id:'Nihilistic',name:'Icterus'},
    {id:'Hypocondrical',name:'Cyanosis'},
    {id:'Nihilistic',name:'Clubbing'},
    {id:'Hypocondrical',name:'Abnormal Swelling'},
    {id:'Nihilistic',name:'Edema'}
  ];
  GPEInspectionContentForm=this.fb.group({
    useremail: this.fb.array([])
  });
  GPEInspectionContentChange(name:string, isChecked: boolean){
    const emailFormArray = <FormArray>this.GPEInspectionContentForm.controls.useremail;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray.value)
      this.GeneralPhysicalExaminationForm.get('GPEInspection').setValue(emailFormArray.value)
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == name)
      emailFormArray.removeAt(index);
    }
  }


  ngOnInit() {
    this.arout.paramMap.subscribe(e=>{
      this.id=e.get('id')
      console.log(this.id);
    })
    this.ChiefComplain = this.fb.group({
      id:[this.id],
      createdBy:[sessionStorage.getItem('MID')],
      ComplaintName : ['',[Validators.required]],
      ComplaintDuration : ['',[Validators.required]]
    
    });
    this.Illness = this.fb.group({
      id:[this.id],
      createdBy:[sessionStorage.getItem('MID')],
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
    // this.HistoryOfPresentIllnessForm.get('id').setValue(this.id)
    // this.GeneralAppearanceAttitudeBehaviourForm.get('id').setValue(this.id);
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
    console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.submmited = false;
    this.ChiefComplain.reset({id:this.id});
   this.ChiefForm.resetForm({
     id:this.id
   });
  }
  IllnessonSubmit(formData){
    this.submmited = true;
    formData.createdBy=sessionStorage.getItem('MID')
    this.IllnesslogValidationMessages();
    if(this.Illness.valid){
      console.log(formData);
         this.http.post('https://digitalapp001.herokuapp.com/api/pat/addIllness',formData).subscribe(this.Illnesscb)
    }
  }
  Illnesscb=(dt)=>{
    console.log(dt)
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

  ;
  HistoryOfPresentIllnessForm=new FormGroup({
    id: new FormControl(''),
    history: new FormControl(''),
    createdBy:new FormControl('')
  })
  HistoryOfPresentIllnessFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID')
    console.log(form)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPresentHistory',form).subscribe(this.addHistoryOfPresentIllnessCB)
  }
  addHistoryOfPresentIllnessCB=(dt)=>{
    console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.HistoryOfPresentIllnessForm.reset()
  }
  HistoryOfPastIllnessForm=new FormGroup({
    id: new FormControl(''),
    history: new FormControl(''),
    createdBy:new FormControl('')
  })
  HistoryOfPastIllnessFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPastHistory',form).subscribe(this.addHistoryOfPastIllnessCB)  
  }
  addHistoryOfPastIllnessCB=(dt)=>{
    console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.HistoryOfPastIllnessForm.reset();
  }
  HistoryOfModeOfIntakeForm = new FormGroup({
    PsychiatricHistory: new FormControl(''),
    MedicalcHistory : new FormControl(''),
    createdBy:new FormControl(''),
    id: new FormControl('')
  });
  HistoryOfModeOfIntakeFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID')
    console.log(form)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addHistoryOfModeOfIntake',form).subscribe(this.addHistoryOfModeOfIntakeCB)
  }
  addHistoryOfModeOfIntakeCB=(dt)=>{
    console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
   this.HistoryOfModeOfIntakeForm.reset();
  }
  TreatementHostoryForm= new FormGroup({
    PresentTreatementHistory: new FormControl(''),
    PastTreatementHistory: new FormControl(''),
    createdBy:new FormControl(''),
    id: new FormControl('')
  })
  TreatementHostoryFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addTreatementHistory',form).subscribe(this.addHistoryOfModeOfIntakeCB)
  }
   addTreatementHostoryCB=(dt)=>{
     console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
   this.TreatementHostoryForm.reset();
  }
  FamilyHistoryForm=new FormGroup({
    familyTree:new FormControl(''),
    mental:new FormControl(''),
    environment:new FormControl(''),
    attitute:new FormControl(''),
    living:new FormControl(''),
    createdBy:new FormControl(''),
    id: new FormControl('')
  })
  FamilyHistoryFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addFamilyHistory',form).subscribe(this.addFamilyHistoryCB)
  }
  addFamilyHistoryCB=(dt)=>{
    console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.FamilyHistoryForm.reset();
    
  }
  PersonalHistoryForm = new FormGroup({
      Birth: new FormControl(''),
      Immunization: new FormControl(''),
      Development: new FormControl(''),
      Education: new FormControl(''),
      Occupation: new FormControl(''),
      Marrital: new FormControl(''),
      Sexual:new FormControl(''),
      Menstrualandobstetric: new FormControl(''),
      createdBy:new FormControl(''),
      id: new FormControl('')
  })
  PersonalHistoryFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPersonalHistory',form).subscribe(this.addPersonalHistoryCB)
  }
 
  addPersonalHistoryCB=(dt)=>{
    console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
  this.PersonalHistoryForm.reset();
  }
  SubstanceHistoryForm=new FormGroup({
      HistoryOfChoiseOfSubstance: new FormControl(''),
      HistoryOfTotalDurationOfUse: new FormControl(''),
      HistoryOfDurationOfRegularUse: new FormControl(''),
      HistoryOfDailyIntake: new FormControl(''),
      HistoryOfLastIntakeOfDrug: new FormControl(''),
      createdBy:new FormControl(''),
      id: new FormControl('')
  })
  SubstanceHistoryFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addSubstanceHistory',form).subscribe(this.addSubstanceHistoryCB)
  }
  
  addSubstanceHistoryCB=(dt)=>{
    console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
   this.SubstanceHistoryForm.reset();
  }
 
  LegalHistoryForm=new FormGroup({
    HomicideAttempt: new FormControl(''),
    preMorbidpersonality: new FormControl(''),
    createdBy:new FormControl(''),
    id: new FormControl('')
  })
  LegalHistoryFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form)
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addLegalHistory',form).subscribe(this.addLegalHistoryCB)
  }
 
  addLegalHistoryCB=(dt)=>{
    console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    this.LegalHistoryForm.reset();
  }



  GeneralAppearanceAttitudeBehaviourForm=new FormGroup({
      
      Appearance: new FormControl(''),
      LevelofGrooming: new FormControl(''),
      LevelofCleanliness: new FormControl(''),
      LevelofConsciousness: new FormControl(''),
      Gait: new FormControl(''),
      Posture: new FormControl(''),
      ModeOfEntry: new FormControl(''),
      Cooperative: new FormControl(''),
      EyetoEyeContact: new FormControl(''),
      Rapport: new FormControl(''),
      Gesturing: new FormControl(''),
      OtherMovements: new FormControl(''),
      otherCatatolicPhemenon: new FormControl(''),
      createdBy:new FormControl(''),
      id: new FormControl('')
  })
  GeneralAppearanceAttitudeBehaviourFormSubmit(form){
    
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addGeneralAptitudeBehaviour',form).subscribe(this.addGeneralAppearanceAttitudeBehaviourCB)

  }
  
  addGeneralAppearanceAttitudeBehaviourCB=(dt)=>{
   console.log(dt);
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    }
    this.GeneralAppearanceAttitudeBehaviourForm.reset();
  }

  PsychomotorActivitySpeechForm= new FormGroup({
      
      PsychomotorActivity: new FormControl(''),
      Initiation: new FormControl(''),
      ReactionTime: new FormControl(''),
      Speed: new FormControl(''),
      LevelofConsciousnessinSpeech: new FormControl(''),
      Output: new FormControl(''),
      PressureOfSpeech: new FormControl(''),
      Volume: new FormControl(''),
      Tone: new FormControl(''),
      Manner: new FormControl(''),
      Relavance: new FormControl(''),
      Coherence: new FormControl(''),
      Other: new FormControl(''),
      example: new FormControl(''),
      createdBy:new FormControl(''),
      id: new FormControl('')
  })
  PsychomotorActivitySpeechSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPsychomotorActivitySpeech',form).subscribe(this.addPsychomotorActivitySpeechCB)
  }
  addPsychomotorActivitySpeechCB=(dt)=>{
    console.log(dt)
    if(dt){
      
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    }
     this.PsychomotorActivitySpeechForm.reset();
      
  }
 AffectForm= new FormGroup({
      id: new FormControl(''),
      Subjective: new FormControl(''),
      Objectivetext: new FormControl(''),
      Objective: new FormControl(''),
      Congruence: new FormControl(''),
      Stability: new FormControl(''),
      Range: new FormControl(''),
      createdBy:new FormControl('')
  })
  AffectFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addAffect',form).subscribe(this.addAffectCB)
  }
   addAffectCB=(dt)=>{
    console.log(dt)
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      
    }
    this.AffectForm.reset()
  }


  ThoughtContentForm=new FormGroup({
    Stream: new FormControl(''),
    Form: new FormControl(''),
    FormExample: new FormControl(''),
    ThoughtContent: new FormControl(''),
    ThoughtContentExample: new FormControl(''),
    First: new FormControl(''),
    Second: new FormControl(''),
    Third: new FormControl(''),
    Fourth: new FormControl(''),
    Fifth: new FormControl(''),
    ThoughtContentExample2: new FormControl(''),
    createdBy:new FormControl(''),
    id: new FormControl('')
  })
  ThoughtContentFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addThoughtContent',form).subscribe(this.addThoughtContentCB) 
  } 
  addThoughtContentCB=(dt)=>{
    console.log(dt)
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.ThoughtContentForm.reset();
    }
  }
  
  

  PossessionForm=new FormGroup({
    
      Obsession: new FormControl(''),
      Complusion: new FormControl(''),
      ObsessiveCompulsive: new FormControl(''),
      ThoughtAlienationPhenomenon: new FormControl(''),
      ThoughtAlienationPhenomenonExample: new FormControl(''),
      createdBy:new FormControl(''),
     id: new FormControl('')
  })
  PossessionFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPossession',form).subscribe(this.addPossessionCB)
  }
  addPossessionCB=(dt)=>{
    console.log(dt)
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.PossessionForm.reset()
    }
  }




  PerceptionForm=new FormGroup({
  
    Perception1: new FormControl(''),
    Perception2: new FormControl(''),
    Perception3: new FormControl(''),
    PerceptionExample: new FormControl(''),
    createdBy:new FormControl(''),
     id: new FormControl('')
  })
  PerceptionFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    // Swal.fire({type: 'error',title: 'In Developement',showConfirmButton: false,timer: 1000});
     this.http.post('https://digitalapp001.herokuapp.com/api/pat/test',form).subscribe(this.addPerceptionCB)
  }
 
  addPerceptionCB=(dt)=>{
   console.log(dt)
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.PerceptionForm.reset();
    }
  }

 
  CognitiveFunctionForm=new FormGroup({
    id: new FormControl(''),
    ConsciousLevel: new FormControl(''),
    Attention: new FormControl(''),
    AttentionDigitForward: new FormControl(''),
    AttentionDigitBackward: new FormControl(''),
    Concentration: new FormControl(''),
    ConcentrationSerialSubstraction: new FormControl(''),
    Orientation: new FormControl(''),
    OrientationTime: new FormControl(''),
    OrientationTimeCheck: new FormControl(''),
    OrientationPlace: new FormControl(''),
    OrientationPlaceCheck: new FormControl(''),
    OrientationPerson: new FormControl(''),
    OrientationPersonCheck: new FormControl(''),
    Memory: new FormControl(''),
    RecentVerbalRecall3ObjAfter5Minut: new FormControl(''),
    RecentVerbalRecall3ObjAfter10Minut: new FormControl(''),
    RecentVerbalRecall5ObjAfter5Minut: new FormControl(''),
    RecentVerbalRecall5ObjAfter10Minut: new FormControl(''),
    RecentVisualRecallAfter5Minut: new FormControl(''),
    RecentVisualRecallAfter10Minut: new FormControl(''),
    RemotePersonalEvents: new FormControl(''),
    RemoteImPersonalEvents: new FormControl(''),
    RemoteIllnessRelatedEvents: new FormControl(''),
    createdBy:new FormControl('')
  })
  CognitiveFunctionFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addCongnitiveFunction',form).subscribe(this.addCognitiveFunctionCB)

  }
  addCognitiveFunctionCB=(dt)=>{
    console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    if(dt){
      this.CognitiveFunctionForm.reset()
    }   
  }
  



  IntelligenceForm=new FormGroup({
      id: new FormControl(''),
      IntelligenceComprehension: new FormControl(''),
      IntelligenceComprehensionCheck: new FormControl(''),
      IntelligenceVocabulary: new FormControl(''),
      IntelligenceVocabularyCheck: new FormControl(''),
      GeneralFundofInformation: new FormControl(''),
      GeneralFundofInformationCheck: new FormControl(''),
      ArithmeticAbility: new FormControl(''),
      ArithmeticAbilityCheck: new FormControl(''),
      Abstraction: new FormControl(''),
      LevelOFAbstraction:new FormControl(''),
      InterpretationofProverb: new FormControl(''),
      SimilaritiesbetweenPairedObject: new FormControl(''),
      DIsSimilaritiesbetweenPairedObject: new FormControl(''),
      createdBy:new FormControl('')
  })
  IntelligenceFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addIntelligence',form).subscribe(this.addIntelligenceCB)
  }

  addIntelligenceCB=(dt)=>{
   console.log(dt)
    Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
    if(dt){
      this.IntelligenceForm.reset()
    }
  }


  JudgementForm= new FormGroup({
      id: new FormControl(''),
      JudgementPerosnal: new FormControl(''),
      JudgementSocial: new FormControl(''),
      JudgementTest: new FormControl(''),
      createdBy:new FormControl('')
  })
  JudgementFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addJudgement',form).subscribe(this.JudgementCB)
  }
 
  JudgementCB=(dt)=>{
    console.log(dt)
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.JudgementForm.reset();
    }
  }


  InsightSubmit = new FormGroup({
    id: new FormControl(''),
      AwarenessofAbnormalBehaviourExperience: new FormControl(''),
      AttributiontoPhysicalCause: new FormControl(''),
      RecognitionofPersonalResponsibility: new FormControl(''),
      WillingnesstotakeTreatement: new FormControl(''),
      Grade: new FormControl(''),
      createdBy:new FormControl('')
  })
  InsightSubmitForm(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addInsight',form).subscribe(this.addInsightCB)
  }
 
  addInsightCB=(dt)=>{
   console.log(dt)
    if(dt){
      Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
      this.InsightSubmit.reset();
    }
  }



  GeneralPhysicalExaminationForm = new FormGroup({
    id: new FormControl(''),
      GPEConsciousness: new FormControl(''),
      GPEBuilt: new FormControl(''),
      GPEInspection: new FormControl(''),
      GPEPluse: new FormControl(''),
      GPERespiration: new FormControl(''),
      GPEBodyTemperature: new FormControl(''),
      GPEBloodPressure: new FormControl(''),
      RespiratorySystem: new FormControl(''),
      CardioVescularSystem: new FormControl(''),
      GPEGastroIntestinalSystem: new FormControl(''),
      CentralNervousSystem: new FormControl(''),
      createdBy:new FormControl('')
  })
  GeneralPhysicalExaminationFormSubmit(form){
    form.id=this.id;
    form.createdBy=sessionStorage.getItem('MID');
    console.log(form);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addGPE',form).subscribe(this.addGeneralPhysicalExaminationCB)
  }
 
      addGeneralPhysicalExaminationCB=(dt)=>{
        console.log(dt)
        if(dt){
          Swal.fire({type: 'success',title: 'Data Successfully',showConfirmButton: false,timer: 1000});
        
        }
        this.GeneralPhysicalExaminationForm.reset()
      }
}
