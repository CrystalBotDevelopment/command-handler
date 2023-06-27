import { APIApplicationCommandBasicOption } from 'discord-api-types/v10';
import { CommandInteraction } from 'discord.js';
import { Subcommand } from '../../../../../src';

export default class A extends Subcommand {
	public options?: APIApplicationCommandBasicOption[] | undefined;

	public name = 'a';
	public description = 'A subcommand';
	
	public onStart(): void {}
	public onLoad(): void {}
	
	public async run(interaction: CommandInteraction): Promise<any> {
		await interaction.reply('Hello from A')
	}

}