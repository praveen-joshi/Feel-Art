import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{
  
  constructor(private _user:UserService) { }

  intercept(req,next){
    const token=this._user.getToken();
    if(!token) return next.handle(req);
    
    let reqWithToken=req.clone({ 
      setHeaders:{ Aurthorization:token}
    });
    return next.handle(reqWithToken);
  }

}
