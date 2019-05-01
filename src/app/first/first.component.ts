
import { Component, OnInit } from '@angular/core';
// import * as firebase from "firebase";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-first-form',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  firstForm: any;
  public loading = false;
  validationMessages  = {
          'FirstName' : {
                          'required': 'First Name is Required',
                          'minlength': '5 Characters is Required'
                        },
          'MiddleName' : {
                          'required': 'Middle Name is Required',
                          'minlength': '5 Characters is Required'
                        },
          'LastName' : {
                            'required': 'Last Name is Required',
                            'minlength': '3 Characters is Required'
                          },
          'AddmissionDate' : {
                            'required': 'Addmission Date is Required'
                          },
          'File' : {
                    'required': 'File is Required'
                  }
  };
  
  formErrors = {
                'FirstName' : '',
                'MiddleName' : '',
                'LastName' : '',
                'AddmissionDate' : '',
                'File' : ''
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
      this.firstForm = this.fb.group({
        FirstName : ['',[Validators.required]],
        MiddleName : ['',[Validators.required]],
        LastName : ['',[Validators.required]],
        AddmissionDate : ['',[Validators.required]],
        File : ['',[Validators.required]]
      });

      this.firstForm.valueChanges.subscribe(value =>{
        this.logValidationMessages();
      });
    }
  
  
    onSubmit(formData){
      this.submmited = true;
      this.logValidationMessages();
      if(this.firstForm.valid){
        console.log(formData);
        this.router.navigate(['second']);
      }
    }
  
    logValidationMessages(group: FormGroup = this.firstForm): void {
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

