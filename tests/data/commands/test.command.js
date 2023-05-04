"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
class TestCommand extends __1.Command {
    options = [];
    name = 'test';
    description = 'Test command';
    onStart() { 1; }
    onLoad() { 1; }
    run() {
        throw new __1.CommandError('Command failed successfully.');
    }
}
exports.default = TestCommand;
