import { Injectable } from '@angular/core';
import { UserContextService } from './user-context.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private userContext: UserContextService, private http: HttpClient) { }

  public GetActivitySummary() : Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.userContext.userTokens?.accessToken}`);
    
    let url = `https://api.humanapi.co/v1/human/activities/summaries`
    return this.http.get(url, { headers: headers});
  }
}
