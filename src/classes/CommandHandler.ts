import { Client, CommandInteraction } from 'discord.js';
import { objectCompare } from '../functions/objectCompare';
import { Constructor, InversePartial } from '../types';
import { BaseCommandHandler } from './BaseCommandHandler';
import { Command } from './commands/Command';
import { Snowflake } from 'discord-api-types/v9';
import { CommandError } from './CommandError';


export interface CommandHandlerOptions {

	/**
	 * Should the CommandHandler delete commands it can't find?
	 * @default false
	 */
	readonly deleteCommands?: boolean;

	/**
	 * Should the CommandHandler update commands?
	 * @default false
	 */
	readonly updateCommands?: boolean;

	/**
	 * Should the CommandHandler create commands?
	 * @default false
	 */
	readonly createCommands?: boolean;

	/**
	 * Should the CommandHandler automatically defer the interaction?
	 * @default false
	 */
	readonly autoDefer?: boolean;

	/**
	 * Should the loader apply all commands to a specific guild?
	 *
	 * Reccomended for development
	 * @default undefined
	 */
	readonly guildId?: string;

	/**
	 * This overrides the default error handling.
	 */
	readonly handleError?: (error: Error, interaction: CommandInteraction) => Promise<void> | void;
}


export const defaultCommandHandlerOptions: CommandHandlerOptions = {
	deleteCommands: false,
	updateCommands: false,
	createCommands: false,
	autoDefer: false,
	guildId: undefined,
	handleError: async (err, interaction) => {
		console.log(err);
		if(interaction.replied) await interaction.editReply('An error happened while executing this command!'+'\n```\n'+err.message+'\n```');
		else await interaction.reply('An error happened while executing this command!'+'\n```\n'+err.message+'\n```');
	}
};

Object.freeze(defaultCommandHandlerOptions);


export class CommandHandler<T extends Client<true> = Client<true>> extends BaseCommandHandler {

	/**
	 * The Discord.js Client instance
	 */
	public readonly client: T;

	/**
	 * The options of this command handler
	 */
	public readonly options: InversePartial<CommandHandlerOptions>;

	/**
	 * All commands mapped by their ID
	 */
	public commandById = new Map<Snowflake, Command>();

	/**
	 * Create a new CommandHandler
	 * @param client Instance of the client
	 * @param options Options for the handler
	 */
	constructor(client: T, options: CommandHandlerOptions = {}) {
		const parsedOptions = Object.assign({}, defaultCommandHandlerOptions, options) as InversePartial<CommandHandlerOptions>;

		super(client.token, undefined, parsedOptions.guildId);
		this.client = client;
		this.options = parsedOptions;
	}

	/**
	 * Run an interaction through the commandhandler
	 * @param interaction The command's interaction
	 * @returns True if the command got handled
	 */
	public async runCommand(interaction: CommandInteraction): Promise<boolean> {
		const command = this.commandById.get(interaction.commandId);
		if(!command) return false;

		try {
			if(this.options.autoDefer) await interaction.deferReply();
			await command.run(interaction);
		}
		catch(err: any) {
			if(err instanceof CommandError)
				await CommandError.handleError(err, interaction);
			else await this.options.handleError(err, interaction);
		}
		return true;
	}

	/**
	 * Load all commands inside of this loader
	 */
	public async loadCommands(): Promise<this> {
		this.clientId = this.client.user.id;
		this._setToken(this.client.token);

		const applicationCommands = await this.getApplicationCommands();

		for(const command of this.commands) {
			let applicationCommand = applicationCommands.get(command.name.toLowerCase());
			applicationCommands.delete(applicationCommand?.name ?? '');

			const rawCmd = command.toJSON();

			//	Creating

			if(!applicationCommand) {
				if(!this.options.createCommands) continue;
				applicationCommand = await this._createCommand(command);
			}

			//	Updating

			else if(!objectCompare(rawCmd, this._transformApplicationCommand(applicationCommand))) {
				if(!this.options.updateCommands) continue;
				applicationCommand = await this._updateCommand(command, applicationCommand);
			}

			this.commandById.set(applicationCommand.id, command);
			command.load(applicationCommand);
		}

		//	Deleting commands

		if(this.options.deleteCommands) {
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