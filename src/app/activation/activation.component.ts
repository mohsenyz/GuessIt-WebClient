import { Component, OnInit, Injectable } 	from '@angular/core';
import { HttpClient } 						from '@angular/common/http';
import { RouterModule, Router } 			from '@angular/router';


@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})

@Injectable()
export class ActivationComponent implements OnInit {

  constructor(
  	private http	: HttpClient,
  	public 	router 	: Router
  ) { }

  ngOnInit() {
  }

}
