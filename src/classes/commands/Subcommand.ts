import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Client, ApplicationCommandOptionData } from 'discord.js';
import { BaseCommand } from '../BaseCommand';
import { Command } from './Command';


export abstract class Subcommand<T extends Client = Client> extends BaseCommand<T> {
	public readonly type = ApplicationCommandOptionType.Subcommand;

	public readonly command: Command<T>; //	@ts-ignore
	public abstract options?: ApplicationCommandOptionData[];

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
	public toJSON(): ApplicationCommandOptionData {
		const { type, name, description, options } = this;
		return { type: type as number, name, description, options: this.mapOptions(options) as any[] };
	}
}