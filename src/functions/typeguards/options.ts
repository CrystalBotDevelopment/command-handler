import { APIApplicationCommandAttachmentOption, APIApplicationCommandBooleanOption, APIApplicationCommandChannelOption, APIApplicationCommandIntegerOption, APIApplicationCommandMentionableOption, APIApplicationCommandNumberOption, APIApplicationCommandOption, APIApplicationCommandRoleOption, APIApplicationCommandStringOption, APIApplicationCommandSubcommandGroupOption, APIApplicationCommandSubcommandOption, APIApplicationCommandUserOption } from 'discord-api-types/v10';

//	Commands

export function isSubcommandOption(option: APIApplicationCommandOption) : option is APIApplicationCommandSubcommandOption {
	return option.type === 1;
}

export function isSubcommandGroupOption(option: APIApplicationCommandOption) : option is APIApplicationCommandSubcommandGroupOption {
	return option.type === 2;
}

//	Primitives

export function isStringOption(option: APIApplicationCommandOption) : option is APIApplicationCommandStringOption {
	return option.type === 3;
}

export function isIntegerOption(option: APIApplicationCommandOption) : option is APIApplicationCommandIntegerOption {
	return option.type === 4;
}

export function isBooleanOption(option: APIApplicationCommandOption) : option is APIApplicationCommandBooleanOption {
	return option.type === 5;
}

export function isNumberOption(option: APIApplicationCommandOption) : option is APIApplicationCommandNumberOption {
	return option.type === 10;
}

//	Discord types

export function isUserOption(option: APIApplicationCommandOption) : option is APIApplicationCommandUserOption {
	return option.type === 6;
}

export function isChannelOption(option: APIApplicationCommandOption) : option is APIApplicationCommandChannelOption {
	return option.type === 7;
}

export function isRoleOption(option: APIApplicationCommandOption) : option is APIApplicationCommandRoleOption {
	return option.type === 8;
}

export function isMentionableOption(option: APIApplicationCommandOption) : option is APIApplicationCommandMentionableOption {
	return option.type === 9;
}

export function isAttatchmentOption(option: APIApplicationCommandOption) : option is APIApplicationCommandAttachmentOption {
	return option.type === 11;
}