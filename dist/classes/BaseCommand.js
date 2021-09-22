"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
class BaseCommand {
    client;
    data;
    defaultPermission = true;
    constructor(client) {
        this.client = client;
    }
    load(command) {
        this.data = command;
        this.onLoad();
    }
    toJSON() {
        const { name, description, options, defaultPermission = true } = this;
        return { name, description, default_permission: defaultPermission, options: this.mapOptions(options) };
    }
    mapOptions(options, defined = true) {
        return options?.map(({ type, name, description, required, choices, options }) => ({
            type, name, description,
            required: required ?? undefined,
            choices: choices ?? undefined,
            options: this.mapOptions(options, false),
        })) ?? (defined ? [] : undefined);
    }
}
exports.BaseCommand = BaseCommand;
