import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {UserService} from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private _user:UserService){}

  canActivate(){
    if(this._user.isAdmin()) return true;
    else return false;
  }


  

  
}
