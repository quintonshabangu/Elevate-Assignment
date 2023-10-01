import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConnectComponent } from './connect/connect.component';
import { materialModules } from './material-imports';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';


// export const googleChartsConfigSubject = new ReplaySubject<GoogleChartsConfig>(1);


// googleChartsConfigSubject.next(config);
const isIE = window.navigator.userAgent.indexOf('MSIE')>-1
 || window.navigator.userAgent.indexOf('Trident/')>-1
@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgChartsModule,
    ...materialModules,
    
    // MsalModule.forRoot(new PublicClientApplication
    //   (
    //     {
    //       auth: {
    //         clientId: environment.clientId,
    //         redirectUri: 'http://localhost:4200',
    //         authority: `https://login.microsoftonline.com/${environment.tenantId}`
    //       },
    //       cache:
    //       {
    //         cacheLocation:'localStorage',
    //         storeAuthStateInCookie:isIE
    //       }
    //     }
    //   ),
    //   {
    //     interactionType:InteractionType.Redirect,
    //     authRequest:{
    //       scopes:['user.read']
    //     }
    //   },
    //   {
    //     interactionType:InteractionType.Redirect,
    //     protectedResourceMap: new Map(
    //       [
    //         ['https://graph.microsoft.com/v1.0/me', ['user.Read']],
    //         // [environment.apiScopePath, ['api://d95e01ab-b356-4ef0-a132-9ce5f49244a0/api.scope']]
    //       ]
    //     )
    //   }
    //   )
  ],
  providers: [    
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true
    // }, MsalGuard
  ],
  bootstrap: [AppComponent /*, MsalRedirectComponent*/]
})
export class AppModule { }
