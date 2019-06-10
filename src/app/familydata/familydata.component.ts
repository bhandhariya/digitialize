import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-familydata',
  templateUrl: './familydata.component.html',
  styleUrls: ['./familydata.component.css']
})
export class FamilydataComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  id;

  constructor(private router:Router,private fb: FormBuilder,private http:HttpClient,private arout:ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      });

   }

  ngOnInit() {
    this.familyDataForm = this.fb.group({
      id:[''],
      SpouseName : [''],
      SpouseAge : [''],
      SpouseOccupation : [''],
      SpouseAddress : [''],
      LivingStatus : [''],
      NoOfChildren : [''],
      GuardianName : ['',[Validators.required]],
      ContactNo : ['',[Validators.required,Validators.minLength(10)]],
      Email : [''],
      Address : ['',[Validators.required]]
      
    });

    this.familyDataForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
    this.id=this.arout.paramMap.subscribe(e=>{
      this.familyDataForm.get('id').setValue(e.get('id'))
    })
  }
  familyDataForm: any;
  validationMessages  = {
    'SpouseName' : {
                      'required': 'Spouse Name is Required'
                    },
    'SpouseAge' : {
                    'required': 'Spouse Age is Required'
                  },
    'SpouseOccupation' : {
                            'required': 'Spouse Occupation is Required'
                          },
    'SpouseAddress' : {
                          'required': 'Spouse Address is Required',
                          'minlength': '5 Characters is Required'
                        },
    'LivingStatus' : {
                        'required': 'Living Status is Required'
                      },
    'NoOfChildren' : {
                        'required': 'No Of Children is Required'
                      },
    'GuardianName' : {
                        'required': 'Guardian Name No. is Required'
                      },
    'ContactNo' : {
                    'required': 'Contact No. is Required',
                    'minlength': '10 Digits is Required'
                  },
    'Email' : {
                'required': 'Email is Required',
                'email': 'Invalid email'
              },
    'Address' : {
                  'required': 'Address is Required'
                }
}; 
formErrors = {
  'SpouseName' : '',
  'SpouseAge' : '',
  'SpouseOccupation' : '',
  'SpouseAddress' : '',
  'LivingStatus' : '',
  'NoOfChildren' : '',
  'GuardianName' : '',
  'ContactNo' : '',
  'Email' : '',
  'Address' : ''
};
submmited: boolean = false;
onSubmit(formData){
  this.submmited = true;
  this.logValidationMessages();
  if(this.familyDataForm.valid){
    console.log(formData);
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/addFamilyData',formData).subscribe(this.cb)
  }
}
cb=(dt)=>{
  Swal.fire({type: 'success',title: 'Addedd Successfully',showConfirmButton: false,timer: 1000});
  if(dt._id){
    this.router.navigate(['dashboard/children',{id:dt.id}])
  }
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

}
