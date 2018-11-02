import { Component,
		OnInit,
		Injectable }  
	from '@angular/core';

import { HttpClient }
	from '@angular/common/http';

import { RouterModule, Router }
	from '@angular/router';

import { Good }
	from '../good';

import { User } 
	from '../user';


import { MatGridListModule,
		 MatButtonToggleModule,
		 MatButtonModule,
		 MatTabsModule,
		 MatListModule,
		}
	from '@angular/material';


import { ShopService } 
  from '../shop.service';


import { MeService } 
	from '../me.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
	
	goods		: [Good];
	user		: User;

	navLinks = [
		{ label: 'friends'		, path: '/friends'},
		{ label: 'play'			, path: '/main'},
		{ label: 'profile'		, path: '/profile'},
		{ label: 'shop'			, path: '/shop'}
	];


	constructor(
		private http		: HttpClient,
		public  router		: Router,
		private ShopService	: ShopService,
		private MeService	: MeService
	) { }


	ngOnInit() {
		this.search();
  		this.getProfile();
	}

	buy(goodID): void{
		this.ShopService.buy(goodID).subscribe((buyResponse) => {
			
			console.log(buyResponse);
			
			if (buyResponse.ok){
				this.getProfile();
			}
			else {
				
			}
		});
    }
	
	search(): void{
		this.ShopService.search().subscribe((shopSearchResponse) => {
			
			console.log(shopSearchResponse);
			
			if (shopSearchResponse.ok){
				this.goods = shopSearchResponse.goods;
			}
			else {
				
			}
		});
    }
    
    
  	getProfile(): void{
		this.MeService.getProfile().subscribe(
			(profileResponse) => {
				if (profileResponse.ok){
					this.user = profileResponse.profile;
				}
				else {

				}
			}
		);
		//setTimeout(this.getProfile(), 1000 * 10);
  	}


}
