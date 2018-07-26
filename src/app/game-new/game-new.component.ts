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
		}
	from '@angular/material';

import { GameService } 
	from '../game.service';


@Component({
	selector: 'app-game-new',
	templateUrl: './game-new.component.html',
	styleUrls: ['./game-new.component.css']
})


@Injectable()
export class GameNewComponent implements OnInit {

	constructor(
		private http    	: HttpClient,
		public  router  	: Router,
		private route 		: ActivatedRoute,
		private GameService : GameService
	) { }


	ngOnInit() {

	}

	gameNew(type: string, tags: string[]): void{
		this.GameService.gameNew(type, tags).subscribe(data => {
			console.log(data);

			if (data.ok){
				this.router.navigate([`/game/${data.game.name}/view`]);
			}
			else {
				// try again
			}
  			
		});
	}

}

