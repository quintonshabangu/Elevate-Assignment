import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserContextService } from '../shared/services/user-context.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})

export class ConnectComponent implements OnInit {
  title = 'health-data';
  public token = null;
  public fetchTokenEndpoint = `${environment.apiBase}/auth/session/connect/registration/`;
  public registerPublicToken = `${environment.apiBase}/auth/session/connect/register`;
  public connectClosed = false;
  
  constructor(public http: HttpClient, public userContext: UserContextService) {
  }

  fetchToken() {
    const headers = new HttpHeaders({});
    this.http.get(`${this.fetchTokenEndpoint}${this.userContext.userIdentifier}`)
      .subscribe((response: any) => {
        this.token = response;
    })
  }

   ngOnInit() {
     if ( ! this.token ) {
         this.fetchToken(); 
     }
  }

  connect(callbackUrl: string, http: HttpClient, username: string) {
    let { HumanConnect } : any = window;

    let options = {
      clientUserId: username,
      clientId: environment.hapiClientId,
      publicToken: this.userContext.userTokens?.publicToken,
      finish: function(err, sessionTokenObject) {
        sessionTokenObject.clientUserId = username;
        http.post(callbackUrl, sessionTokenObject)
          .subscribe(() => {
            location.reload();
        });
      },
      close: () => { location.reload(); },
      error: () => { debugger; }
    }

    HumanConnect.open(options);
  }
}