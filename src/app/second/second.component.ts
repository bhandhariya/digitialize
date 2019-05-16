import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  id;
  datePickerConfig: Partial<BsDatepickerConfig>;
  persionalDataForm: any;
  validationMessages  = {
          'ParmentAddress' : {
                                'required': 'Parment Address is Required',
                                'minlength': '5 Characters is Required'
                              },
          'Mobile' : {
                        'required': 'Mobile No. is Required',
                        'minlength': '10 Digits is Required'
                      },
          'OfficeFax' : {
                          'required': 'Office Fax is Required'
                          },
          'Residence' : {
                            'required': 'Residence is Required'
                          },
          'Landline' : {
                          'required': 'Landline is Required'
                        },
          'CorrespondenceAddress' : {
                                      'required': 'Correspondence Address is Required'
                                    },
          'Email' : {
                      'required': 'Correspondence Address is Required',
                      'email': 'Invalid email'
                    },
          'DateOfBirth' : {
                            'required': 'DateOfBirth is Required'
                          },
          'Age' : {
                    'required': 'DateOfBirth is Required'
                  },
          'Gender' : {
                        'required': 'Gender is Required'
                      },
          'Education' : {
                        'required': 'Education is Required'
                      },
          'Occupation' : {
                        'required': 'Occupation is Required'
                      },
          'MaterialStatus' : {
                                'required': 'Material Status is Required'
                              },
  };
  
  formErrors = {
    'ParmentAddress' : '',
    'Mobile' : '',
    'OfficeFax' : '',
    'Residence' : '',
    'Landline' : '',
    'CorrespondenceAddress' : '',
    'Email' : '',
    'DateOfBirth' : '',
    'Age' : '',
    'Gender' : '',
    'Education' : '',
    'Occupation' : '',
    'MaterialStatus' : '',
  };
  submmited: boolean = false;
  constructor(@Inject(HttpClient) public http, private router:Router,private fb: FormBuilder,private arout:ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      });
      // this.arout.paramMap.subscribe(e=>{
      //  this.id=e.get('id')    
      //   console.log(this.id)
        
      // })
   }

   ngOnInit() {
    this.persionalDataForm = this.fb.group({
      id:[''],
      ParmentAddress : ['',[Validators.required,Validators.minLength(5)]],
      Mobile : ['',[Validators.required]],
      OfficeFax : ['',[Validators.required]],
      Residence : ['',[Validators.required]],
      Landline : ['',[Validators.required]],
      CorrespondenceAddress : ['',[Validators.required]],
      Email : ['',[Validators.required,Validators.email]],
      DateOfBirth : ['',[Validators.required]],
      Age : ['',[Validators.required]],
      Gender : ['',[Validators.required]],
      Education : ['',[Validators.required]],
      Occupation : ['',[Validators.required]],
      MaterialStatus : ['',[Validators.required]],
    });

    this.persionalDataForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
    this.arout.paramMap.subscribe(e=>{
     
      this.persionalDataForm.get('id').setValue(e.get('id'))
       
     })
  }

  onSubmit(formData){
    this.submmited = true;
    // this.persionalDataForm.get('id').setValue(this.id)
    this.logValidationMessages();
    if(this.persionalDataForm.valid){
      console.log(formData);
      this.http.post('https://digitalapp001.herokuapp.com/api/pat/addPersonal',formData).subscribe(this.addpersonalCB)
    }
  }
  addpersonalCB=(dt)=>{
    console.log(dt)
    if(dt.id){
      this.router.navigate(['dashboard/family',{id:dt.id}])
    }
  }

  logValidationMessages(group: FormGroup = this.persionalDataForm): void {
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
 