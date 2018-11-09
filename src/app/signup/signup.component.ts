import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../LoginResponse';
import { SignupResponse } from '../SignupResponse';

@Component({
    selector:       'app-signup',
    templateUrl:    './signup.component.html',
    styleUrls:      ['./signup.component.css']
})

@Injectable()
export class SignupComponent implements OnInit {

    problem = '';
    agree: boolean;

    constructor(private http: HttpClient, public  router: Router) { }

    ngOnInit() { }

    signup(username: string, password: string, mobileNumber: string): void {
        if (!this.agree) {
            this.problem = 'please agree to our terms first';
            return;
        }

        this.http.post<SignupResponse>(`${localStorage.getItem('server')}/signup/member`,
            { username: username, password: password, mobileNumber: mobileNumber }).subscribe(data => {

            if (data.ok) {
                localStorage.setItem('username', username);
                this.router.navigate(['/activation']);
            } else {
                this.problem = data.problem;
            }
        });
    }

    guest(): void {
        this.http.post<SignupResponse>(`${localStorage.getItem('server')}/signup/guest`, {}).subscribe(data => {

            if (data.ok) {
                localStorage.setItem('username', data.username);
                localStorage.setItem('password', data.password);

                this.http.post<LoginResponse>(`${localStorage.getItem('server')}/login`,
                    { username: localStorage.getItem('username'), password: localStorage.getItem('username') }).subscribe(data => {

                        if (data.ok) {
                            localStorage.setItem('access_token', data.token);
                            this.router.navigate(['/interests']);
                        } else {
                            this.router.navigate(['/login']);
                        }

                    });
            } else {
                this.problem = data.problem;
            }
        });
    }
}
