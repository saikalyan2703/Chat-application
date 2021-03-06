import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatRoutingModule } from './chat-routing/chat-routing.module';
import {ChatService} from '../services/chat.service';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ],
  declarations: [UsersComponent, ChatComponent, ChatBoxComponent],
  providers: [ChatService]
})
export class DashboardModule { }
