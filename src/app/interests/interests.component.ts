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

import { MatGridListModule ,
				 MatButtonToggleModule }
				from '@angular/material';


@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})


@Injectable()
export class InterestsComponent implements OnInit {
	

	interests = [];


  constructor(
		private http    : HttpClient,
		public  router  : Router
  ) { }


  ngOnInit() {
  }
  
  
  setInterests(): void {
  	this.http.post<EditUserResponse>('http://localhost:3000/me/edit',
	 	{ interests: this.interests }, { withCredentials: true })
		.subscribe(data => {
			console.log(data);
      if (data.ok){
        this.router.navigate(['/main']);
      }
      else {
        this.router.navigate(['/interests']);
      }
      
		});
  }




  toggleInterest(event): void{
  	if (this.interests.includes(event.target.name)){
  		event.target.style['background'] = '#b7ffb7';
  		
  		const index: number = this.interests.indexOf(event.target.name);
	    if (index !== -1) {
	        this.interests.splice(index, 1);
	    }
  	}
  	else{
  		event.target.style['background'] = '#b7ff27';

  		this.interests.push(event.target.name);
  	}
  	
  }

  

  tiles = [
	{text: 'Cinema', picture: 'https://image.flaticon.com/icons/svg/930/930139.svg', cols: 1, rows: 1, color: 'lightblue'},
	{text: 'Music', picture: 'https://image.flaticon.com/icons/svg/148/148722.svg', cols: 1, rows: 1, color: 'lightgreen'},
	{text: 'Sport', picture: 'https://image.flaticon.com/icons/svg/755/755336.svg', cols: 1, rows: 1, color: 'lightpink'},
	{text: 'Technology', picture: 'https://image.flaticon.com/icons/svg/865/865122.svg', cols: 1, rows: 1, color: '#DDBDF1'},
	{text: 'Science', picture: 'http://kmit.in/emagazine/wp-content/uploads/2017/10/1260-music.jpg', cols: 1, rows: 1, color: '#DDBDF1'},
	{text: 'Science', picture: 'http://kmit.in/emagazine/wp-content/uploads/2017/10/1260-music.jpg', cols: 1, rows: 1, color: '#DDBDF1'},
	{text: 'Science', picture: 'http://kmit.in/emagazine/wp-content/uploads/2017/10/1260-music.jpg', cols: 1, rows: 1, color: '#DDBDF1'},
	{text: 'Science', picture: 'http://kmit.in/emagazine/wp-content/uploads/2017/10/1260-music.jpg', cols: 1, rows: 1, color: '#DDBDF1'}
  ];

}

interface EditUserResponse {
	ok				: string;
	response 	: string;
}