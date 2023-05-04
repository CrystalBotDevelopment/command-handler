"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcommandGroup = void 0;
const Command_1 = require("./Command");
class SubcommandGroup extends Command_1.Command {
    type = 2;
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
exports.SubcommandGroup = SubcommandGroup;
