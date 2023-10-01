import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  public ready = false;

  // UserTokens
  private userTokensName = 'userTokens';
  public get userTokens() : any {
    return JSON.parse(sessionStorage.getItem('userTokens'));
  };

  //userIdentifier
  private userIdentifierName = 'userIdentifier';
  public get userIdentifier() {
    let id = localStorage.getItem(this.userIdentifierName);
    if (!id) {
      id = uuidv4();
      localStorage.setItem(this.userIdentifierName, id);
    }
    return id;
  }

  constructor(public http: HttpClient) {}

  public setupTokens () {
    const url = `${environment.apiBase}/user/me/${this.userIdentifier}`;
    this.http.get(url).subscribe(response => {
      sessionStorage.setItem(this.userTokensName, JSON.stringify(response));
      this.ready = true;
    });
  }
}
