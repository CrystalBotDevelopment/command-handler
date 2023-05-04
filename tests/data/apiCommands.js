"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obj = {
    'test-match': {
        id: '0',
        name: 'test',
        description: 'Test command',
        options: [],
    },
    'test-unmatch': {
        id: '1',
        name: 'test',
        description: 'Test command',
        options: [],
    }
};
Object.freeze(object);
function default_1(command) {
    return obj[command];
}
exports.default = default_1;
