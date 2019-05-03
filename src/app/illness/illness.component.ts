import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-illness',
  templateUrl: './illness.component.html',
  styleUrls: ['./illness.component.css']
})
export class IllnessComponent implements OnInit {
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

  ngOnInit() {
    
    this.familyDataForm = this.fb.group({
      id:[''],
      DurationOfCurruntIllness : ['',[Validators.required]],
      CurruntEpisodeNumber : ['',[Validators.required]],
      ModeOfOnset : ['',[Validators.required]],
      Course : ['',[Validators.required]],
      PredisposingFactors : ['',[Validators.required]],
      PrecipatingFactors : ['',[Validators.required]],
      PrepetuatingFactors : ['',[Validators.required]]
    });

    this.arout.paramMap.subscribe(e=>{
      this.id=this.arout.paramMap.subscribe(e=>{
        this.familyDataForm.get('id').setValue(e.get('id'))
        this.iid=(e.get('id'))
        
      })
    })
  }
  validationMessages  = {
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
formErrors = {
  'DurationOfCurruntIllness' : '',
  'CurruntEpisodeNumber' : '',
  'ModeOfOnset' : '',
  'Course' : '',
  'PredisposingFactors' : '',
  'PrecipatingFactors' : '',
  'PrepetuatingFactors' : ''
};

submmited: boolean = false;
onSubmit(formData){
  this.submmited = true;
 
  this.logValidationMessages();
  if(this.familyDataForm.valid){
    console.log(formData);
      this.http.post('https://digitalapp001.herokuapp.com/api/pat/addIllness',formData).subscribe(this.cb)
  }
}
cb=(dt)=>{
  this.familyDataForm.reset({
    DurationOfCurruntIllness : '',
    CurruntEpisodeNumber : '',
    ModeOfOnset:'',
    Course:"",
    PredisposingFactors : '',
    PrecipatingFactors : '',
    PrepetuatingFactors : ''
  });
}
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
gotoHistory(){
  this.router.navigate(['dashboard/history',{id:this.iid}])
}
}
