import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../user';
import { Game } from '../game';
import { GameListResponse } from '../GameListResponse';
import { GameJoinResponse } from '../GameJoinResponse';
import { MeService } from '../me.service';

@Component({
    selector:     'app-main',
    templateUrl:  './main.component.html',
    styleUrls:    ['./main.component.css']
})


@Injectable()
export class MainComponent implements OnInit {

    arrayColors = [];
    navLinks = [
        { label: 'friends'		, path: '/friends'},
        { label: 'play'			, path: '/main'},
        { label: 'profile'		, path: '/profile'},
        { label: 'shop'			, path: '/shop'}
    ];

    startedGames:   Game[];
    games:          Game[];
    wantedGames:    Game[];
    user:           User;
    smallWidth = false;

    constructor(
        private http:       HttpClient,
        public  router:     Router,
        private MeService:  MeService
    ) { }

    ngOnInit() {
        
        this.getProfile();
        this.getListOfGames();
        this.timeToStartTimer();
    }

    getListOfGames(): void {
        this.http.post<GameListResponse>(`${localStorage.getItem('server')}/game/list`, {}).subscribe(data => {
            if (data.ok) {
                this.games = data.games;
                this.wantedGames = data.games;
                this.games.forEach(function(game) {
                    game.timeToStart = Math.round((new Date(game.rules.start.date).getTime() - Date.now()) / 1000);
                });
                // console.log(this.games);
                // console.log(new Date(data.games[0].rules.start.date).getTime());
                // console.log(Date.now());
            } else {
                // try again
            }
        });

        // setTimeout(this.getListOfGames(), 1000 * 20);
    }

    gameJoin(id: string): void {
        this.http.post<GameJoinResponse>(`${localStorage.getItem('server')}/game/${id}/team/online6731/join`, {}).subscribe(data => {
            console.log(data);
            if (data.ok) {
                this.router.navigate([`/game/${id}/view`]);
            } else {
                // try again
            }
            // this.getListOfGames();
        });
    }

    openGame(id: string): void {
        this.router.navigate([`/game/${id}/view`]);
    }

    watchJoin(id: string): void {
        this.http.post<GameJoinResponse>('${localStorage.getItem("server")}/game/list', {}).subscribe(data => {
            if (data.ok) {
                // redirect to game view
            } else {
                // try again
            }
            // this.getListOfGames();
        });
    }

    gameNew(): void {
        this.router.navigate([`/game/new`]);
    }

    quickPlay(): void {
        this.router.navigate([`/game/${this.games[0].name}/view`]);
    }

    getProfile(): void {
        this.MeService.getProfile().subscribe((profileResponse) => {
            if (profileResponse.ok) {
                this.user = profileResponse.profile;
            } else {

            }
        });
    }

    timeToStartTimer(): void {
        console.log('game.timeToStart');
        if (this.games) {
            // console.log("game.timeToStart");
            this.games.forEach(function(game) {
                if (game.timeToStart > -1000) {
                    game.timeToStart -= 1;
                }
                // console.log(game.timeToStart);
            });
        }
        setTimeout(this.timeToStartTimer, 1000 * 1);
    }

}

