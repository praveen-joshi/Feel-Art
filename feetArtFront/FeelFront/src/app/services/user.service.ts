import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../User';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  login_url="http://localhost:3000/users/login";
  register_url="http://localhost:3000/users/register";
  userInfoUrl="http://localhost:3000/users/me";
  constructor(private http:HttpClient) { }

  login(email,password){
    let user=
    {
      "email":email,
      "password":password
    }
    return this.http.post(this.login_url,user);
  }
  
  register(user:User){
    return this.http.post(this.register_url,user,{responseType: 'text'});
  }

  getUserInfo(){
    return this.http.get(this.userInfoUrl);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn()
  {
    if(localStorage.getItem('token')) return true;
    else return false;
  }

  logout(){
    localStorage.removeItem('token');
  }

  isAdmin(){
    let data=localStorage.getItem('token');
    if(!data) return false;
    let UserData=this.getDecodedAccessToken(data);

    if(UserData.isAdmin) return true;
    else return false;

  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }


}
