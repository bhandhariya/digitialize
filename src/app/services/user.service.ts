import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  set(fromdatabase){
    localStorage.setItem('User',JSON.stringify(fromdatabase));
  }
  destroy(){
    localStorage.removeItem('User');  
  }
}
