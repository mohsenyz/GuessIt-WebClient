import { Injectable } 
	from '@angular/core';

import { HttpClient }
	from '@angular/common/http';

import { Observable, of } 
	from 'rxjs';

import { User }
	from './user';

import { Question }
	from './question';

import { Game }
	from './game';
import { sendAnswerResponse }
	from './sendAnswerResponse';
import { viewGameResponse }
	from './viewGameResponse';
import { joinGameResponse }
	from './joinGameResponse';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  	constructor(
  		private http    	: HttpClient,
	) {}
  	

	joinGame(gameID: string, teamID: string): Observable<joinGameResponse>{
		return this.http.post<joinGameResponse>(`http://localhost:3000/game/${gameID}/team/${teamID}/join`, {});
	}

	viewGame(gameID: string): Observable<viewGameResponse>{
		return this.http.post<viewGameResponse>(`http://localhost:3000/game/${gameID}/view`, {});
	}
	
	sendAnswer(gameID: string, round: number, answer: string): Observable<sendAnswerResponse>{
		return this.http.post<sendAnswerResponse>(`http://localhost:3000/game/${gameID}/round/${round}/answer`, { answer: answer, questionID: round});
	}

}
