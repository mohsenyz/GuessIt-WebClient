import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InterestsComponent } from './interests/interests.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { GameViewComponent } from './game-view/game-view.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatGridListModule,
         MatButtonToggleModule,
         MatTabsModule,
         MatInputModule,
         MatListModule,
         MatFormFieldModule,
         MatProgressSpinnerModule,
         MatChipInputEvent,
         MatAutocompleteSelectedEvent,
         MatChipsModule,
         MatIconModule,
         MatAutocompleteModule,
         MatSelectModule,
         MatCheckboxModule,
         MatProgressBarModule
      } from '@angular/material';

import { ScrollDispatchModule } from '@angular/cdk/scrolling';


import {AccordionModule} from 'primeng/accordion';     // accordion and accordion tab
import {MenuItem} from 'primeng/api';                 // api
import {CalendarModule} from 'primeng/calendar';

// import { ScrollbarModule }         from 'ngx-scrollbar';
import { ColorPickerModule } from 'ngx-color-picker';

import { JwtModule } from '@auth0/angular-jwt';
import { StartupComponent } from './startup/startup.component';
import { ActivationComponent } from './activation/activation.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameNewComponent } from './game-new/game-new.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuardService } from './authGuard.service';


export function tokenGetter() {
    return localStorage.getItem('access_token');
}

const appRoutes: Routes = [
    { path: 'login',              component: LoginComponent,        canActivate: [] },
    { path: 'signup',             component: SignupComponent,       canActivate: [] },
    { path: 'interests',          component: InterestsComponent,    canActivate: [AuthGuardService] },
    { path: 'main',               component: MainComponent,         canActivate: [AuthGuardService] },
    { path: 'profile',            component: ProfileComponent,      canActivate: [AuthGuardService] },
    { path: 'game/:gameID/view',  component: GameViewComponent,     canActivate: [AuthGuardService] },
    { path: 'startup',            component: StartupComponent,      canActivate: [AuthGuardService] },
    { path: 'shop',	              component: ShopComponent,         canActivate: [AuthGuardService] },
    { path: 'activation',         component: ActivationComponent,   canActivate: [] },
    { path: 'game/new',           component: GameNewComponent,      canActivate: [AuthGuardService] },
    { path: 'game/:gameID/team/:teamID/play', component: GamePlayComponent, canActivate: [AuthGuardService] },
    { path: '', redirectTo: '/main', pathMatch: 'full' }
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
        GamePlayComponent,
        GameNewComponent,
        ShopComponent,

    ],
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: true } /* <-- debugging purposes only */ ),
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatButtonModule,
        MatInputModule,
        // ScrollbarModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatListModule,
        MatFormFieldModule,
        ColorPickerModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        CalendarModule,
        MatSelectModule,
        MatProgressBarModule,
        ScrollDispatchModule,
        MatCheckboxModule,

        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['87.236.209.215:3000'],
                blacklistedRoutes: [],
                headerName: 'authorization',
                authScheme: ''
            }
        })
    ],
    providers: [AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule { }
