import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RegisterService {
    private base_url: string;
    constructor(private configService:ConfigService, private http: HttpClient) {
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

}