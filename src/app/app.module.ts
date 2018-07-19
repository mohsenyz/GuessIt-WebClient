import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { FormsModule }             from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }        from '@angular/common/http';
import { RouterModule,
         Routes }
      from '@angular/router';

import { AppComponent }            from './app.component';
import { LoginComponent }          from './login/login.component';
import { SignupComponent }         from './signup/signup.component';
import { InterestsComponent }      from './interests/interests.component';
import { MainComponent }           from './main/main.component';
import { ProfileComponent }        from './profile/profile.component';
import { FriendsComponent }        from './friends/friends.component';
import { GameViewComponent }       from './game-view/game-view.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatGridListModule,
         MatButtonToggleModule,
         MatTabsModule,
         MatInputModule,
         MatListModule,
         MatFormFieldModule,
         MatProgressSpinnerModule }
      from '@angular/material';


import { ScrollbarModule }         from 'ngx-scrollbar';
import { ColorPickerModule }       from 'ngx-color-picker';

import { JwtModule }               from '@auth0/angular-jwt';
import { StartupComponent }        from './startup/startup.component';
import { ActivationComponent }     from './activation/activation.component';
import { GamePlayComponent } from './game-play/game-play.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const appRoutes: Routes = [
  { path: 'login',              component: LoginComponent },
  { path: 'signup',             component: SignupComponent },
  { path: 'interests',          component: InterestsComponent },
  { path: 'main',               component: MainComponent },
  { path: 'profile',            component: ProfileComponent },
  { path: 'game/:gameID/view',  component: GameViewComponent },
  { path: 'startup',            component: StartupComponent },
  { path: 'activation',         component: ActivationComponent },
  { path: 'game/:gameID/team/:teamID/play',      component: GamePlayComponent },
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    InterestsComponent,
    MainComponent,
    ProfileComponent,
    FriendsComponent,
    GameViewComponent,
    StartupComponent,
    ActivationComponent,
    GamePlayComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    ScrollbarModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    ColorPickerModule,
    MatProgressSpinnerModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: [],
        headerName: 'authorization',
        authScheme: ''
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }