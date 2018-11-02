import { Component,
		 OnInit,
		 Injectable,
		 ElementRef,
		 ViewChild }  
	from '@angular/core';

import { HttpClient }
	from '@angular/common/http';

import { RouterModule,
		 Router,
		 ActivatedRoute
		}
	from '@angular/router';

import {COMMA, ENTER} from '@angular/cdk/keycodes';

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

import {FormControl} from '@angular/forms';

import { MatGridListModule,
		 MatButtonToggleModule,
		 MatButtonModule,
		 MatTabsModule,
		 MatListModule,
		 MatAutocompleteSelectedEvent,
		 MatChipInputEvent,
		 MatChipsModule,
		 MatIconModule,
		 MatSelectModule,
		 MatAutocompleteModule
		}
	from '@angular/material';

import {CalendarModule} from 'primeng/calendar';


import { GameService } 
	from '../game.service';

import {Observable} from 'rxjs';

import {map, startWith} from 'rxjs/operators';



@Component({
	selector: 'app-game-new',
	templateUrl: './game-new.component.html',
	styleUrls: ['./game-new.component.css']
})


@Injectable()
export class GameNewComponent implements OnInit {

	visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredtags: Observable<string[]>;
  tags: string[] = ['movie'];
  alltags: string[] = ['music', 'footballPlayer', 'footballTeam', 'actor', 'director', 'name', 'country', 'book', 'quote'];
	gameType = 'singlePlayer';
	questionCount = 20;
	duration = 300;
	
  @ViewChild('tagInput') tagInput: ElementRef;


  gameLength : number;

  startDate: Date;
  
  startTime: Date;

  rangeDates: Date[];

  minDate: Date;

  maxDate: Date;

  es: any;

  tr: any;

  invalidDates: Array<Date>

	constructor(
		private http        : HttpClient,
		public  router      : Router,
		private route       : ActivatedRoute,
		private GameService : GameService) {

			this.filteredtags = this.tagCtrl.valueChanges.pipe(
			startWith(null),
			map((tag: string | null) => tag ? this._filter(tag) : this.alltags.slice()));
	}


	ngOnInit() {
		this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }

    this.tr = {
      firstDayOfWeek : 1
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today,invalidDate];
	}

	gameNew(type: string, tags: string[], questionCount: number, duration: number): void{
		this.GameService.gameNew(type, tags, questionCount, duration).subscribe(data => {
			console.log(data);

			if (data.ok){
				this.router.navigate([`/game/${data.game.name}/view`]);
			}
			else {
				// try again
			}
			
		});
	}


  add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our tag
		if ((value || '').trim()) {
		  this.tags.push(value.trim());
		}

		// Reset the input value
		if (input) {
		  input.value = '';
		}

		this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
		const index = this.tags.indexOf(tag);

		if (index >= 0) {
		  this.tags.splice(index, 1);
		}
  }

  selected(event: MatAutocompleteSelectedEvent): void {
		this.tags.push(event.option.viewValue);
		this.tagInput.nativeElement.value = '';
		this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

}

