import { Client } from 'discord.js';
import { Snowflake } from 'discord-api-types/v9';
import { Constructor } from '../types';
import { BaseCommandHandler } from './BaseCommandHandler';
import { Command } from './commands/Command';
export interface CommandLoaderOptionalOptions {
    deleteCommands?: boolean;
    updateCommands?: boolean;
    createCommands?: boolean;
    guildId?: Snowflake;
}
export interface CommandLoaderOptions extends CommandLoaderOptionalOptions {
    readonly clientId: Snowflake;
    readonly token: string;
}
export declare class CommandLoader extends BaseCommandHandler {
    private readonly _options;
    constructor(options: CommandLoaderOptions);
    loadCommands(): Promise<this>;
    deleteAllCommands(): Promise<void>;
    protected _startCommand(constructor: Constructor<Command<Client<boolean>>>): Command<Client<boolean>>;
}
