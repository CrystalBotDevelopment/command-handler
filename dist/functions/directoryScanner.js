"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directoryScanner = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
function directoryScanner(dir, recursive, extension = 'command') {
    if (!/^\w+$/.test(extension))
        throw new Error('Extension must match /$\\w+^/');
    const root = utils_1.fullPath(dir);
    const files = new Array();
    fs_1.default.readdirSync(root).forEach(file => {
        const path = path_1.default.join(root, file);
        if (fs_1.default.lstatSync(path).isDirectory()) {
            if (!recursive)
                return;
            files.push(...directoryScanner(path, recursive, extension));
            return;
        }
        if (!new RegExp(`\\.${extension}\\.(mjs|ts|js)$`).test(file))
            return;
        files.push(path);
    });
    return files;
}
exports.directoryScanner = directoryScanner;
