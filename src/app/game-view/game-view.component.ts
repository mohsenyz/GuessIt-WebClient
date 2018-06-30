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

import { MatGridListModule,
				 MatButtonToggleModule,
				 MatButtonModule,
				 MatTabsModule,
				 MatListModule,
				}
			from '@angular/material';

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
		private http    : HttpClient,
		public  router  : Router,
		private route 	: ActivatedRoute
  ) { }


  ngOnInit() {
  	this.http.post<gameViewResponse>(`http://localhost:3000/game/${this.route.snapshot.params.id}/view`, {})
		.subscribe(data => {

			console.log(data);

      if (data.ok){
        this.game = data.game;
    		    		
    		data.game.teams.forEach(function(team){
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
        // try again
      }
		});

  }
}


interface gameViewResponse {
	ok							: string;
	response 				: string;
	problem					: string;

	game 						: {
		name					: string;
		teams					: [{
			team				: string;
			
			players			: [{
				player		: string;
				rounds		: [ number ]
			}],
			
			rounds			: [{
				players		: [{
					player	: string;
					answer	: {
						content	: String;
					}
				}],
				question	: string;
				helps			: [{
					help		: string;
					usage		: number;
					date		: Date;
				}],
				score			: number;
			}]
		}],
		
		rules					: {
			rounds			: [{
				category	: string;
				tags			: [ string ];
				level			: {
					min			: number;
					max			: number;
				}
			}],
			
			teams				: {
				level			: {
					min			: number;
					max			: number;
				}
			},
			
			start				: {
				date			: Date;
				teams			: number;
			},
			
			duration		: number;
			
		},
		
		questions			: [{}];
		
		result				: {
			winner			: string;
		},
		
		statics				: {
			teams				: number;
		},
		
		creator				: string;
		
		started				: boolean;
		
	}
}