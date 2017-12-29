import { Component, OnInit, HostBinding, trigger, state, style, animate, transition  } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms/src/validators';
import {slideInDownAnimation} from '../animations';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  animations: [ slideInDownAnimation, trigger('errorDisplay',[
  transition('* => void',[animate('100ms ease-out',style({height:'0.2px'}))]),
  transition('void => *',[style({height:'0.2px'}), animate('100ms ease-out')])
]) ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  registerForm: FormGroup; // <--- heroForm is of type FormGroup
  passwordFlag:boolean = false;
  passwordStatus:string = "Show password";

  cpasswordFlag:boolean = false;
  cpasswordStatus:string = "Show password";

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: this.fb.group({
        pwd: ['',[Validators.required,Validators.minLength(4)]],
        cpwd: ['',[Validators.required]]
      },{validator:this.passwordEquals})
      
    });
  }

  passwordEquals(formGroup: FormGroup){
    let a = new Array();

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];
        a.push(control);
      }
    }
    if(a[0].value===a[1].value){
      return null;
    }
    else{
      return {error:true};
    }
    
  }

  passwordTrigger():void{
    this.passwordFlag = !this.passwordFlag;
    this.passwordStatus = this.passwordStatus==='Show password'? 'Hide password':'Show password';
  }

  cpasswordTrigger():void{
    this.cpasswordFlag = !this.cpasswordFlag;
    this.cpasswordStatus = this.cpasswordStatus==='Show password'? 'Hide password':'Show password';
  }

}
