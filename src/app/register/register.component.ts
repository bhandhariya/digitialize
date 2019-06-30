
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterService } from '../services/register.service'
import Swal from 'sweetalert2';
import { AngularFireAuth } from "@angular/fire/auth";



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
      if(formData.Password != formData.ConfirmPassword){
        Swal.fire('Password Does not Match')
      }else{
        this.registerService.register(formData);
      }
    }else{
      Swal.fire('Please entar All Details')
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
