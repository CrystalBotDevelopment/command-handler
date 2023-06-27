import { APIApplicationCommandBasicOption } from 'discord-api-types/v10';
import { CommandInteraction } from 'discord.js';
import { Subcommand } from '../../../../../src';

export default class B extends Subcommand {
	public options?: APIApplicationCommandBasicOption[] | undefined;

	public name = 'b';
	public description = 'B subcommand';
	
	public onStart(): void {}
	public onLoad(): void {}
	
	public async run(interaction: CommandInteraction): Promise<any> {
		await interaction.reply('Hello from B')
	}

}