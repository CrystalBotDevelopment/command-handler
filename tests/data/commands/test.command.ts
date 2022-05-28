import { APIApplicationCommandOption } from 'discord-api-types/v10';
import { Command, CommandError } from '../../../src';

export default class TestCommand extends Command {
	public options: APIApplicationCommandOption[] = [];

	public name = 'test';
	public description = 'Test command';

	public onStart(): void {1;}
	public onLoad(): void {1;}

	public run(): Promise<any> {
		throw new CommandError('Command failed successfully.');
	}
}