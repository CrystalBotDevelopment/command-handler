import { Client, CommandInteraction, ApplicationCommandOptionData, Collection } from 'discord.js';
import { BaseCommand } from '../BaseCommand';
import { APIApplicationCommand } from 'discord-api-types';
export declare abstract class Command<T extends Client = Client> extends BaseCommand<T> {
    private readonly extension;
    abstract options: ApplicationCommandOptionData[];
    subcommands: Collection<string, BaseCommand<Client<boolean>>>;
    loadSubcommand(command: BaseCommand): void;
    loadSubcommandFromPath(path: string): void;
    loadSubcommandsFromDir(dir: string, recursive?: boolean): void;
    runSubcommand(interaction: CommandInteraction): Promise<any>;
    load(command: APIApplicationCommand): void;
    private _getSubCMD;
}
