import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
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
  constructor(private router:Router,private fb: FormBuilder) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      });
   }

   ngOnInit() {
    this.persionalDataForm = this.fb.group({
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
  }

  onSubmit(formData){
    this.submmited = true;
    this.logValidationMessages();
    if(this.persionalDataForm.valid){
      console.log(formData);
      this.router.navigate(['third']);
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
 