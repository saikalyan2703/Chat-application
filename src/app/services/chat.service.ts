import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  private _chatUrl = "/api/chat";

  constructor(private _http: Http) { }

  getChat(toEmail:string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let fromEmail:any = localStorage.getItem('user');
    return this._http.post(this._chatUrl, JSON.stringify({'from':fromEmail,'to':toEmail}), options)
      .map((response: Response) => response.json());
  }

}
