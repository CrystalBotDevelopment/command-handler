import { CommandInteraction } from 'discord.js';
import { Command } from '../../../src/classes/commands/Command';


export default class extends Command {

	public name = 'settings';
	public description = 'Some settings';
	public options = [];

	public onStart(): void {
		this.loadSubcommandsFromDir(__dirname);
	}

	public onLoad(): void { console.log('Loaded settings command!'); }

	public async run(interaction: CommandInteraction): Promise<any | void> {

		await this.runSubcommand(interaction);

		if(!interaction.replied)
			await interaction.reply('I did not reply with anything!');
	}
}