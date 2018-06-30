import { Component, OnInit, Injectable } 	from '@angular/core';
import { HttpClient } 						from '@angular/common/http';
import { RouterModule, Router } 			from '@angular/router';
import { User } 							from '../user';


@Component({
  selector		: 'app-login',
  templateUrl	: './login.component.html',
  styleUrls		: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
	
	usernameStatus 						= 'Enter your username here';
  passwordStatus 						= 'Enter your password here';

  usernameStatusColor 			= "#C0C0C0";
  passwordStatusColor 			= "#C0C0C0";


  constructor(
  	private http	: HttpClient,
  	public 	router 	: Router
  ) { }

  ngOnInit() { }
	
	login(username: string, password: string): void {		
		this.http.post<LoginResponse>('http://localhost:3000/login',
		 { username: username, password: password })
			.subscribe(data => {
				console.log(data);

				if (data.ok){
					localStorage.setItem("access_token", data.token);
					localStorage.setItem("username", username);
					this.router.navigate(['/interests']);
				}
				else {
					this.router.navigate(['/login']);
				}

			});
	}

	usernameChanged(username: string): void{
	 	if (username){
	 		if (username.length < 5){
	 			this.usernameStatus = 'weak';
	 			this.usernameStatusColor = "red";
	 		}
	 		else if (username.length < 8){
	 			this.usernameStatus = 'average';
	 			this.usernameStatusColor = "yellow";
	 		}
	 		else if (username.length < 12){
	 			this.usernameStatus = 'Good';
	 			this.usernameStatusColor = "green";
	 		}
	 	} else {
	 		this.usernameStatus = 'Enter your username here';
	 		this.usernameStatusColor = "#C0C0C0";
	 	}
	}

	passwordChanged(password: string): void{
	 	if (password){
	 		if (password.length < 5){
	 			this.passwordStatus = 'weak';
	 			this.passwordStatusColor = "red";
	 		}
	 		else if (password.length < 8){
	 			this.passwordStatus = 'average';
	 			this.passwordStatusColor = "yellow";
	 		}
	 		else if (password.length < 12){
	 			this.passwordStatus = 'Good';
	 			this.passwordStatusColor = "green";
	 		}
	 	} else {
	 		this.passwordStatus = 'Enter your password here';
	 		this.passwordStatusColor = "#C0C0C0";
	 	}
	}
}

interface LoginResponse {
	response 	: string;
  ok		 	: string;
  token 		: string;
  user 			: string;
}