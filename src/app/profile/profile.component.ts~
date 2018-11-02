import { Component,
		 OnInit
		}  
		from '@angular/core';

import { HttpClient }                     from '@angular/common/http';
import { RouterModule, Router }           from '@angular/router';
import { User }                           from '../user';
import { MatGridListModule,
				 MatButtonToggleModule,
				 MatButtonModule,
				 MatTabsModule,
				 MatListModule,
		}
		from '@angular/material';

import { MeService } 
	from '../me.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {


	arrayColors = [];
	navLinks = [
		{ label: 'friends'		, path: '/friends'},
		{ label: 'play'			, path: '/main'},
		{ label: 'profile'		, path: '/profile'}
	];

	user: User;

  	constructor(
		private http    	: HttpClient,
		public  router  	: Router,
		private MeService	: MeService
  	) { }


  	ngOnInit() {
  		this.getProfile();
  	}

  	getProfile(): void{
		this.MeService.getProfile().subscribe(
			(profileResponse) => {
				if (profileResponse.ok){
					this.user = profileResponse.profile;
				}
				else {

				}
			}
		);
  	}

}

