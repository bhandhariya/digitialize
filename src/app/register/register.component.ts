
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterService } from '../services/register.service'
import Swal from 'sweetalert2';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
}) 
export class RegisterComponent implements OnInit {
  firstname:any;lastname;email;password;confirmpassword;
  customLoadingTemplate;
  submmited: boolean;
  loading : boolean;
  @ViewChild('formCtrl') formCtrl;
  showErrMsg
  constructor(private router:Router, private registerService:RegisterService,private auth:AngularFireAuth) { }

  ngOnInit() {}

  register(formData){
    this.submmited = true;
    if(this.formCtrl.valid){
      this.loading = true;
      console.log(formData)
      this.auth.auth.createUserWithEmailAndPassword(formData.Email,formData.Password).then(res=>{
        res.user.sendEmailVerification().then(function(){
          firebase.database().ref('users/'+res.user.uid).set({
            email:formData.Email,
            uid:res.user.uid,
            registrationDate:new Date().toString(),
            name:formData.FirstName
          })
          
          Swal.fire({type: 'success',title: 'Registerd Successfully',showConfirmButton: false,timer: 1000});
         
        });
        var uu=this.auth.auth.currentUser;
        uu.updateProfile({
          displayName:formData.FirstName
        })
        this.router.navigate(['login']);
      },err=>{
        this.loading = false;
        Swal.fire({type: 'error',title: 'Registeration not Successfull',showConfirmButton: false,timer: 1500});
      })
      // this.registerService.checkEmailExistance(formData.Email).subscribe(res =>{
      //   if(res['exist'] == 'true'){
      //     this.registerService.registraction(formData).subscribe(res =>{
      //       this.loading = false;
      //       Swal.fire({type :'success', title :'User Created Successfully', showConfirmButton: false, timer:1000});
      //       this.router.navigate(['login']);
      //     },err =>this.loading = false)
      //   }else{
      //     this.loading = false;
      //     Swal.fire({type :'error', title :"Email doesn't exist ",text :'This action is checking your email exist in real word on not.', showConfirmButton: false, timer:1500});
      //   }
      // });
    }
  }

  checkEqualPassword(password,confirmpassword){
    if(password != confirmpassword){
      this.showErrMsg = true;
    }else{
      this.showErrMsg = false;
    }
  }

}
