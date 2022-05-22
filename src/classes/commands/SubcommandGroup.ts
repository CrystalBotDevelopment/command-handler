import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Client, ApplicationCommandOptionData } from 'discord.js';
import { Command } from './Command';


export abstract class SubcommandGroup<T extends Client = Client> extends Command<T> {
	public readonly type = ApplicationCommandOptionType.SubcommandGroup;
	public readonly command: Command<T>;

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