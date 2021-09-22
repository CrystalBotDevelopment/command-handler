import { Client } from 'discord.js';
import { Snowflake } from 'discord-api-types/v9';
import { Constructor, InversePartial } from '../types';
import { BaseCommandHandler } from './BaseCommandHandler';
import { Command } from './commands/Command';
import { objectCompare } from '../functions/objectCompare';

export interface CommandLoaderOptionalOptions {

	/**
	 * Should the loader delete commands it can't find?
	 * @default true
	 */
	deleteCommands?: boolean

	/**
	 * Should the loader update commands?
	 * @default true
	 */
	updateCommands?: boolean;

	/**
	 * Should the loader create commands?
	 * @default true
	 */
	createCommands?: boolean;

	/**
	 * Should the loader apply all commands to a specific guild?
	 *
	 * Reccomended for development
	 * @default undefined
	 */
	guildId?: Snowflake;
}


export interface CommandLoaderOptions extends CommandLoaderOptionalOptions {
	readonly clientId: Snowflake;
	readonly token: string;
}


export class CommandLoader extends BaseCommandHandler {

	private readonly _options: InversePartial<CommandLoaderOptions>;

	/**
	 * This class is used to load Commands without a Client instance.
	 * @param options The options for this class
	 */
	public constructor(options: CommandLoaderOptions) {
		super(options.token, options.clientId, options.guildId);

		this._options = Object.assign({
			recurisve: true,
			deleteCommands: true,
			updateCommands: true,
			createCommands: true
		}, options) as InversePartial<CommandLoaderOptions>;
	}

	/**
	 * Load all commands inside of this loader
	 */
	public async loadCommands(): Promise<this> {

		const applicationCommands = await this.getApplicationCommands();

		for(const command of this.commands) {
			let applicationCommand = applicationCommands.get(command.name.toLowerCase());
			applicationCommands.delete(applicationCommand?.name ?? '');

			const rawCmd = command.toJSON();

			//	Creating

			if(!applicationCommand) {
				if(!this._options.createCommands) continue;
				applicationCommand = await this._createCommand(command);
			}

			//	Updating

			else if(!objectCompare(rawCmd, applicationCommand)) {
				if(!this._options.updateCommands) continue;
				applicationCommand = await this._updateCommand(command, applicationCommand);
			}
		}

		//	Deleting commands

		if(this._options.deleteCommands) {
			for(const [key, value] of applicationCommands) {
				key; await this._deleteCommand(value);
			}
		}

		return this;
	}

	/**
	 * Delete all of the commands
	 */
	public async deleteAllCommands(): Promise<void> {
		for(const [_, applicationCommand] of await this.getApplicationCommands()) {
			_; await this._deleteCommand(applicationCommand);
		}
	}

	/**
	 * Create a new command class
	 * @param constructor The command constructor
	 * @returns The Command class
	 */
	protected _startCommand(constructor: Constructor<Command<Client<boolean>>>): Command<Client<boolean>> {
		//	@ts-ignore
		const c = new constructor();
		c.onStart();
		return c as Command;
	}
}