import { APIApplicationCommandOption } from 'discord-api-types/v10';
import { isStringOption, isSubcommandGroupOption, isSubcommandOption } from './typeguards/options';


/**
 * Compares the given option with the given option type. 
 */
export function matchOptions(options: APIApplicationCommandOption[], myOptions: APIApplicationCommandOption[]): boolean {
	if (options.length != myOptions.length) return false;

	//	Comparing options

	for(const option of options) {
		const myOption = myOptions.find(o=>o.name == option.name);
		if(!myOption) return false;

		//	Checking basic properties
		
		if (option.type != myOption.type) return false;
		if (option.name != myOption.name) return false;
		if (option.description != myOption.description) return false;
		if (comparePrimitiveUndefined(option.required, myOption.required)) return false;

		//	TODO: check localized

		//	Checking subcommands

		if (isSubcommandOption(option) && isSubcommandOption(myOption)) {
			if (!matchOptions(option.options!, myOption.options!)) return false;
		}

		if (isSubcommandGroupOption(option) && isSubcommandGroupOption(myOption)) {
			if (!option.options) {
				if (myOption.options && myOption.options.length > 0) return false;
			}
			else if (myOption.options && !matchOptions(option.options!, myOption.options!)) return false;
		}

		//	Checking primitive types

		if (isStringOption(option) && isStringOption(myOption)) {
			if (comparePrimitiveUndefined(option.autocomplete, myOption.autocomplete)) return false;
		}

		//	TODO: Check options
	}

	return true
}


/**
 * Compares if the choices match 
 */
export function matchChoices<T>(a: T[], b: T[]): boolean {
	if (a.length != b.length) return false;

	for(const choice of a) {
		if (!b.includes(choice)) return false;
	}

	return true;
}


/**
 * Compares 2 primitive values and returns if they are equal
 */
export function comparePrimitiveUndefined<T>(a: T, b: T): boolean {
	if (a === undefined && b === undefined) return true;
	if (a !== undefined && b !== undefined) return a == b;

	if (a == undefined && b instanceof Boolean) return !b;

	return false;
}