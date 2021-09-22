import { CommandInteraction } from 'discord.js';
import { Command } from '../../../src/classes/commands/Command';


export default class extends Command {
	public name = 'hello';
	public description = 'Just a simple Hello World command!';
	public options = [];

	public onStart(): void { console.log('Started hello command!'); }
	public onLoad(): void { console.log('Loaded hello command!'); }

	public async run(interaction: CommandInteraction): Promise<any | void> {
		interaction.reply('Hello World!');
	}
}