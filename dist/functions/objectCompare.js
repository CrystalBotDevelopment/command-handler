"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.objectCompare = void 0;
function objectCompare(a, b) {
    if (Object.keys(a).length != Object.keys(b).length)
        return false;
    if (typeof a != typeof b)
        return false;
    for (const index in a) {
        if (!b.hasOwnProperty(index))
            return false;
        const objA = a[index];
        const objB = b[index];
        if (typeof objA == 'object' && typeof objB == 'object') {
            if (!objectCompare(objA, objB))
                return false;
        }
        else {
            if (!compare(objA, objB))
                return false;
            if (!compare(objB, objA))
                return false;
        }
    }
    return true;
}
exports.objectCompare = objectCompare;
function compare(a, b) {
    if (typeof a == typeof b) {
        return a == b;
    }
    if (typeof a == 'undefined' && typeof b == 'object') {
        return Object.keys(b).length == 0;
    }
    return true;
}
exports.compare = compare;
