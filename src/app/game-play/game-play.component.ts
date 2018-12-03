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

import { Question }
    from '../question';

import { Game }
    from '../game';

import { sendAnswerResponse }
    from '../sendAnswerResponse';

import { viewGameResponse }
    from '../viewGameResponse';

import { MatGridListModule,
         MatButtonToggleModule,
         MatButtonModule,
         MatTabsModule,
         MatListModule,
         MatInputModule,
        }
    from '@angular/material';

import { GameService }
    from '../game.service';


@Component({
    selector: 'app-game-play',
    templateUrl: './game-play.component.html',
    styleUrls: ['./game-play.component.css']
})


@Injectable()
export class GamePlayComponent implements OnInit {
    gameEnded		: boolean = false;
    game 			: Game;
    currentQuestion : Question;
    currentRound	: number = -1;
    score 			: number = 0;
    true_false_choices = ['علط', 'درست'];
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

                    this.loadNextQuestion();

                    viewGameResponse.game.teams.forEach(function(team){
                        team.members.forEach(function(player){

                        });
                    });

                }
                else {

                }
            }
        );
    }


    sendAnswer(answer: string): void{
        this.GameService.sendAnswer(this.game.name, this.currentRound, answer).subscribe(
        (sendAnswerResponse: sendAnswerResponse) => {
            if (sendAnswerResponse.ok){
                this.score += sendAnswerResponse.score;
                //this.loadNextQuestion();
            } else {
                console.log('errooooooooooor');
                //this.loadNextQuestion();
            }
        });
        this.loadNextQuestion();
    }

    loadNextQuestion(): void{
        if (this.currentRound < this.game.questions.length - 1){
            this.currentRound += 1;
            console.log(this.currentQuestion);
        } else {
            this.gameEnded = true;
            console.log('game ended');
        }
    }



}
