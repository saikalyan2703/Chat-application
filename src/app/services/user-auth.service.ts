import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {User} from '../user';

@Injectable()
export class UserAuthService {

  private _registerUrl = "/api/register";
  private _loginUrl = "/api/login";
  private _logoutUrl = "/api/logout";
  private _getusersUrl = "/api/users";

  constructor(private _http: Http) { }

  addUser(user:User){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._registerUrl, JSON.stringify(user), options)
      .map((response: Response) => response.json());
  }

  getUser(user:User){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._loginUrl, JSON.stringify(user), options)
      .map((response: Response) =>{ 
        let user = response.json();
        if(typeof(user.user)!=='undefined'){
          localStorage.setItem('user', user.user.email);
        }
        
        return user;
      });
  }

  logout(email:string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._logoutUrl, JSON.stringify({'email':email}), options)
      .map((response: Response) => response.json());
  }

  getUsers(){
    return this._http.get(this._getusersUrl)
      .map((response: Response) => response.json());
  }

}
