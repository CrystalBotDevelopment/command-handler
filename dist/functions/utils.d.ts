import { Constructor } from '../types';
export declare function fullPath(path: string): string;
export declare function isConstructorOf<V extends Constructor, T extends Constructor>(input: V, constructor: T): boolean;
