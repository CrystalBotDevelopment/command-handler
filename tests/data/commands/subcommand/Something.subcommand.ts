import { APIApplicationCommandOption } from 'discord-api-types/v10';
import { CommandInteraction } from 'discord.js';
import { SubcommandGroup } from '../../../../src';
import Path from 'path';


export default class Something extends SubcommandGroup {
	public name = 'something';
	public description = 'some subcommand group';
	
	public options?: APIApplicationCommandOption[] = [];

	public onStart(): void {
		this.loadSubcommandsFromDir(Path.join(__dirname, 'something'));
	}

	public onLoad(): void {	}
	public async run(interaction: CommandInteraction): Promise<any> {
		await this.runSubcommand(interaction);
	}

}