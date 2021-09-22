"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = exports.defaultCommandHandlerOptions = void 0;
const objectCompare_1 = require("../functions/objectCompare");
const BaseCommandHandler_1 = require("./BaseCommandHandler");
const CommandError_1 = require("./CommandError");
exports.defaultCommandHandlerOptions = {
    deleteCommands: false,
    updateCommands: false,
    createCommands: false,
    autoDefer: false,
    guildId: undefined,
    handleError: async (err, interaction) => {
        console.log(err);
        if (interaction.replied)
            await interaction.editReply('An error happened while executing this command!' + '\n```\n' + err.message + '\n```');
        else
            await interaction.reply('An error happened while executing this command!' + '\n```\n' + err.message + '\n```');
    }
};
Object.freeze(exports.defaultCommandHandlerOptions);
class CommandHandler extends BaseCommandHandler_1.BaseCommandHandler {
    client;
    options;
    commandById = new Map();
    constructor(client, options = {}) {
        const parsedOptions = Object.assign({}, exports.defaultCommandHandlerOptions, options);
        super(client.token, undefined, parsedOptions.guildId);
        this.client = client;
        this.options = parsedOptions;
    }
    async runCommand(interaction) {
        const command = this.commandById.get(interaction.commandId);
        if (!command)
            return false;
        try {
            if (this.options.autoDefer)
                await interaction.deferReply();
            await command.run(interaction);
        }
        catch (err) {
            if (err instanceof CommandError_1.CommandError)
                await CommandError_1.CommandError.handleError(err, interaction);
            else
                await this.options.handleError(err, interaction);
        }
        return true;
    }
    async loadCommands() {
        this.clientId = this.client.user.id;
        this._setToken(this.client.token);
        const applicationCommands = await this.getApplicationCommands();
        for (const command of this.commands) {
            let applicationCommand = applicationCommands.get(command.name.toLowerCase());
            applicationCommands.delete(applicationCommand?.name ?? '');
            const rawCmd = command.toJSON();
            if (!applicationCommand) {
                if (!this.options.createCommands)
                    continue;
                applicationCommand = await this._createCommand(command);
            }
            else if (!objectCompare_1.objectCompare(rawCmd, this._transformApplicationCommand(applicationCommand))) {
                if (!this.options.updateCommands)
                    continue;
                applicationCommand = await this._updateCommand(command, applicationCommand);
            }
            this.commandById.set(applicationCommand.id, command);
            command.load(applicationCommand);
        }
        if (this.options.deleteCommands) {
            for (const [key, value] of applicationCommands) {
                key;
                await this._deleteCommand(value);
            }
        }
        return this;
    }
    async deleteAllCommands() {
        for (const [_, applicationCommand] of await this.getApplicationCommands()) {
            _;
            await this._deleteCommand(applicationCommand);
        }
    }
    _startCommand(constructor) {
        const c = new constructor();
        c.onStart();
        return c;
    }
}
exports.CommandHandler = CommandHandler;
