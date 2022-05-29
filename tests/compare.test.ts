import { Command, CommandLoader } from '../src';
import { Constructor } from '../src/types';
//	@ts-ignore
import { apiCommandData, editApiCommandData, queryApiCommand } from './data/apiCommands'

describe('Comparing commands to API commands', () => {

	const loader = new CommandLoader({ token: '', clientId: '' });


	beforeEach(() => {
		//	@ts-ignore
		loader.commands = new Array<Command>();
	});


	const testCMD = require('./data/commands/test.command.ts').default as Constructor<Command>;
	const subCMD  = require('./data/commands/subcommand/SubCommand.command').default as Constructor<Command>;


	test.each([
		[true,  testCMD, apiCommandData('test')],
		[false, testCMD, apiCommandData('test', { name: 'a' })],
		[false, testCMD, apiCommandData('test', { description: 'a' })],
		[false, testCMD, apiCommandData('test', { type: 2 })],
	])('Comparing simple command #%#', (check, cmd, api) => {
		const command = loader.addConstructor(cmd);
		expect(command.matchesAPICommand(api)).toBe(check);
	})


	test.each([
		[true,  subCMD, apiCommandData('subcmd')],
		[false, subCMD, queryApiCommand('subcmd', {options:{0:{$set:{name:'test'}}}})]
	])('Comparing with subcommands #%#', (check, cmd, api) => {
		const command = loader.addConstructor(cmd);
		expect(command.matchesAPICommand(api)).toBe(check);
	});
})