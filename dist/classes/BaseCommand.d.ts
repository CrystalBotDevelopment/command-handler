import { APIApplicationCommand, APIApplicationCommandOption } from 'discord-api-types/v9';
import { ApplicationCommandOptionData, Client, CommandInteraction } from 'discord.js';
import { ApplicationCommand } from '../types';
export declare abstract class BaseCommand<T extends Client = Client> implements APIApplicationCommand {
    readonly client: T;
    data: APIApplicationCommand;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract options?: ApplicationCommandOptionData[];
    defaultPermission: boolean;
    protected constructor(client: T);
    abstract onStart(): void;
    load(command: APIApplicationCommand): void;
    abstract onLoad(): void;
    abstract run(interaction: CommandInteraction): Promise<any | void>;
    toJSON(): ApplicationCommand;
    mapOptions(options: ApplicationCommandOptionData[] | undefined, defined?: boolean): APIApplicationCommandOption[] | undefined;
}
