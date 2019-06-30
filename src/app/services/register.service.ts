import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class RegisterService {
    private base_url: string;
    constructor(private configService:ConfigService, private http: HttpClient,private auth:AngularFireAuth,private router:Router) {
        this.base_url = configService.getBaseUrl();
     }

     registraction(body){
          return this.http.post(this.base_url+'Users', body);
     }

     checkEmailExistance(email){
          let head = { headers : new HttpHeaders(
              {
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                "X-RapidAPI-Host": "ajith-Verify-email-address-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "17d4194610mshb212b27ec88bb50p180af8jsn9aaefd3c0c85" 
              })}
          return this.http.get("https://ajith-Verify-email-address-v1.p.rapidapi.com/varifyEmail?email="+email, head );
      }
      register(u){
        console.log(u);
        this.auth.auth.createUserWithEmailAndPassword(u.Email,u.Password).then(()=>{
            this.auth.auth.currentUser.updateProfile({
              displayName:u.FirstName+' '+u.LastName
            }).then(()=>{
              var user=this.auth.auth.currentUser;
              var obj={
               name:user.displayName,
               email:user.email,
               providerId:user.providerId,
               uid:user.uid,
               emailVerified:user.emailVerified
               
              }
              
             this.http.post('https://digitalapp001.herokuapp.com/api/users/register',obj).subscribe(this.cb)
            })
       
            
            
          }).catch(error=>{
           var errorCode = error.code;
           var errorMessage = error.message;
           Swal.fire("Oops!", errorMessage, "error");
          })
         }
         cb=(dt)=>{
          
           if(dt.uid){
             Swal.fire("Great", "User Registered Successfully", "success");
             this.router.navigate(['login'])
           }
         }
      }
