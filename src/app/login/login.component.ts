import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from "../services/login.service";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from '../services/user.service';
import { AngularFireDatabase } from "@angular/fire/database";
import { MyFireService } from '../services/my-fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:any;
  password:any;
  emailCtrl;
  passwordCtrl;
  customLoadingTemplate;
  submitted : boolean;
  registerRoute: boolean;
  forgotRoute: boolean;
  loading : boolean;
  constructor(private loginService:LoginService, private router:Router,
    private myFire:MyFireService,
    private auth:AngularFireAuth,private UserService:UserService,private db:AngularFireDatabase) { }
  @ViewChild('formCtrl') formCtrl;
  ngOnInit() {
    if(this.router.url == '/') this.registerRoute = true;
    if(this.router.url == '/') this.forgotRoute = true;

    
  }

  loginFunction(formData){
    this.submitted = true;
    if(this.formCtrl.valid){
      this.loading = true;
      var obj={
        email:this.email,
        password:this.password
      }
     this.loginService.login(obj)
     
    }
  }

  goToRegister(){
    this.router.navigate(['register']);
    if(this.router.url == '/'){
      this.router.navigate(['register']);
    }else{
      this.router.navigate(['../register']);
    }
  }

}
