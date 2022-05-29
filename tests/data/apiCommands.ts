import { APIApplicationCommand } from 'discord-api-types/v10';

type key = 'test' | 'subcmd';


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


	'subcmd': {
		id: '1',
		application_id: '1',
		version: '1',
		default_member_permissions: null,
		type: 1,
		name: 'subcmd',
		description: 'just some test command',
		options: [
			{
				type: 2,
				name: 'something',
				description: 'some subcommand group',
				options: [
					{ type: 1, name: 'a', description: 'A subcommand' },
					{ type: 1, name: 'b', description: 'B subcommand' },
					{ type: 1, name: 'c', description: 'C subcommand' },
				]
			},
			{ type: 1, name: 'test', description: 'test' },
		]
	}
}

Object.freeze(obj);


export function apiCommandData(command: key, edited?: Partial<APIApplicationCommand>): APIApplicationCommand {
	return {...obj[command], ...edited};
}


export function queryApiCommand(command: key, query?: any): APIApplicationCommand {
	const cmd = JSON.parse(JSON.stringify(apiCommandData(command)));
	queryChange(cmd, query);

	return cmd;
}


function queryChange(object: Object | any[], data: any): void {
	if (object instanceof Array) {
		if (data.hasOwnProperty('$add'))
			return object.push(data['$add']) as any as void;

		Object.entries(data).forEach(([i, v]) => {
			//	@ts-ignore
			queryChange(object[i], v);
		});
	}

	if (data.hasOwnProperty('$set'))
		return Object.assign(object, data['$set']);


	Object.entries(data).forEach(([ i, v ]) => {
		//	@ts-ignore
		queryChange(object[i], v)
	});

}