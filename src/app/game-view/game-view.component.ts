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

import { Game }
    from '../Game';

import { GameService } 
    from '../game.service';

import { formatDate } from '@angular/common';
    

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})


@Injectable()
export class GameViewComponent implements OnInit {
    
    game: Game;
    isInGame = false;
    teamNames = [];
    myTeam = localStorage.getItem("username");
    date;

  constructor(
        private http    	: HttpClient,
        public  router  	: Router,
        private route 		: ActivatedRoute,
        private GameService : GameService
  ) { }


  ngOnInit() {
      this.viewGame(this.route.snapshot.params.gameID);
      localStorage.setItem("isInGame", "false");
  }


  viewGame(gameID: string): void{
      this.GameService.viewGame(gameID).subscribe(
        (viewGameResponse: viewGameResponse) => {
            if (viewGameResponse.ok){
                
                this.game = viewGameResponse.game;
                this.date = formatDate(this.game.rules.start.date, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0430');

                viewGameResponse.game.teams.forEach(function(team){
                    
                    if (team.team == localStorage.getItem("username")){
                        localStorage.setItem("isInGame", "true");
                        //this.isInGame = true;
                        console.log('you are in game');
                    }
                    
                    team.members.forEach(function(player){
                        
                    });
                });

                viewGameResponse.game.teams.forEach(function(team){
                    this.teamNames.push(team.team);
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
                
                this.viewGame(this.route.snapshot.params.gameID);
                
                //this.router.navigate([`/game/${gameID}/team/${localStorage.getItem("username")}/play`]);
            }
            else {

            }
        }
    );
  }

  openGame(gameID: string): void{
    this.router.navigate([`/game/${gameID}/team/${localStorage.getItem("username")}/play`]);
  }

  inGame(){
      return localStorage.getItem("isInGame") == "true";
  }



}
