import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {UserAuthService} from '../services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;
  users:any;
  constructor(private _userService:UserAuthService, private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    console.log(this.user);  
    
    this._userService.getUsers().subscribe(res=>{
      this.users = res;
      console.log(res);
    });
  }

  logout(){
    this._userService.logout(this.user).subscribe(res=>{
      console.log(res.flag);
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
  });
  }

}
