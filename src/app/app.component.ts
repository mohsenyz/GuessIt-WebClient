import { Component,
		  OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GuesstIt';

  ngOnInit() {
  	localStorage.setItem("server", "http://87.236.209.215:3000");
  }
}
