import { APIApplicationCommand } from 'discord-api-types/v10';

type key = 'test' | 'test-guild';


const obj: { [key: string]: APIApplicationCommand } = {
	'test': {
		id: '0',
		application_id: '0',
		version: '0',
		default_member_permissions: null,
		type: 1,
		name: 'test',
		description: 'Test command',
		options: []
	},
	get "test-guild"()   { return {...this["test"],   guild_id: '0'}; },
}

Object.freeze(obj);


export function apiCommandData(command: key, edited?: Partial<APIApplicationCommand>): APIApplicationCommand {
	return {...obj[command], ...edited};
}
