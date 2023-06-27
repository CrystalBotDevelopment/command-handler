import { APIApplicationCommandBasicOption } from 'discord-api-types/v10';
import { CommandInteraction } from 'discord.js';
import { Subcommand } from '../../../../src';

export default class TestSubCMD extends Subcommand {

	public options?: APIApplicationCommandBasicOption[] | undefined;
	public name = 'test';
	public description = 'Test';

	public onStart(): void { }
	public onLoad(): void {	}

	public async run(interaction: CommandInteraction) {
		await interaction.reply('test command!');
	}

}