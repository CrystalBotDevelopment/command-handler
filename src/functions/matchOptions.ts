import { APIApplicationCommandBasicOption, APIApplicationCommandOption } from 'discord-api-types/v10';
import { hasChoices } from './typeguards/options';


/**
 * Compares the given option with the given option type.
 */
export function matchOptions(options: APIApplicationCommandOption[], myOptions: APIApplicationCommandOption[]): boolean {
	if (options.length != myOptions.length) return false;

	//	Comparing options

	for (const option of options) {
		const myOption = myOptions.find(o => o.name == option.name);
		if (!myOption) return false;

		//	Checking basic properties

		if (option.type != myOption.type) return false;
		if (option.name != myOption.name) return false;
		if (option.description != myOption.description) return false;
		if (comparePrimitiveUndefined(option.required, myOption.required)) return false;

		//	TODO: check localized

		//	Checking subcommands

		// if (isSubcommandOption(option) && isSubcommandOption(myOption)) {
		// 	if (!matchOptions(option.options!, myOption.options!)) return false;
		// }

		// else if (isSubcommandGroupOption(option) && isSubcommandGroupOption(myOption)) {
		// 	if (!option.options) {
		// 		if (myOption.options && myOption.options.length > 0) return false;
		// 	}
		// 	else if (myOption.options && !matchOptions(option.options!, myOption.options!)) return false;
		// }

		//	Checking primitive types (Excludes some that don't need checking)

		// else if (isStringOption(option) && isStringOption(myOption)) {
		// 	if (comparePrimitiveUndefined(option.autocomplete, myOption.autocomplete)) return false;
		// 	if (!matchChoices(option, myOption)) return false;
		// }

		// else if (isIntegerOption(option) && isIntegerOption(myOption)) {
		// 	if (comparePrimitiveUndefined(option.autocomplete, myOption.autocomplete)) return false;
		// 	if (comparePrimitiveUndefined(option.min_value, myOption.min_value)) return false;
		// 	if (comparePrimitiveUndefined(option.min_value, myOption.max_value)) return false;
		// 	if (!matchChoices(option, myOption)) return false;
		// }

		// else if (isNumberOption(option) && isNumberOption(myOption)) {
		// 	if (comparePrimitiveUndefined(option.autocomplete, myOption.autocomplete)) return false;
		// 	if (comparePrimitiveUndefined(option.min_value, myOption.min_value)) return false;
		// 	if (comparePrimitiveUndefined(option.min_value, myOption.max_value)) return false;
		// 	if (!matchChoices(option, myOption)) return false;
		// }

		// //	Checking discord types (Excludes some that don't need checking)

		// else if (isChannelOption(option) && isChannelOption(myOption)) {
		// 	if (comparePrimitiveUndefined(option.channel_types, myOption.channel_types)) return false;
		// }
	}

	return true;
}


/**
 * Compares if the choices match
 */
export function matchChoices(a1: APIApplicationCommandBasicOption, b1: APIApplicationCommandBasicOption): boolean {

	//	Checking types

	if (!hasChoices(a1) || !hasChoices(b1)) return false;

	const a = a1.choices;
	const b = b1.choices;

	//	Checking choices

	if (a.length != b.length) return false;

	for (const choice of a) {
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