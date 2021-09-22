import { Command } from '../classes/commands/Command';
import { Constructor } from '../types';
import { isConstructorOf } from './utils';

/**
 * Gets all the command constructors
 * @param files Directories
 * @returns The files parsed as Commands
 */
export function getCommands(files: string[]): Constructor<Command>[] {

	const commands = new Array<Constructor<Command>>();

	for (const file of files) {
		const data = getCommand(file);

		if(!isConstructorOf(data, Command))
			throw new Error(`File ${file} does not defaulty export a Command type`);

		commands.push(data);
	}

	return commands;
}

/**
 * Gets the default export, or the export of a file
 * @param file File path of this command
 * @returns The command constructor
 */
export function getCommand(file: string): any {
	let _a;
	return ((_a = require(file)).default ?? _a);
}