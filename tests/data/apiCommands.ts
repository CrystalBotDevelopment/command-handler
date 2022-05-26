import { APIApplicationCommand } from 'discord-api-types';

type key = 'test-match' | 'test-unmatch';


const obj: { [key: string]: APIApplicationCommand } = {
	'test-match': {
		id: '0',
		name: 'test',
		description: 'Test command',
		options: [],
	},
	'test-unmatch': {
		id: '1',
		name: 'test',
		description: 'Test command',
		options: [],
	}
}

Object.freeze(object);



export default function(command: key): APIApplicationCommand {
	return obj[command];
}