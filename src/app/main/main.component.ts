import { Component,
				 OnInit,
				 Injectable }  
	from '@angular/core';

import { HttpClient }
  from '@angular/common/http';

import { RouterModule, Router }
  from '@angular/router';

import { User }
  from '../user';

import { Game }
  from '../game';

import { MatGridListModule,
				 MatButtonToggleModule,
				 MatButtonModule,
				 MatTabsModule,
				 MatListModule,
				}
	from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


@Injectable()
export class MainComponent implements OnInit {


	arrayColors = [];
	navLinks = [
		{ label: 'friends'		, path: '/friends'},
		{ label: 'play'				, path: '/main'},
		{ label: 'profile'		, path: '/profile'}
	];

	onlineGames    : Game[];

	nextGames      : Game[];

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

  gameJoin(id: string): void{
  	this.http.post<gameJoinResponse>(`http://localhost:3000/game/${id}/team/online6731/join`, {})
		.subscribe(data => {
			console.log(data);
      if (data.ok){
        this.router.navigate([`/game/${id}/view`]);
      }
      else {
        // try again
      }
      // this.getListOfGames();
		});
  }


  watchJoin(id: string): void{
    this.http.post<gameJoinResponse>('http://localhost:3000/game/list', {})
    .subscribe(data => {
      console.log(data);
      if (data.ok){
        // redirect to game view
      }
      else {
        // try again
      }
      // this.getListOfGames();
    });
  }

  gameNew(): void{
    this.router.navigate([`/game/new`]);
  }

  quickPlay(): void{
    this.router.navigate([`/game/${this.nextGames[0].name}/view`]);
  }




}



interface gameListResponse {
	ok				: string;
	response 	: string;
	games 		: [Game];
}

interface gameJoinResponse {
	ok				: string;
	response 	: string;

}
