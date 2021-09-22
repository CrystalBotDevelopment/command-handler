import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Client, ApplicationCommandOptionData } from 'discord.js';
import { BaseCommand } from '../BaseCommand';
import { Command } from './Command';
export declare abstract class Subcommand<T extends Client = Client> extends BaseCommand<T> {
    readonly type = ApplicationCommandOptionType.Subcommand;
    readonly command: Command<T>;
    abstract options?: ApplicationCommandOptionData[];
    constructor(command: Command<T>);
    toJSON(): ApplicationCommandOptionData;
}
