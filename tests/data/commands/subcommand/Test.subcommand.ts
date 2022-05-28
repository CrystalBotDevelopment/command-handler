import { APIApplicationCommandOption } from 'discord-api-types/v10';
import { CommandInteraction } from 'discord.js';
import { Subcommand } from '../../../../src';

export default class TestSubCMD extends Subcommand {
	
	public options?: APIApplicationCommandOption[] | undefined;
	public name = 'test';
	public description = 'just some test command';
	
	public onStart(): void { }
	public onLoad(): void {	}

	public async run(interaction: CommandInteraction) {
		await interaction.reply("test command!");
	}

}