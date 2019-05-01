import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChangepasswordService {
  base_url: string;

  constructor(private configService:ConfigService, private http:HttpClient) { 
    this.base_url = configService.getBaseUrl();
  }

  getUserById(id){
    return this.http.get(this.base_url + 'Users/'+id);
  }

  resetPassword(id, data){
    return this.http.put(this.base_url+'Users/'+id, data);
  }

}
