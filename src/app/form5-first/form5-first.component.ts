import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-form5-first',
  templateUrl: './form5-first.component.html',
  styleUrls: ['./form5-first.component.css']
})
export class Form5FirstComponent implements OnInit {
  familyDataForm: any;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private router:Router,private fb: FormBuilder) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      });
   }

  ngOnInit() {
    this.familyDataForm = this.fb.group({
      Complaint : ['',[Validators.required]],
      ComplaintDuration:['',[Validators.required]],
      Illness:['',[Validators.required]],
      History:['',[Validators.required]],
      PsychiatricHistory:['',[Validators.required]],
      MedicalSurgicalHistory:['',[Validators.required]],
      PresentTreatmentHistory:['',[Validators.required]],
      PastTreatmentHistory:['',[Validators.required]],
      FamilyHistory:['',[Validators.required]],
      FamilyEnvironmentHistory:['',[Validators.required]],
      FamilyAttitudeHistory:['',[Validators.required]],
      LivingConditionHistory:['',[Validators.required]],
      BirthHistory:['',[Validators.required]],
      ImmunizationHistory:['',[Validators.required]],
      DevelopmentHistory:['',[Validators.required]],
      EducationHistory:['',[Validators.required]],
      OccupationHistory:['',[Validators.required]],
      MaritalandSexualHistory:['',[Validators.required]],
      MenstrualandobstetricHistory:['',[Validators.required]],
      HistoryofChoiceofSubstance:['',[Validators.required]],
      HistoryofTotalDurationofuse:['',[Validators.required]],
      HistoryofDurationofRegularuse:['',[Validators.required]],
      HistoryofDailyintake:['',[Validators.required]],
      HistoryofLastIntakeofDrug:['',[Validators.required]],
      HistoryofModeofIntake:['',[Validators.required]],
      HomicideSuicideAttempts:['',[Validators.required]],
      BirthHPremorbidpersonalityistory:['',[Validators.required]]

     
    });

    this.familyDataForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
  }
  validationMessages  = {
    'Complaint' : {
                      'required': 'Name Of Complaint is Required'
                    },
    'ComplaintDuration' : {
                  'required': 'ComplaintDuration is Required'
                },
                'Illness' : {
                  'required': 'Illness is Required'
                },
    'History':{
      'required': 'History is Required'
    },
    'PsychiatricHistory':{
      'required': 'Psychiatric History is Required'
    },
    'MedicalSurgicalHistory':{
      'required': 'Medical Surgical History is Required'
    },
    'PresentTreatmentHistory':{
      'required': 'Present Treatment History is Required'
    },
    'PastTreatmentHistory':{
      'required': 'Past Treatment History is Required'
    },
    'FamilyHistory':{
      'required': 'Family History is Required'
    },
    'FamilyEnvironmentHistory':{
      'required': 'Family Environment History is Required'
    },
    'FamilyAttitudeHistory':{
      'required': 'Family Attitute History is Required'
    },
    'LivingConditionHistory':{
      'required': 'Living Condition History is Required'
    },
    'BirthHistory':{
      'required': 'Birth History is Required'
    },
    'ImmunizationHistory':{
      'required': 'Immunization History is Required'
    },
    'DevelopmentHistory':{
      'required': 'Development History is Required'
    },
    'EducationHistory':{
      'required': 'Education History is Required'
    },
    'OccupationHistory':{
      'required': 'Occupation History is Required'
    },
    'MaritalandSexualHistory':{
      'required': 'Marrital and Sexual History is Required'
    },
    'MenstrualandobstetricHistory':{
      'required': 'Menstrual and obstetric History is Required'
    },
    'HistoryofChoiceofSubstance':{
      'required': 'History of Choice  is Required'
    },
    'HistoryofTotalDurationofuse':{
      'required': 'History of total Duration of use is Required'
    },
    'HistoryofDurationofRegularuse':{
      'required': 'History of Duration of Regular use is Required'
    },
    'HistoryofDailyintake':{
      'required': 'History of Daily intake is Required'
    },
    'HistoryofLastIntakeofDrug':{
      'required':'HistoryofLastIntakeofDrug is required'
    },
    'HistoryofModeofIntake':{
      'required':'History of Mode of intake is required'
    },
    'HomicideSuicideAttempts':{
      'required': 'Homicide/Suicide Attempts History is Required'
    },
    'BirthHPremorbidpersonalityistory':{
      'required': 'Premorbid personality is Required'
    }
    
}; 
formErrors = {
  'Complaint' : '',
  'ComplaintDuration' : '',
  'Illness':'',
  'History':'',
  'PsychiatricHistory':'',
  'MedicalSurgicalHistory':'',
  'PresentTreatmentHistory':'',
  'PastTreatmentHistory':'',
  'FamilyHistory':'',
  'FamilyEnvironmentHistory':'',
  'FamilyAttitudeHistory':'',
  'LivingConditionHistory':'',
  'BirthHistory':'',
  'ImmunizationHistory':'',
  'DevelopmentHistory':'',
  'EducationHistory':'',
  'OccupationHistory':'',
  'MaritalandSexualHistory':'',
  'MenstrualandobstetricHistory':'',
  'HistoryofChoiceofSubstance':'',
  'HistoryofTotalDurationofuse':'',
  'HistoryofDurationofRegularuse':'',
  'HistoryofDailyintake':'',
  'HistoryofLastIntakeofDrug':'',
  'HistoryofModeofIntake':'',
  'HomicideSuicideAttempts':'',
  'BirthHPremorbidpersonalityistory':''
};
submmited: boolean = false;

logValidationMessages(group: FormGroup = this.familyDataForm): void {
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


onSubmit(formData){
 this.submmited = true;
   this.logValidationMessages();
   if(this.familyDataForm.valid){
  //   console.log(formData);
  //   this.router.navigate(['fifth']);
  console.log(this.familyDataForm.value)
   }
  
}


}
