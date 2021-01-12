import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _user:UserService) { }

  ngOnInit(): void {
  }

  showMenu(){

  }

  isLoggedIn() 
  {
    return this._user.isLoggedIn();
  }

  logout(){
    return this._user.logout();
  }

  isAdmin(){
    return this._user.isAdmin();
  }

}
