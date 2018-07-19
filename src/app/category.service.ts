import { Injectable } 
	from '@angular/core';

import { HttpClient }
	from '@angular/common/http';

import { Observable, of } 
	from 'rxjs';

import { Category }
	from './category';


@Injectable({
  providedIn: 'root',
})


export class CategoryService {

  	constructor(
  		private http    	: HttpClient,
	) {}
  	

	search(): Observable<searchCategoryResponse>{
		return this.http.post<searchCategoryResponse>('http://localhost:3000/category/search', { condition: {} });
	}
}

interface searchCategoryResponse{
	ok			: string;
	response 	: string;
	problem		: string;
	categories	: [Category]
}