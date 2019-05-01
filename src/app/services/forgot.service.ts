import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ForgotService {
  base_url: string;

  constructor(private configService:ConfigService, private http:HttpClient) { 
    this.base_url = configService.getBaseUrl();
  }

  getAllUsers(){
    return this.http.get(this.base_url + 'Users');
  }


}
