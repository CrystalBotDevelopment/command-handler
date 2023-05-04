import { APIApplicationCommand, Snowflake } from 'discord-api-types/v9';
import { Collection } from 'discord.js';
import { EventEmitter } from 'events';
import { ApplicationCommand, Constructor } from '../types';
import { Command } from './commands/Command';
declare type Any = any | void | Promise<any | void>;
interface Events {
    started: [command: Command];
    created: [command: Command];
    deleted: [command: ApplicationCommand];
    updated: [command: Command];
}
export interface BaseCommandHandler {
    on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => Any): this;
    once<K extends keyof Events>(event: K, listener: (...args: Events[K]) => Any): this;
    emit<K extends keyof Events>(event: K, ...args: Events[K]): boolean;
}
export declare abstract class BaseCommandHandler extends EventEmitter {
    clientId: Snowflake;
    guildId?: Snowflake;
    private readonly b_restAPI;
    readonly commands: Command<import("discord.js").Client<boolean>>[];
    constructor(botToken?: string, clientId?: Snowflake, guildId?: Snowflake);
    loadFromDirectory(dir: string, recursive?: boolean): this;
    getApplicationCommands(): Promise<Collection<string, APIApplicationCommand>>;
    protected _createCommand(command: Command): Promise<APIApplicationCommand>;
    protected _updateCommand(command: Command, applicationCommand: APIApplicationCommand): Promise<APIApplicationCommand>;
    protected _deleteCommand(applicationCommand: APIApplicationCommand): Promise<void>;
    protected abstract _startCommand(constructor: Constructor<Command>): Command;
    protected _setToken(token: string): void;
    protected _transformApplicationCommand(cmd: APIApplicationCommand): ApplicationCommand;
}
export {};
