import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as io from 'socket.io-client';

import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  email:string = '';
  user:any;
  chat:any;
  socket;

  message:string = "";

  constructor( private route: ActivatedRoute, private _chatService:ChatService, private router: Router) {
    this.socket = io();
   }

  ngOnInit() {
    
    this.user = localStorage.getItem('user');
    this.route.params.subscribe(params => {
      this.email = params['email']; 
      this._chatService.getChat(this.email).subscribe(res=>this.chat = res);
   });

   this.socket.on('numberOfLogoutUsers', (numberOfOnlineUsers) => {
    if(numberOfOnlineUsers[1].indexOf(this.email)==-1){
      this.router.navigate(['/chat']);
    }
  });

    this.socket.on('recieveMessage', (msgDetails) => {
      console.log(msgDetails);
      console.log(this.chat);
      if(msgDetails[1]==this.user && msgDetails[0]==this.email){
        for(var i=0; i<2; i++){
          if(this.chat[i].from==this.email){
            this.chat[i].messages.push(msgDetails[2]);
            break;
          }
        }
        console.log(this.chat);
      }
    });
  
  }

  sendMessage(){
    if(this.message!=""){
      this._chatService.sendMessage(this.message, this.email).subscribe(res=>{
        if(res.flag=="success"){
          this.socket.emit('message',[this.user, this.email, this.message])
          for(var i=0; i<2; i++){
            if(this.chat[i].from==this.user){
              this.chat[i].messages.push(this.message);
              break;
            }
          }
          this.message = "";
        }
      });

    }
  }

}
