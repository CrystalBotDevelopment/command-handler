import { APIApplicationCommand } from 'discord-api-types/v10';

type key = 'test-match' | 'test-match-guild' | 'test-unmatch' | 'test-unmatch-guild';


const obj: { [key: string]: APIApplicationCommand } = {
	'test-match': {
		id: '0',
		application_id: '0',
		version: '0',
		default_member_permissions: null,
		type: 1,
		name: 'test',
		description: 'Test command',
		options: []
	},
	get "test-match-guild"()   { return {...this["test-match"],   guild_id: '0'}; },
}

Object.freeze(obj);



export function apiCommandData(command: key): APIApplicationCommand {
	return obj[command];
}


export function editCommand(command: key, edited: Partial<APIApplicationCommand>): APIApplicationCommand {
	return {...apiCommandData(command), ...edited};
}
