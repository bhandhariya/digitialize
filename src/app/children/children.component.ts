import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  constructor(private router:Router,private fb: FormBuilder,private http:HttpClient,private arout:ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      });
   }
id;iiid;
  ngOnInit() {
    this.familyDataForm = this.fb.group({
      id:[''],
      NameOfChild : ['',[Validators.required]],
      ContactNo : ['',[Validators.required]],
      Email : ['',[Validators.required,Validators.email]],
      Address : ['',[Validators.required]]
    });

    this.familyDataForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
    this.id=this.arout.paramMap.subscribe(e=>{
      this.familyDataForm.get('id').setValue(e.get('id'))
      this.iiid=e.get('id')
    })
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
  datePickerConfig: Partial<BsDatepickerConfig>;
  familyDataForm: any;
  validationMessages  = {
          'NameOfChild' : {
                            'required': 'Name Of Child is Required'
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
    'NameOfChild' : '',
    'ContactNo' : '',
    'Email' : '',
    'Address' : ''
  };
  submmited: boolean = false;
  onSubmit(formData){
    this.submmited = true;
    this.logValidationMessages();
    if(this.familyDataForm.valid){
      this.http.post('https://digitalapp001.herokuapp.com/api/pat/addchild',formData).subscribe(this.cb)
    
    }
    
  }
  cb=(dt)=>{
      console.log(dt);
      this.familyDataForm.reset()
  }
  next(){
    this.router.navigate(['dashboard/accordian',{id:this.iiid}])
  }
}
