import { Client, CommandInteraction } from 'discord.js';
import { Constructor, InversePartial } from '../types';
import { BaseCommandHandler } from './BaseCommandHandler';
import { Command } from './commands/Command';
export interface CommandHandlerOptions {
    readonly deleteCommands?: boolean;
    readonly updateCommands?: boolean;
    readonly createCommands?: boolean;
    readonly autoDefer?: boolean;
    readonly guildId?: string;
    readonly handleError?: (error: Error, interaction: CommandInteraction) => Promise<void> | void;
}
export declare const defaultCommandHandlerOptions: CommandHandlerOptions;
export declare class CommandHandler<T extends Client<true> = Client<true>> extends BaseCommandHandler {
    readonly client: T;
    readonly options: InversePartial<CommandHandlerOptions>;
    commandById: Map<string, Command<Client<boolean>>>;
    constructor(client: T, options?: CommandHandlerOptions);
    runCommand(interaction: CommandInteraction): Promise<boolean>;
    loadCommands(): Promise<this>;
    deleteAllCommands(): Promise<void>;
    protected _startCommand(constructor: Constructor<Command<Client<boolean>>>): Command<Client<boolean>>;
}
