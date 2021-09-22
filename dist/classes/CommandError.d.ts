import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
export declare class CommandError extends Error {
    static handleError(error: CommandError, interaction: CommandInteraction): Promise<void>;
    readonly options: InteractionReplyOptions;
    constructor(options: InteractionReplyOptions | string);
}
