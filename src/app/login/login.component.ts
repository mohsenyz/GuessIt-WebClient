import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../LoginResponse';
import { Router } from '@angular/router';


@Component({
    selector		: 'app-login',
    templateUrl		: './login.component.html',
    styleUrls		: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
    problem					= '';

    constructor(
        private http: HttpClient,
        public 	router: Router
    ) {}

    ngOnInit() { }

    login(username: string, password: string): void {
        this.http.post<LoginResponse>(`${localStorage.getItem('server')}/login`,
            { username: username, password: password }).subscribe(data => {

                if (data.ok) {
                    localStorage.setItem('access_token', data.token);
                    localStorage.setItem('username', username);
                    this.router.navigate(['/main']);

                } else {
                    this.router.navigate(['/login']);
                    this.problem = data.problem;
                }

            });
    }
}
