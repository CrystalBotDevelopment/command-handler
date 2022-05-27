import { REST } from '@discordjs/rest';
import { APIApplicationCommand, Routes, Snowflake } from 'discord-api-types/v10';
import { Collection } from 'discord.js';
import { EventEmitter } from 'events';
import { directoryScanner } from '../functions/directoryScanner';
import { getCommands } from '../functions/getCommands';
import { ApplicationCommand, Constructor } from '../types';
import { Command } from './commands/Command';

type Any = any | void | Promise<any | void>;

interface Events {
	started: [ command: Command ]
	created: [ command: Command ]
	deleted: [ command: ApplicationCommand ]
	updated: [ command: Command ]
}

export interface BaseCommandHandler {
	on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => Any) : this
	once<K extends keyof Events>(event: K, listener: (...args: Events[K]) => Any) : this
	emit<K extends keyof Events>(event: K, ...args: Events[K]) : boolean
}

export abstract class BaseCommandHandler extends EventEmitter {

	public clientId: Snowflake;
	public guildId?: Snowflake;
	private readonly b_restAPI = new REST({ version: '10' });

	public readonly commands = new Array<Command>();

	/**
	 * This is a helper class for both CommandHandler and CommandLoader
	 * @param bot_token Token of the client
	 * @param client_id Id of the client
	 * @param guildId Id of the target guild, usefull for devlopment
	 */
	public constructor(botToken?: string, clientId?: Snowflake, guildId?: Snowflake) {
		super();
		if(clientId) this.clientId = clientId;
		if(guildId) this.guildId = guildId;
		if(botToken) this.b_restAPI.setToken(botToken);
	}

	/**
	 * Load all commands from a directory
	 * @returns Self
	 */
	public loadFromDirectory(dir: string, recursive = true): this {

		const files = directoryScanner(dir, recursive);
		const commands = getCommands(files)
			.map(c=> {
				const cmd = this._startCommand(c);
				this.emit('started', cmd);
				return cmd;
			});

		this.commands.push(...commands);
		return this;
	}

	/**
	 * Retrieves the commands from the API
	 * @returns The found commands
	 */
	public async getApplicationCommands(): Promise<Collection<string, APIApplicationCommand>> {

		const route = this.guildId
			? Routes.applicationGuildCommands(this.clientId, this.guildId)
			: Routes.applicationCommands(this.clientId);

		const commands = await this.b_restAPI.get(route as any as `/${string}`) as APIApplicationCommand[];
		return new Collection(commands.map(c=>[c.name.toLowerCase(), c]));
	}


	//	Rest helpers


	/**
	 * Create new ApplicationCommands from Commands
	 * @param command The command to create
	 * @returns The ApplicationCommand
	 */
	protected async _createCommand(command: Command): Promise<APIApplicationCommand> {

		const route = this.guildId
			? Routes.applicationGuildCommands(this.clientId, this.guildId)
			: Routes.applicationCommands(this.clientId);

		const res = await this.b_restAPI.post(route, { body: command.toJSON() }) as APIApplicationCommand;
		this.emit('created', command);
		return res;
	}

	/**
	 * Create new ApplicationCommands from Commands
	 * @param command The command to update
	 * @param applicationCommand This is actually only a refference for the id
	 * @returns The updated ApplicationCommand
	 */
	protected async _updateCommand(command: Command, applicationCommand: APIApplicationCommand): Promise<APIApplicationCommand> {

		const route = this.guildId
			? Routes.applicationGuildCommand(this.clientId, this.guildId, applicationCommand.id)
			: Routes.applicationCommand(this.clientId, applicationCommand.id);

		const res = await this.b_restAPI.patch(route, { body: command.toJSON() }) as APIApplicationCommand;
		this.emit('updated', command);
		return res;
	}

	/**
	 * Create new ApplicationCommands from Commands
	 * @param applicationCommand The command to delete
	 * @returns The updated ApplicationCommand
	 */
	protected async _deleteCommand(applicationCommand: APIApplicationCommand): Promise<void> {

		const route = this.guildId
			? Routes.applicationGuildCommand(this.clientId, this.guildId, applicationCommand.id)
			: Routes.applicationCommand(this.clientId, applicationCommand.id);

		await this.b_restAPI.delete(route) as void;
		this.emit('deleted', applicationCommand);
	}


	//	Self Handlers


	/**
	 * Create a new command class
	 * @important Make sure to call Command#onStart()
	 * @param constructor The command constructor
	 * @returns The Command class
	 */
	protected abstract _startCommand(constructor: Constructor<Command>): Command


	//	util


	protected _setToken(token: string): void {
		this.b_restAPI.setToken(token);
	}

	/**
	 * Transform API application thing to an better comparable ApplicationCommand
	 * @param cmd The ApplicationCommand to transform
	 * @returns transformed ApplicationCommand
	 */
	protected _transformApplicationCommand( cmd: APIApplicationCommand ): ApplicationCommand {
		return {
			name: cmd.name,
			description: cmd.description,
			default_permission: cmd.default_permission,
			options: cmd.options ?? []
		};
	}
}