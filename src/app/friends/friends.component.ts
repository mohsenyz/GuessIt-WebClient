import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

	navLinks = [
		{ label: 'friends'		, path: '/friends'},
		{ label: 'play'			, path: '/main'},
		{ label: 'profile'		, path: '/profile'},
		{ label: 'shop'			, path: '/shop'}
	];

  constructor() { }

  ngOnInit() {
  }

}
