import { Game } from './game';

export class GameListResponse {
	ok:         string;
    response:   string;
    games:      [Game];
}
