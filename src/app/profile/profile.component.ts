import { Component,
				 OnInit,
				 Injectable }  
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


@Injectable()
export class ProfileComponent implements OnInit {


	arrayColors = [];
	navLinks = [
		{ label: 'friends'		, path: '/friends'},
		{ label: 'play'			, path: '/main'},
		{ label: 'profile'		, path: '/profile'}
	];

	onlineGames = [];

	nextGames = [];

  constructor(
		private http    : HttpClient,
		public  router  : Router
  ) { }


  ngOnInit() {
  	this.getListOfGames();
  }

  getListOfGames(): void{
  	this.http.post<gameListResponse>('http://localhost:3000/game/list', {})
		.subscribe(data => {
			console.log(data);
      if (data.ok){
        this.onlineGames = data.games.filter(game => game.started);
        this.nextGames = data.games.filter(game => !game.started);
      }
      else {
        // try again
      }
      //this.getListOfGames();
		});
  }
}

interface gameListResponse {
	ok			: string;
	response 	: string;
	games 		: [{
		name 	: string;
		started	: boolean;
	}];
}
