import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from "../shared/config.service";
@Injectable()
export class LoginService{
    base_url: string;
    constructor(private http:HttpClient, private configService:ConfigService){
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
}