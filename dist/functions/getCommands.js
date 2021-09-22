"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommand = exports.getCommands = void 0;
const Command_1 = require("../classes/commands/Command");
const utils_1 = require("./utils");
function getCommands(files) {
    const commands = new Array();
    for (const file of files) {
        const data = getCommand(file);
        if (!utils_1.isConstructorOf(data, Command_1.Command))
            throw new Error(`File ${file} does not defaulty export a Command type`);
        commands.push(data);
    }
    return commands;
}
exports.getCommands = getCommands;
function getCommand(file) {
    let _a;
    return ((_a = require(file)).default ?? _a);
}
exports.getCommand = getCommand;
