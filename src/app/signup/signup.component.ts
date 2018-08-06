import { Component, OnInit, Injectable }  from '@angular/core';
import { HttpClient }                     from '@angular/common/http';
import { RouterModule, Router }           from '@angular/router';
import { User }                           from '../user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

@Injectable()
export class SignupComponent implements OnInit {
  
  usernameStatus            = '';
  passwordStatus            = '';
  mobileNumberStatus        = '';

  usernameStatusColor       = "#C0C0C0";
  passwordStatusColor       = "#C0C0C0";
  mobileNumberStatusColor   = "#C0C0C0";

  usernameError             = false;



  constructor(
    private http    : HttpClient,
    public  router  : Router
  ) { }

  ngOnInit() { 
    
    var Nanobar = require('nanobar/nanobar.js');
    var nanobar = new Nanobar({ classname: "nanobarClass",
                                id  : "nanobarId",
                                target: document.getElementById('loginDiv')
                                });
    nanobar.go(100);
    

  }

  signup(username: string, password: string, name: string): void {
  	this.http.post<SignupResponse>('http://localhost:3000/signup',
	 { username: username, password: password, name: name })
		.subscribe(data => {
			console.log(data);

      this.usernameError = false;
      if (data.ok){
        this.router.navigate(['/interests']);
      }
      else {
        if (data.problem == 'repetitive username'){
          this.usernameError = true;
          this.usernameStatus = 'repetitive username !!!';
        }
        else if (0){

        }
        else {
          this.router.navigate(['/signup']);
        }
        
      }
      
		});
  }

  usernameChanged(username: string): void{
    if (username){
      if (username.length < 5){
        //this.usernameStatus = 'weak';
        //this.usernameStatusColor = "red";
      }
      else if (username.length < 8){
        //this.usernameStatus = 'average';
        //this.usernameStatusColor = "yellow";
      }
      else if (username.length < 12){
        //this.usernameStatus = 'Good';
        //this.usernameStatusColor = "green";
      }
    } else {
      this.usernameStatus = '';
      this.usernameStatusColor = "#C0C0C0";
    }
  }

  passwordChanged(password: string): void{
    if (password){
      if (password.length < 5){
        //this.passwordStatus = 'weak';
        //this.passwordStatusColor = "red";
      }
      else if (password.length < 8){
        //this.passwordStatus = 'average';
        //this.passwordStatusColor = "yellow";
      }
      else if (password.length < 12){
        //this.passwordStatus = 'Good';
        //this.passwordStatusColor = "green";
      }
    } else {
      this.passwordStatus = '';
      this.passwordStatusColor = "#C0C0C0";
    }
  }
  
  mobileNumberChanged(mobileNumber: string): void{
    if (mobileNumber){
      if (mobileNumber.length < 5){
        //this.mobileNumberStatus = 'weak';
        //this.mobileNumberStatusColor = "red";
      }
      else if (mobileNumber.length < 8){
        //this.mobileNumberStatus = 'average';
        //this.mobileNumberStatusColor = "yellow";
      }
      else if (mobileNumber.length < 12){
        //this.mobileNumberStatus = 'Good';
        //this.mobileNumberStatusColor = "green";
      }
    } else {
      this.mobileNumberStatus = '';
      this.mobileNumberStatusColor = "#C0C0C0";
    }
  }

}


interface SignupResponse {
  ok		 		: string;
  user 			: string;
	response 	: string;
  problem   : string;
}