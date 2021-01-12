import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private _user:UserService,private _router:Router){}

  canActivate(){
  
    if(this._user.isLoggedIn()) return true;
    else{
      this._router.navigate(['/login']);
      return false;
    }
  }
  
}
