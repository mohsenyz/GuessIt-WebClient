import { Question }
    from './question';


export class Game {
    name					: string;
    teams					: [{
        team				: string;

        members			: [{
            member		: string;
            rounds		: [ number ];
        }],

        rounds			: [{
            members		: [{
                member	: string;
                answer	: {
                    content	: String;
                }
            }];
            question	: Question;
            score		: number;
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

    timeToStart 		: number;

}
