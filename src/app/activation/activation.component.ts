import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { activationResponse } from '../activationResponse';

@Component({
    selector: 'app-activation',
    templateUrl: './activation.component.html',
    styleUrls: ['./activation.component.css']
})

@Injectable()
export class ActivationComponent implements OnInit {

    constructor(private http: HttpClient, public router: Router) { }

    ngOnInit() { }

    active(code): void {
        this.http.post<activationResponse>(
            `${localStorage.getItem('server')}/signup/activation/user/${localStorage.getItem('username')}/code/${code}`, {})
            .subscribe(data => {
                if (data.ok) {
                    this.router.navigate(['/interests']);
                } else {

                }
        });
    }
}
