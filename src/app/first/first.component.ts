
import { Component, OnInit, Inject } from '@angular/core';
// import * as firebase from "firebase";
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
 import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-first-form',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  backendURL="https://digitalapp001.herokuapp.com";

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

  constructor(@Inject(HttpClient) public http,   private router:Router,private fb: FormBuilder,public storage:AngularFireStorage) {
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
        MiddleName : [''],
        LastName : ['',[Validators.required]],
        AddmissionDate : ['',[Validators.required]],
        File : ['',[Validators.required]],
        imageURL:['']
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

        // this.router.navigate(['dashboard/second']);
        this.http.post('https://digitalapp001.herokuapp.com/api/pat/create',formData).subscribe(this.createCB)
      }
    }
    createCB=(dt)=>{
      console.log(dt);
     
      if(dt.id){
        this.router.navigate(['dashboard/second',{id:dt.id}]);
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
    downloadURL: Observable<string>;
    uploadImage(event) {
      const file = event.target.files[0];
      var randomString=Math.floor(Date.now() / 1000);
      //   var picName=randomString;
      const filePath = 'mentcom'+randomString;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      // observe percentage changes
      // this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
          finalize(() =>{ this.downloadURL = fileRef.getDownloadURL()
            this.downloadURL.subscribe(e=>{
              console.log(e)
              this.firstForm.get('imageURL').setValue(e)
            })
          } )
       )
      .subscribe(e=>{
        
      })
      
    }

}

