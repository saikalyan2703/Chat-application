import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';

import { ChatComponent } from '../chat/chat.component';
import { UsersComponent } from '../users/users.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';

const appRoutes: Routes = [
  { path: '', 
  component: ChatComponent,
  children: [
    {
      path: '',
      component: UsersComponent,
      children: [
        {
          path: ':email',
          component: ChatBoxComponent
        }
      ]
    }
  ]
},
];
@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule { }
