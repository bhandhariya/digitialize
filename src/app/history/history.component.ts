import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  id;iid;
  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private arout:ActivatedRoute,private router:Router,private http:HttpClient,private fb: FormBuilder) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      });
   }
   familyDataForm: any;
    validationMessages  = {
      'History' : {
                        'required': 'History  is Required'
                      },
      'PsychiatricHistory':{
        'required':'PsychiatricHistory is required'
      },
      'MedicalSurgicalHistory':{
        'required':'Medical Surgical History is required'
      },
      'PresentTreateHistory':{
        'required':'PresentTreateHistory is required'
      },
      'PastTreateHistory':{
        'required':'PastTreateHistory is required'
      },
      'FamilyMentalHistory':{'required':'Family Mental History is required'},
      'HistoryOfModeOfIntake':{'required':'Family Mental History is required'},
      'FamilyEnvironmentHistory':{'required':'Family Environment History is required'},
      'FamilyAttituteHistory':{'required':'Family Attitute History is required'},
      'LivingConditionHistory':{'required':'Living Condition History is required'},
      'BirthHistory':{'required':'Birth History is required'},
      'ImmunizationHistory':{'required':'Immunization History is required'},
      'DevelopmentHistory':{'required':'Development History is required'},
      'EducationHistory':{'required':'Education History is required'},
      'OccupationHistory':{'required':'Occupation History is required'},
      'MarritalSexualHistory':{'required':'Marrital and Sexual History is required'},
      'MenstrualObstetricHistory':{'required':'this field is require'},
      'HistoryOfChoise':{'required':'History is required'},
      'HistoryOfTotalDurationOfUse':{'required':'this field is require'},
      'HistoryOfDurationOfRegularlUse':{'required':'this field is require'},
      'HistoryOfDailyIntake':{'required':'this field is require'},
      'HistoryofLastIntakeOfDrug':{'required':'this field is require'},
      'HomosideAttepts':{'required':'this field is require'},
      'PreMorbidPersonality':{'required':'this field is require'}
    
    
  }; 
  formErrors = {
  'History':'',
  'PsychiatricHistory':'',
  'MedicalSurgicalHistory':'',
  'PresentTreateHistory':'',
  'PastTreateHistory':'',
  'FamilyMentalHistory':'',
  'HistoryOfModeOfIntake':'',
  'FamilyEnvironmentHistory':'',
  'FamilyAttituteHistory':'',
  'LivingConditionHistory':'',
  'BirthHistory':'',
  'ImmunizationHistory':'',
  'DevelopmentHistory':'',
  'EducationHistory':'',
  'OccupationHistory':'',
  'MarritalSexualHistory':'',
  'MenstrualObstetricHistory':'',
  'HistoryOfChoise':'',
  'HistoryOfTotalDurationOfUse':'',
  'HistoryOfDurationOfRegularlUse':'',
  'HistoryOfDailyIntake':'',
  'HistoryofLastIntakeOfDrug':'',
  'HomosideAttepts':'',
  'PreMorbidPersonality':''
  };
  ngOnInit() {
    this.familyDataForm = this.fb.group({
      id:[''],
      History : ['',[Validators.required]],
      PsychiatricHistory:['',[Validators.required]],
      MedicalSurgicalHistory:['',[Validators.required]],
      PresentTreateHistory:['',[Validators.required]],
      PastTreateHistory:['',[Validators.required]],
      FamilyMentalHistory:['',[Validators.required]],
      FamilyEnvironmentHistory:['',[Validators.required]],
      FamilyAttituteHistory:['',[Validators.required]],
      LivingConditionHistory:['',[Validators.required]],
      BirthHistory:['',[Validators.required]],
      ImmunizationHistory:['',[Validators.required]],
      DevelopmentHistory:['',[Validators.required]],
      EducationHistory:['',[Validators.required]],
      OccupationHistory:['',[Validators.required]],
      MarritalSexualHistory:['',[Validators.required]],
      MenstrualObstetricHistory:['',[Validators.required]],
      HistoryOfChoise:['',[Validators.required]],
      HistoryOfTotalDurationOfUse:['',[Validators.required]],
      HistoryOfDurationOfRegularlUse:['',[Validators.required]],
      HistoryOfDailyIntake:['',[Validators.required]],
      HistoryofLastIntakeOfDrug:['',[Validators.required]],
      HistoryOfModeOfIntake:['',[Validators.required]],   
      HomosideAttepts:['',[Validators.required]],
      PreMorbidPersonality:['',[Validators.required]]

      
    });

    this.arout.paramMap.subscribe(e=>{
      this.id=this.arout.paramMap.subscribe(e=>{
        this.familyDataForm.get('id').setValue(e.get('id'))
        this.iid=(e.get('id'))
        
      })
    })
  }


submmited: boolean = false;

onSubmit(formData){
  this.submmited = true;
  this.logValidationMessages();
  if(this.familyDataForm.valid){
    
    console.log(formData);
       this.http.post('https://digitalapp001.herokuapp.com/api/pat/addHistory',formData).subscribe(this.cb)
  }
}
cb=(dt)=>{
  console.log(dt)
  this.familyDataForm.reset({
       History : "",
      PsychiatricHistory:"",
      MedicalSurgicalHistory:"",
      PresentTreateHistory:"",
      PastTreateHistory:"",
      FamilyMentalHistory:"",
      FamilyEnvironmentHistory:"",
      FamilyAttituteHistory:"",
      LivingConditionHistory:"",
      BirthHistory:"",
      ImmunizationHistory:"",
      DevelopmentHistory:"",
      EducationHistory:"",
      OccupationHistory:"",
      MarritalSexualHistory:"",
      MenstrualObstetricHistory:"",
      HistoryOfChoise:"",
      HistoryOfTotalDurationOfUse:"",
      HistoryOfDurationOfRegularlUse:"",
      HistoryOfDailyIntake:"",
      HistoryofLastIntakeOfDrug:"",
      HistoryOfModeOfIntake:"",   
      HomosideAttepts:"",
      PreMorbidPersonality:""
  
  });
}


logValidationMessages(group: FormGroup =this.familyDataForm): void {
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

}
