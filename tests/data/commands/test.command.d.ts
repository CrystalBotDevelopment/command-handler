import { ApplicationCommandOptionData } from 'discord.js';
import { Command } from '../../..';
export default class TestCommand extends Command {
    options: ApplicationCommandOptionData[];
    name: string;
    description: string;
    onStart(): void;
    onLoad(): void;
    run(): Promise<any>;
}
