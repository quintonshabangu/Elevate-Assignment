import { Component, OnInit } from '@angular/core';
import { UserContextService } from './shared/services/user-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public userContext: UserContextService) {}
  
  ngOnInit(): void {
    this.userContext.setupTokens()
  }
}
