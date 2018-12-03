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

import { gameNewResponse }
	from './gameNewResponse';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  	constructor(
  		private http    	: HttpClient,
	) {}


	joinGame(gameID: string, teamID: string): Observable<joinGameResponse>{
		return this.http.post<joinGameResponse>(`${localStorage.getItem("server")}/game/${gameID}/team/${teamID}/join`, {});
	}

	viewGame(gameID: string): Observable<viewGameResponse>{
		return this.http.post<viewGameResponse>(`${localStorage.getItem("server")}/game/${gameID}/view`, {});
	}

	sendAnswer(gameID: string, round: number, answer: any): Observable<sendAnswerResponse>{
		return this.http.post<sendAnswerResponse>(`${localStorage.getItem("server")}/game/${gameID}/round/${round}/answer`, { answer: answer, questionID: round});
	}

	gameNew(type: string, tags: string[], questionCount: number, duration: number): Observable<gameNewResponse>{
		return this.http.post<gameNewResponse>(`${localStorage.getItem("server")}/game/new`, { type: type, tags: tags,  questionCount: questionCount, duration: duration });
	}

}
