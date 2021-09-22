"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const discord_js_1 = require("discord.js");
const directoryScanner_1 = require("../../functions/directoryScanner");
const BaseCommand_1 = require("../BaseCommand");
class Command extends BaseCommand_1.BaseCommand {
    extension = 'subcommand';
    subcommands = new discord_js_1.Collection();
    loadSubcommand(command) {
        if (!this.options)
            this.options = [];
        this.options.push(command.toJSON());
        this.subcommands.set(command.name, command);
    }
    loadSubcommandFromPath(path) {
        const cmd = this.command ?? this;
        let _a;
        const Constructor = (_a = require(path)).default ?? _a;
        const command = new Constructor(cmd);
        command.onStart();
        this.loadSubcommand(command);
    }
    loadSubcommandsFromDir(dir, recursive = false) {
        const files = directoryScanner_1.directoryScanner(dir, recursive, this.extension);
        for (const file of files) {
            this.loadSubcommandFromPath(file);
        }
    }
    async runSubcommand(interaction) {
        const groupName = this._getSubCMD('getSubcommandGroup', interaction);
        const group = this.subcommands.get(groupName);
        if (group)
            return await group.run(interaction);
        const commandName = this._getSubCMD('getSubcommand', interaction);
        const command = this.subcommands.get(commandName);
        if (command)
            return await command.run(interaction);
        throw new Error('Could not find Subcommand / Subcommandgroup');
    }
    load(command) {
        this.data = command;
        this.subcommands.forEach(c => c.load(command));
        this.onLoad();
    }
    _getSubCMD(type, interaction) {
        try {
            return interaction.options[type]();
        }
        catch { }
        return '';
    }
}
exports.Command = Command;
