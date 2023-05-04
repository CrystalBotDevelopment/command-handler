"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
const BaseCommandHandler_1 = require("./BaseCommandHandler");
const objectCompare_1 = require("../functions/objectCompare");
class CommandLoader extends BaseCommandHandler_1.BaseCommandHandler {
    _options;
    constructor(options) {
        super(options.token, options.clientId, options.guildId);
        this._options = Object.assign({
            recurisve: true,
            deleteCommands: true,
            updateCommands: true,
            createCommands: true
        }, options);
    }
    async loadCommands() {
        const applicationCommands = await this.getApplicationCommands();
        for (const command of this.commands) {
            let applicationCommand = applicationCommands.get(command.name.toLowerCase());
            applicationCommands.delete(applicationCommand?.name ?? '');
            const rawCmd = command.toJSON();
            if (!applicationCommand) {
                if (!this._options.createCommands)
                    continue;
                applicationCommand = await this._createCommand(command);
            }
            else if (!(0, objectCompare_1.objectCompare)(rawCmd, applicationCommand)) {
                if (!this._options.updateCommands)
                    continue;
                applicationCommand = await this._updateCommand(command, applicationCommand);
            }
        }
        if (this._options.deleteCommands) {
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
exports.CommandLoader = CommandLoader;
