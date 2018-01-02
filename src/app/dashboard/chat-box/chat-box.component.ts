import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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

  constructor( private route: ActivatedRoute, private _chatService:ChatService) { }

  ngOnInit() {
    
    this.user = localStorage.getItem('user');
    this.route.params.subscribe(params => {
      this.email = params['email']; 
      this._chatService.getChat(this.email).subscribe(res=>this.chat = res);
   });
  
  }

}
