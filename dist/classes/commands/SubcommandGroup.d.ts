import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Client, ApplicationCommandOptionData } from 'discord.js';
import { Command } from './Command';
export declare abstract class SubcommandGroup<T extends Client = Client> extends Command<T> {
    readonly type = ApplicationCommandOptionType.SubcommandGroup;
    readonly command: Command<T>;
    constructor(command: Command<T>);
    toJSON(): ApplicationCommandOptionData;
}
