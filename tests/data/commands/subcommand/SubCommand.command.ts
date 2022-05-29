import { APIApplicationCommandOption } from 'discord-api-types/v10';
import { CommandInteraction } from 'discord.js';
import { Command } from '../../../../src';

export default class SubCommand extends Command {
	public options: APIApplicationCommandOption[] = [];

	public name = 'subcmd';
	public description = 'just some test command';


	public onStart(): void {
		this.loadSubcommandsFromDir(__dirname)
	}

	public onLoad() { 0; }


	public async run(interaction: CommandInteraction) {
		await this.runSubcommand(interaction);
	}
}