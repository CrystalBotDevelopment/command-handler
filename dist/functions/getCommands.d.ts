import { Command } from '../classes/commands/Command';
import { Constructor } from '../types';
export declare function getCommands(files: string[]): Constructor<Command>[];
export declare function getCommand(file: string): any;
