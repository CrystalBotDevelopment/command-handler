"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConstructorOf = exports.fullPath = void 0;
const path_1 = __importDefault(require("path"));
function fullPath(path) {
    if (path_1.default.isAbsolute(path))
        return path;
    return path_1.default.join(process.cwd(), path);
}
exports.fullPath = fullPath;
function isConstructorOf(input, constructor) {
    return input.prototype instanceof constructor;
}
exports.isConstructorOf = isConstructorOf;
