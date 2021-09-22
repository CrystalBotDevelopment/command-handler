
import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { join } from 'path';
import { SubcommandGroup } from '../../../src/classes/commands/SubcommandGroup';

export default class extends SubcommandGroup {

	public name = 'set';
	public description = 'Set some settings';
	public options: ApplicationCommandOptionData[] = [];

	public onStart(): void {
		this.loadSubcommandsFromDir(join(__dirname, 'settings'));
	}

	public onLoad(): void {
		console.log('Loaded subcommand group set');
	}

	public async run(interaction: CommandInteraction): Promise<any | void> {
		console.log(this.subcommands);
		await this.runSubcommand(interaction);
	}
}