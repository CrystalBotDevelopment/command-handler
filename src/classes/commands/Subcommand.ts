import { APIApplicationCommandOption, APIApplicationCommandSubcommandOption, ApplicationCommandOptionType } from 'discord-api-types/v10';
import { Client } from 'discord.js';
import { BaseCommand } from './BaseCommand';
import { Command } from './Command';


export abstract class Subcommand<T extends Client = Client> extends BaseCommand<T> implements APIApplicationCommandSubcommandOption {
	public readonly type = ApplicationCommandOptionType.Subcommand;

	public readonly command: Command<T>; //	@ts-ignore
	public abstract options?: APIApplicationCommandOption[];

	public constructor(command: Command<T>) {
		super();
		this.client  = command.client;
		this.command = command;
	}

	/**
	 * Converts this command to ApplicationCommandOptionData
	 * @returns the option it returned
	 */
	//	@ts-ignore
	public toJSON(): APIApplicationCommandOption {
		const { type, name, description, options } = this;
		return { type: type as number, name, description, options: this.mapOptions(options) as any[] };
	}
}