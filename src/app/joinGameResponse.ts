import { User }
	from './user';


export class joinGameResponse {
	ok				: string;
	response 		: string;
	problem			: string;
	error			: string;
	
	profile	 		: User;	
}