import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from "../shared/config.service";
import swal from "sweetalert2";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable()
export class LoginService{
    base_url: string;
    constructor(private http:HttpClient, private configService:ConfigService,private auth:AngularFireAuth,private router:Router){
        this.base_url = configService.getBaseUrl();
    }

    loginCheck(data){
        return this.http.post(this.base_url+'api/login', data, {headers : new HttpHeaders({'Content-Type': 'application/json'})});
    }

    getAllUsers(){
        return this.http.get(this.base_url + 'Users');
    }

    emailExistance(email){
        let head = { headers : new HttpHeaders({"X-RapidAPI-Host": "ajith-Verify-email-address-v1.p.rapidapi.com","X-RapidAPI-Key": "17d4194610mshb212b27ec88bb50p180af8jsn9aaefd3c0c85" })}
        return this.http.get("https://ajith-Verify-email-address-v1.p.rapidapi.com/varifyEmail?email="+email, head );
    }
    login(u){
        console.log(u)
        return this.auth.auth.signInWithEmailAndPassword(u.email,u.password).then(()=>{
            var user=this.auth.auth.currentUser;
            if(user){
              var obj={
                uid:user.uid,
                email:user.email
              }
              this.http.post('/api/users/login',obj).subscribe(this.cb)
            }
           
          }).catch(function(){
            const Toast = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            
            Toast.fire({
              type: 'error',
              title: 'Credential not match '
            })
          })
    }
    cb=(dt)=>{
        console.log(dt)
            console.log(dt.user._id)
        sessionStorage.setItem('Token',dt.token);
        sessionStorage.setItem('UID',dt.user.uid);
        sessionStorage.setItem('MID',dt.user._id)
        swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'User login Successfully ',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('dashboard')
      }
}