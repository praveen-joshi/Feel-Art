import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {User} from '../User';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    user=new User;
  constructor(private _user:UserService,private _router:Router) { }

  ngOnInit(): void {
  }

  Register(){
    console.log(this.user);
    this._user.register(this.user).subscribe((res)=>{
      console.log(res)
      this._router.navigate(['/login']);
    },
    (res)=>{
      console.log(res);
      alert("Unable to Register");
    });
  }

}
