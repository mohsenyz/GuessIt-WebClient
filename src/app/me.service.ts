import { Injectable } 
		from '@angular/core';
import { HttpClient }
		from '@angular/common/http';
import { Observable, of } 
		from 'rxjs';

import { User }
		from './user';


@Injectable({
  providedIn: 'root',
})


export class MeService {

  	constructor(
  		private http    	: HttpClient,
	) {}
  	

	getProfile(): Observable<profileResponse>{
		return this.http.post<profileResponse>('http://localhost:3000/me/profile', {});
	}

}

interface profileResponse {
	ok				: string;
	response 		: string;
	problem			: string;
	error			: string;
	
	profile	 		: User;
}
