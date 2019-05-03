import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-chief-complain',
  templateUrl: './chief-complain.component.html',
  styleUrls: ['./chief-complain.component.css']
})
export class ChiefComplainComponent implements OnInit {
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
      Complaint : ['',[Validators.required]],
      ComplaintDuration : ['',[Validators.required]]
    });

    this.arout.paramMap.subscribe(e=>{
      this.id=this.arout.paramMap.subscribe(e=>{
        this.familyDataForm.get('id').setValue(e.get('id'))
        this.iid=(e.get('id'))
        
      })
    })
  }
  validationMessages  = {
    'Complaint' : {
                      'required': 'Complaint is Required'
                    },
    'ComplaintDuration' : {
                    'required': 'ComplaintDuration Age is Required'
                  }
   
}; 
formErrors = {
  'Complaint' : '',
  'ComplaintDuration' : ''
};
submmited: boolean = false;
onSubmit(formData){
  this.submmited = true;
 
  this.logValidationMessages();
  if(this.familyDataForm.valid){
    console.log(formData);
     this.http.post('https://digitalapp001.herokuapp.com/api/pat/addcomplain',formData).subscribe(this.cb)
  }
}
cb=(dt)=>{
  this.familyDataForm.reset({
    Complaint : '',
    ComplaintDuration : ''
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
gotoIllness(){
  
   this.router.navigate(['dashboard/illness',{id:this.iid}])
}

}
