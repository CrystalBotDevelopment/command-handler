import SysPath from 'path';
import { Constructor } from '../types';

/**
 * Checks if a path is absolute, if not the path will be absolute, relative to process.cwd()
 * @param path The absolue path
 */
export function fullPath(path: string): string {
	if(SysPath.isAbsolute(path)) return path;
	return SysPath.join(process.cwd(), path);
}


export function isConstructorOf<V extends Constructor, T extends Constructor>(input: V, constructor: T): boolean {
	return input.prototype instanceof constructor;
}