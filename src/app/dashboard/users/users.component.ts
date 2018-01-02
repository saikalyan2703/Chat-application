import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user:any;
  users:any;
  constructor(private _userService:UserAuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    console.log(this.user);  
    
    this._userService.getUsers().subscribe(res=>{
      this.users = res;
      console.log(res);
    });
  }

  displayChat(email:string){
    console.log('chat is/'.concat(email));
    this.router.navigate(['chat/'.concat(email)]);
  }

  logout(){
    this._userService.logout(this.user).subscribe(res=>{
      console.log(res.flag);
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
  });
  }

}
