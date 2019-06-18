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
        if(res.user.emailVerified){
          return this.myFire.getUserFromDatabase(res.user.uid).then(userDataFromDatabase=>{
            this.UserService.set(userDataFromDatabase)
            console.log(userDataFromDatabase)
          }).catch(err=>{
            Swal.fire({type: 'error',title: err,showConfirmButton: false,timer: 1500});
          })
        }else{
          Swal.fire({type: 'error',title: 'Your Email is not yet Verified ',showConfirmButton: false,timer: 1500});
          this.auth.auth.signOut();
        }
        sessionStorage.setItem('IsLogin','true');
        Swal.fire({type: 'success',title: 'Login Successfully',showConfirmButton: false,timer: 1000});
        var user=this.auth.auth.currentUser;
        if (user != null) {
          console.log(user.email);
          console.log(user.displayName);
          
        }
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
