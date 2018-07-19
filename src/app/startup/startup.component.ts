import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { RouterModule, Router }
        from '@angular/router';


@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  	constructor(
  		public  router  : Router
  	) { 
  		setTimeout(() => {
  			this.router.navigate(['/main']);
  		}, 5000);
  	}

  	ngOnInit() {
  		
  	}

}
