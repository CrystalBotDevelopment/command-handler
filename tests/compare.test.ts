import { APIApplicationCommand } from 'discord-api-types/v10';
import { Command, CommandLoader } from '../src';
import { Constructor } from '../src/types';
//	@ts-ignore
import { apiCommandData, editApiCommandData } from './data/apiCommands'

describe('Comparing commands to API commands', () => {

	const loader = new CommandLoader({ token: '', clientId: '' });


	beforeEach(() => {
		//	@ts-ignore
		loader.commands = new Array<Command>();
	});


	test.each([
		[apiCommandData('test'), require('./data/commands/test.command.ts').default, true],
		[apiCommandData('test', { name: 'a' }), require('./data/commands/test.command.ts').default, false],
		[apiCommandData('test', { description: 'a' }), require('./data/commands/test.command.ts').default, false],
		[apiCommandData('test', { type: 2 }), require('./data/commands/test.command.ts').default, false],
	])('Comparing simple command #%#', (api: APIApplicationCommand, cmd: Constructor<Command>, check) => {
		const command = loader.addConstructor(cmd);
		expect(command.matchesAPICommand(api)).toBe(check);
	})
})