import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from "../services/login.service";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";

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
  constructor(private loginService:LoginService, private router:Router,private auth:AngularFireAuth) { }
  @ViewChild('formCtrl') formCtrl;
  ngOnInit() {
    if(this.router.url == '/') this.registerRoute = true;
    if(this.router.url == '/') this.forgotRoute = true;

    // this.loginService.emailExistance("test@gmail.com").subscribe(res =>{
    //   console.log(res)
    // });
  }

  loginFunction(formData){
    this.submitted = true;
    if(this.formCtrl.valid){
      this.loading = true;
      
      // if(formData.Email == 'test@gmail.com' && formData.Password == '123456') {
      //   sessionStorage.setItem('IsLogin','true');
      //   Swal.fire({type: 'success',title: 'Login Successfully',showConfirmButton: false,timer: 1000});
      //   this.router.navigate(['dashboard']);
      // }else{
      //   this.loading = false;
      //   Swal.fire({type: 'error',title: 'Please give correct credentials',showConfirmButton: false,timer: 1500});
      // }
      console.log(formData)
      this.auth.auth.signInWithEmailAndPassword(formData.Email,formData.Password).then(res=>{
        sessionStorage.setItem('IsLogin','true');
        Swal.fire({type: 'success',title: 'Login Successfully',showConfirmButton: false,timer: 1000});
        this.router.navigate(['dashboard']);
      },err=>{
        this.loading = false;
        Swal.fire({type: 'error',title: 'Please give correct credentials',showConfirmButton: false,timer: 1500});
      })
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
