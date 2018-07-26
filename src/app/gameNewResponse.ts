import { Game }
	from './game';


export class gameNewResponse {
	ok				: string;
	response 		: string;
	problem			: string;
	error			: string;
	
	game	 		: Game;	
}