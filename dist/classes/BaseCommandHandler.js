"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommandHandler = void 0;
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const discord_js_1 = require("discord.js");
const events_1 = require("events");
const directoryScanner_1 = require("../functions/directoryScanner");
const getCommands_1 = require("../functions/getCommands");
class BaseCommandHandler extends events_1.EventEmitter {
    clientId;
    guildId;
    b_restAPI = new rest_1.REST({ version: '9' });
    commands = new Array();
    constructor(botToken, clientId, guildId) {
        super();
        if (clientId)
            this.clientId = clientId;
        if (guildId)
            this.guildId = guildId;
        if (botToken)
            this.b_restAPI.setToken(botToken);
    }
    loadFromDirectory(dir, recursive = true) {
        const files = directoryScanner_1.directoryScanner(dir, recursive);
        const commands = getCommands_1.getCommands(files)
            .map(c => {
            const cmd = this._startCommand(c);
            this.emit('started', cmd);
            return cmd;
        });
        this.commands.push(...commands);
        return this;
    }
    async getApplicationCommands() {
        const route = this.guildId
            ? v9_1.Routes.applicationGuildCommands(this.clientId, this.guildId)
            : v9_1.Routes.applicationCommands(this.clientId);
        const commands = await this.b_restAPI.get(route);
        return new discord_js_1.Collection(commands.map(c => [c.name.toLowerCase(), c]));
    }
    async _createCommand(command) {
        const route = this.guildId
            ? v9_1.Routes.applicationGuildCommands(this.clientId, this.guildId)
            : v9_1.Routes.applicationCommands(this.clientId);
        const res = await this.b_restAPI.post(route, { body: command.toJSON() });
        this.emit('created', command);
        return res;
    }
    async _updateCommand(command, applicationCommand) {
        const route = this.guildId
            ? v9_1.Routes.applicationGuildCommand(this.clientId, this.guildId, applicationCommand.id)
            : v9_1.Routes.applicationCommand(this.clientId, applicationCommand.id);
        const res = await this.b_restAPI.patch(route, { body: command.toJSON() });
        this.emit('updated', command);
        return res;
    }
    async _deleteCommand(applicationCommand) {
        const route = this.guildId
            ? v9_1.Routes.applicationGuildCommand(this.clientId, this.guildId, applicationCommand.id)
            : v9_1.Routes.applicationCommand(this.clientId, applicationCommand.id);
        await this.b_restAPI.delete(route);
        this.emit('deleted', applicationCommand);
    }
    _setToken(token) {
        this.b_restAPI.setToken(token);
    }
    _transformApplicationCommand(cmd) {
        return {
            name: cmd.name,
            description: cmd.description,
            default_permission: cmd.default_permission,
            options: cmd.options ?? []
        };
    }
}
exports.BaseCommandHandler = BaseCommandHandler;
