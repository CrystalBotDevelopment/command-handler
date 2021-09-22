import { Command } from '../../../src/classes/commands/Command';
import { CommandError } from '../../../src/classes/CommandError';


export default class extends Command {
	public name = 'exception';
	public description = 'Just a simple command that throws an exception!';
	public options = [];

	public onStart(): void { console.log('Started exception command!'); }
	public onLoad(): void { console.log('Loaded exception command!'); }

	public async run(): Promise<any | void> {
		throw new CommandError('Uhhh command went bad?');
	}
}