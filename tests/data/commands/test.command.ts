import { ApplicationCommandOptionData } from 'discord.js';
import { Command, CommandError } from '../../..';

export default class TestCommand extends Command {
	public options: ApplicationCommandOptionData[] = [];

	public name = 'test';
	public description = 'Test command';

	public onStart(): void {1;}
	public onLoad(): void {1;}

	public run(): Promise<any> {
		throw new CommandError('Command failed successfully.');
	}
}