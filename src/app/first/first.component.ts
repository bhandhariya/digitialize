import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  profileForm :FormGroup;

  validationMessages  = {
    'firstName' : {
                    'required': 'this field is Required'
                  }  
};

formErrors = {
          'firstName' : '',
};



  constructor(private storage:AngularFireStorage,private http:HttpClient,private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      cretatedBy: new FormControl(''),
      cretionTime:new FormControl(''),
      doctorName: new FormControl('',Validators.required),
      firstName: new FormControl('',Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl(''),
      addmissionDate: new FormControl('',Validators.required),
      permanentAddress: new FormControl('',Validators.required),
      correspondenceAddress: new FormControl(''),
      mobileNumber: new FormControl('',Validators.required),
      landlineNumber: new FormControl(''),
      residanceNumber: new FormControl(''),
      officeNumber: new FormControl(''),
      email: new FormControl(''),
      DOB: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl('',Validators.required),
      education: new FormControl(''),
      occupation: new FormControl(''),
      maritalStatus: new FormControl(''),
      basicfile: new FormControl(''),
      imageURL: new FormControl('',Validators.required),
    })
  }

  save(){
    this.profileForm.get('cretionTime').setValue(Date.now());
    this.profileForm.get('cretatedBy').setValue(sessionStorage.getItem('MID'));
    if(this.profileForm.valid){
           console.log(this.profileForm.value);
          this.http.post('https://digitalapp001.herokuapp.com/api/pat/create',this.profileForm.value).subscribe(this.createCB)
           
    }else{
    
      Swal.fire('Form Not Filled Correctly');
    }
  }

  logValidationMessages(group: FormGroup = this.profileForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
        this.formErrors[key] = '';
          if (abstractControl && !abstractControl.valid && (abstractControl.touched)) {
            const messages = this.validationMessages[key];
            // alert(this.validationMessages[key])
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
                Swal.fire(this.formErrors[key]);
                // console.log(this.formErrors[key] += messages[errorKey])
                // // console.log(this.formErrors.firstName)
              }
            }
          }
          if (abstractControl instanceof FormGroup) {
            this.logValidationMessages(abstractControl);
          } 
      });
  }

  createCB=(dt)=>{
    console.log(dt)
    if(dt.first_name){
      Swal.fire('ok Patient have been Saved Successfully');
      this.router.navigate(['dashboard/second',{id:dt._id}])
    }else{
      
      Swal.fire('ok Patient not Saved Successfully')
    }
  }
  uploadPhoto(event){
    const file = event.target.files[0];
    console.log(file);
    var randomString=Math.floor(Date.now() / 1000);
    const filePath = 'mentcom'+randomString;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    task.snapshotChanges().pipe(
      finalize(() =>{ var url = fileRef.getDownloadURL()
        url.subscribe(e=>{
          console.log(e)
          this.profileForm.get('imageURL').setValue(e)
        })
      } )
   )
  .subscribe(e=>{
    
  })

  }
}
