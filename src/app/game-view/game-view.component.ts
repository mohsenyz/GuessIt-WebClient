import { Component,
		 OnInit,
		 Injectable }  
	from '@angular/core';

import { HttpClient }
	from '@angular/common/http';

import { RouterModule,
		 Router,
		 ActivatedRoute
		}
	from '@angular/router';

import { User }
	from '../user';
import { sendAnswerResponse }
	from '../sendAnswerResponse';
import { viewGameResponse }
	from '../viewGameResponse';
import { joinGameResponse }
	from '../joinGameResponse';


import { MatGridListModule,
		 MatButtonToggleModule,
		 MatButtonModule,
		 MatTabsModule,
		 MatListModule,
		}
	from '@angular/material';

import { GameService } 
	from '../game.service';


@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})


@Injectable()
export class GameViewComponent implements OnInit {
	
	game = {};
	inGame = false;

  constructor(
		private http    	: HttpClient,
		public  router  	: Router,
		private route 		: ActivatedRoute,
    	private GameService : GameService
  ) { }


  ngOnInit() {
  	this.viewGame(this.route.snapshot.params.gameID);
  }


  viewGame(gameID: string): void{
  	this.GameService.viewGame(gameID).subscribe(
		(viewGameResponse: viewGameResponse) => {
			if (viewGameResponse.ok){
				
				this.game = viewGameResponse.game;
    		    		
	    		viewGameResponse.game.teams.forEach(function(team){
	    			team.players.forEach(function(player){
	    				console.log(player.player);
	    				console.log(localStorage.getItem("username"));

	    				if (player.player == localStorage.getItem("username")){
	    					this.inGame = true;
	    				}
	    			});
	    		});

			}
			else {

			}
		}
    );
  }



  joinGame(gameID: string): void{
    this.GameService.joinGame(gameID, localStorage.getItem("username")).subscribe(
		(joinGameResponse: joinGameResponse) => {
			if (joinGameResponse.ok){

				this.router.navigate([`/game/${gameID}/team/${localStorage.getItem("username")}/play`]);

			}
			else {

			}
		}
    );
  }



}