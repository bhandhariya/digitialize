import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Injectable()
export class AuthGurad implements CanActivate {

    constructor(private router:Router){}
    
    canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) : boolean{
        if(sessionStorage.getItem('IsLogin') === 'true'){
            return true;
        }else{
            this.router.navigate(['login']);
            return false;
        }
    }
}