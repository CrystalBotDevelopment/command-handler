"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subcommand = void 0;
const BaseCommand_1 = require("../BaseCommand");
class Subcommand extends BaseCommand_1.BaseCommand {
    type = 1;
    command;
    constructor(command) {
        super();
        this.client = command.client;
        this.command = command;
    }
    toJSON() {
        const { type, name, description, options } = this;
        return { type: type, name, description, options: this.mapOptions(options) };
    }
}
exports.Subcommand = Subcommand;
