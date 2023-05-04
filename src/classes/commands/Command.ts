import { Client, CommandInteraction, ApplicationCommandOptionData, Collection } from 'discord.js';
import { directoryScanner } from '../../functions/directoryScanner';
import { BaseCommand } from '../BaseCommand';
import { APIApplicationCommand } from 'discord-api-types';


export abstract class Command<T extends Client = Client> extends BaseCommand<T> {
	private readonly extension = 'subcommand';

	public abstract options: ApplicationCommandOptionData[];
	public subcommands = new Collection<string, BaseCommand>();

	/**
	 * Load a new Subcommand or SubcommandGroup to this command
	 * @param subcommand the subcommand to load
	 */
	public loadSubcommand(command: BaseCommand): void {
		if(!this.options) this.options = [];
		this.options.push(command.toJSON() as any);
		this.subcommands.set(command.name, command);
	}

	/**
	 * Load a Subcommands or SubcommandGroups from a path;
	 * @param path The path to load from
	 */
	public loadSubcommandFromPath(path: string): void {
		//	@ts-ignore
		const cmd = this.command ?? this;

		let _a;
		const Constructor = (_a = require(path)).default ?? _a;
		const command = new Constructor(cmd) as BaseCommand;
		command.onStart();

		this.loadSubcommand(command);
	}

	/**
	 * Load Subcommands or SubcommandGroups from a directory
	 * @param dir The directory to search
	 * @param recursive Should it search in subfolders
	 */
	public loadSubcommandsFromDir(dir: string, recursive = false): void {
		const files = directoryScanner(dir, recursive, this.extension);

		for(const file of files) {
			this.loadSubcommandFromPath(file);
		}
	}

	/**
	 * Run a specific subcommand
	 * @param interaction The current interaction
	 */
	public async runSubcommand(interaction: CommandInteraction): Promise<any> {
		const groupName = this._getSubCMD('getSubcommandGroup', interaction);
		const group = this.subcommands.get(groupName);
		if(group) return await group.run(interaction);

		const commandName = this._getSubCMD('getSubcommand', interaction);
		const command = this.subcommands.get(commandName);
		if(command) return await command.run(interaction);

		throw new Error('Could not find Subcommand / Subcommandgroup');
	}

	/**
	 * Loads all commands and subcommands
	 * @param command The APIApplicationCommand to load
	 */
	public load(command: APIApplicationCommand): void {
		this.data = command;
		this.subcommands.forEach(c=>c.load(command));
		this.onLoad();
	}

	/**
	 * Get the current subcommand
	 */
	private _getSubCMD(type: 'getSubcommand' | 'getSubcommandGroup', interaction: CommandInteraction): string {
		try {
			return (interaction.options as any)[type]();
		}
		// eslint-disable-next-line no-empty
		catch {}
		return '';
	}
}