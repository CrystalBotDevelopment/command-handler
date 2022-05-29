import { CommandInteraction } from 'discord.js';
import { Subcommand } from '../../../src/classes/commands/Subcommand';

export default class extends Subcommand {
	
	public name = 'list';
	public description = 'List some settings';
	public options = [];

	public onStart(): void { 1; }
	public onLoad(): void {	console.log('Loaded subcommand list'); }

	public async run(interaction: CommandInteraction): Promise<any | void> {
		await interaction.reply(`**__Settings:__**\n\n**Channel** <#${interaction.channelId}>`);
	}
}