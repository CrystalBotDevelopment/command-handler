
import { ApplicationCommandOptionType } from 'discord-api-types';
import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { Subcommand } from '../../../../src/classes/commands/Subcommand';

export default class extends Subcommand {

	public name = 'set-channel';
	public description = 'set a channel or something';
	public options: ApplicationCommandOptionData[] = [{
		type: ApplicationCommandOptionType.Channel as number,
		name: 'channel',
		description: 'The channel to be set'
	}];

	public onStart(): void { 1; }
	public onLoad(): void {	console.log('Loaded subcommand set-channel'); }

	public async run(interaction: CommandInteraction): Promise<any | void> {
		const channel = interaction.options.getChannel('channel');
		await interaction.reply(`If this worked, channel would be set to ${channel?.toString() ?? '`Unkown channel`'}`);
	}
}