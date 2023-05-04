"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
class BaseCommand {
    client;
    data;
    defaultPermission = true;
    load(command) {
        this.data = command;
        this.onLoad();
    }
    toJSON() {
        const json = {
            name: this.name,
            description: this.description,
            default_permission: this.defaultPermission
        };
        const options = this.mapOptions(this.options, false);
        if (options && options.length > 0)
            json.options = options;
        return json;
    }
    mapOptions(options, defined = true) {
        return options?.map(({ type, name, description, required, choices, options, autocomplete }) => {
            const option = { type, name, description, autocomplete };
            if (required)
                option.required = true;
            if (choices)
                option.choices = choices;
            if (options)
                option.options = this.mapOptions(options, false);
            if (autocomplete)
                option.autocomplete = true;
            return option;
        }) ?? (defined ? [] : undefined);
    }
}
exports.BaseCommand = BaseCommand;
