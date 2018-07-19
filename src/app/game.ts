import { Question }
	from './question';


export class Game {
	name					: string;
	teams					: [{
		team				: string;
		
		players			: [{
			player		: string;
			rounds		: [ number ];
		}],
		
		rounds			: [{
			players		: [{
				player	: string;
				answer	: {
					content	: String;
				}
			}];
			question	: string;
			helps			: [{
				help		: string;
				usage		: number;
				date		: Date;
			}],
			score			: number;
		}]
	}];
	
	rules					: {
		rounds			: [{
			category	: string;
			tags			: [ string ];
			level			: {
				min			: number;
				max			: number;
			}
		}],
		
		teams				: {
			level			: {
				min			: number;
				max			: number;
			}
		},
		
		start				: {
			date			: Date;
			teams			: number;
		},
		
		duration		: number;
		
	};
	
	questions			: [Question];
	
	result				: {
		winner			: string;
	};
	
	statics				: {
		teams				: number;
	};
	
	creator				: string;
	
	started				: boolean;
	
}