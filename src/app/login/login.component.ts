import { Component, OnInit, HostBinding, trigger, state, style, animate, transition  } from '@angular/core';
import {slideInDownAnimation} from '../animations';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms/src/validators';

import {User} from '../user';
import {UserAuthService} from '../services/user-auth.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router/src/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ slideInDownAnimation, trigger('errorDisplay',[
    transition('* => void',[animate('100ms ease-out',style({height:'0.2px'}))]),
    transition('void => *',[style({height:'0.2px'}), animate('100ms ease-out')])
  ])  ],
})
export class LoginComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  loginForm: FormGroup; // <--- heroForm is of type FormGroup
  passwordFlag:boolean = false;
  passwordStatus:string = "Show password";

  loginFlag:string;
  messageFlag:string;

  constructor(private fb: FormBuilder, private _userService:UserAuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pwd: ['',[Validators.required]]
    });
  }

  passwordTrigger():void{
    this.passwordFlag = !this.passwordFlag;
    this.passwordStatus = this.passwordStatus==='Show password'? 'Hide password':'Show password';
  }

  getUser(user:User){
    console.log(user);
    this._userService.getUser(user).subscribe(res=>{
      console.log(res.flag);
      if(res.flag=='success'){
        this.router.navigate(['/chat']);
      }
      if(res.flag=='error password'){
        this.loginFlag='error password';
        this.messageFlag = 'error password';
      }
      if(res.flag=='error email'){
        this.loginFlag='error email';
        this.messageFlag = 'error email';
      }
  });
  }

}
