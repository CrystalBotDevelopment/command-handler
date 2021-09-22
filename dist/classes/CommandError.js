"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandError = void 0;
class CommandError extends Error {
    static async handleError(error, interaction) {
        if (interaction.replied) {
            await interaction.editReply(error.options);
        }
        else {
            await interaction.reply(error.options);
        }
    }
    options;
    constructor(options) {
        super('An error happened while executing this command.');
        if (typeof options === 'string')
            options = { content: options, ephemeral: true };
        else if (typeof options.ephemeral == 'undefined')
            options.ephemeral = true;
        this.options = options;
    }
}
exports.CommandError = CommandError;
