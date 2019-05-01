import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private routes : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(sessionStorage.getItem('IsLogin') != 'true'){
        return true;
      } 
      else
      {
        this.routes.navigate(['dashboard']);
        return false;
      }
  }
}