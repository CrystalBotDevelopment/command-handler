import { Command, CommandLoader } from '../src';
import { Constructor } from '../src/types';
import { apiCommandData, queryApiCommand } from './data/apiCommands';

describe('Comparing commands to API commands', () => {

	const loader = new CommandLoader({ token: '', clientId: '' });


	beforeEach(() => {
		//	@ts-ignore
		loader.commands = new Array<Command>();
	});


	const testCMD = require('./data/commands/test.command').default as Constructor<Command>;
	const subCMD = require('./data/commands/subcommand/SubCommand.command').default as Constructor<Command>;


	test.each([
		[true, testCMD, apiCommandData('test')],
		[false, testCMD, apiCommandData('test', { name: 'a' })],
		[false, testCMD, apiCommandData('test', { description: 'a' })],
		[false, testCMD, apiCommandData('test', { type: 2 })],
	])('Comparing simple command #%#', (check, cmd, api) => {
		const command = loader.addConstructor(cmd);
		expect(command.matchesAPICommand(api)).toBe(check);
	});


	test.each([
		[true, subCMD, apiCommandData('subcmd')],
		[false, subCMD, queryApiCommand('subcmd', { options: { 0: { $set: { name: 'test' } } } })],
		[false, subCMD, queryApiCommand('subcmd', { options: { 0: { $set: { type: 1 } } } })],
		[false, subCMD, queryApiCommand('subcmd', { options: { 0: { options: { 0: { $set: { name: 'test' } } } } } })],
		[false, subCMD, queryApiCommand('subcmd', { options: { 0: { $set: { description: 'test' } } } })]
	])('Comparing with subcommands #%#', (check, cmd, api) => {
		const command = loader.addConstructor(cmd);
		expect(command.matchesAPICommand(api)).toBe(check);
	});
});