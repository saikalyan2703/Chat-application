import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as io from 'socket.io-client';

import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user:any;
  users:any;
  loginUsers = [];
  socket;
  numberOfOnlineUsers: number = 0;
  constructor(private _userService:UserAuthService, private router: Router, private route: ActivatedRoute) {
    this.socket = io();
   }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.socket.emit('login',this.user);
    console.log(this.user);  

    this.socket.on('numberOfLoginUsers', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers[0];
        this.loginUsers = numberOfOnlineUsers[1];
    });

    this.socket.on('numberOfLogoutUsers', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers[0];
      this.loginUsers = numberOfOnlineUsers[1];
    });
  }

  displayChat(email:string){
    console.log('chat is/'.concat(email));
    this.router.navigate(['chat/'.concat(email)]);
  }

  logout(){
    this.socket.emit('logout',this.user);
    this._userService.logout(this.user).subscribe(res=>{
      console.log(res.flag);
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
  });
  }

}
