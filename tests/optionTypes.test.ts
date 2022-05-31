import { isAttatchmentOption, isMentionableOption, isRoleOption, isChannelOption, isUserOption, isNumberOption, isBooleanOption, isIntegerOption, isStringOption, isSubcommandGroupOption, isSubcommandOption } from '../src/functions/typeguards/options';

describe('Checking if the option typeguards are working', () => {

	const data = {
		name: 'test',
		description: 'test',
	};

	test('Checking Subcommand guard', () => {
		expect(isSubcommandOption({ ...data, type: 1 })).toBe(true);
		expect(isSubcommandOption({ ...data, type: 2 })).toBe(false);
		expect(isSubcommandOption({ ...data, type: 3 })).toBe(false);
		expect(isSubcommandOption({ ...data, type: 4 })).toBe(false);
		expect(isSubcommandOption({ ...data, type: 5 })).toBe(false);
		expect(isSubcommandOption({ ...data, type: 6 })).toBe(false);
		expect(isSubcommandOption({ ...data, type: 7 })).toBe(false);
		expect(isSubcommandOption({ ...data, type: 8 })).toBe(false);
		expect(isSubcommandOption({ ...data, type: 9 })).toBe(false);
		expect(isSubcommandOption({ ...data, type: 10 })).toBe(false);
		expect(isSubcommandOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking Subcommand group guard', () => {
		expect(isSubcommandGroupOption({ ...data, type: 1 })).toBe(false);
		expect(isSubcommandGroupOption({ ...data, type: 2 })).toBe(true);
		expect(isSubcommandGroupOption({ ...data, type: 3 })).toBe(false);
		expect(isSubcommandGroupOption({ ...data, type: 4 })).toBe(false);
		expect(isSubcommandGroupOption({ ...data, type: 5 })).toBe(false);
		expect(isSubcommandGroupOption({ ...data, type: 6 })).toBe(false);
		expect(isSubcommandGroupOption({ ...data, type: 7 })).toBe(false);
		expect(isSubcommandGroupOption({ ...data, type: 8 })).toBe(false);
		expect(isSubcommandGroupOption({ ...data, type: 9 })).toBe(false);
		expect(isSubcommandGroupOption({ ...data, type: 10 })).toBe(false);
		expect(isSubcommandGroupOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking String guard', () => {
		expect(isStringOption({ ...data, type: 1 })).toBe(false);
		expect(isStringOption({ ...data, type: 2 })).toBe(false);
		expect(isStringOption({ ...data, type: 3 })).toBe(true);
		expect(isStringOption({ ...data, type: 4 })).toBe(false);
		expect(isStringOption({ ...data, type: 5 })).toBe(false);
		expect(isStringOption({ ...data, type: 6 })).toBe(false);
		expect(isStringOption({ ...data, type: 7 })).toBe(false);
		expect(isStringOption({ ...data, type: 8 })).toBe(false);
		expect(isStringOption({ ...data, type: 9 })).toBe(false);
		expect(isStringOption({ ...data, type: 10 })).toBe(false);
		expect(isStringOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking Integer guard', () => {
		expect(isIntegerOption({ ...data, type: 1 })).toBe(false);
		expect(isIntegerOption({ ...data, type: 2 })).toBe(false);
		expect(isIntegerOption({ ...data, type: 3 })).toBe(false);
		expect(isIntegerOption({ ...data, type: 4 })).toBe(true);
		expect(isIntegerOption({ ...data, type: 5 })).toBe(false);
		expect(isIntegerOption({ ...data, type: 6 })).toBe(false);
		expect(isIntegerOption({ ...data, type: 7 })).toBe(false);
		expect(isIntegerOption({ ...data, type: 8 })).toBe(false);
		expect(isIntegerOption({ ...data, type: 9 })).toBe(false);
		expect(isIntegerOption({ ...data, type: 10 })).toBe(false);
		expect(isIntegerOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking Boolean guard', () => {
		expect(isBooleanOption({ ...data, type: 1 })).toBe(false);
		expect(isBooleanOption({ ...data, type: 2 })).toBe(false);
		expect(isBooleanOption({ ...data, type: 3 })).toBe(false);
		expect(isBooleanOption({ ...data, type: 4 })).toBe(false);
		expect(isBooleanOption({ ...data, type: 5 })).toBe(true);
		expect(isBooleanOption({ ...data, type: 6 })).toBe(false);
		expect(isBooleanOption({ ...data, type: 7 })).toBe(false);
		expect(isBooleanOption({ ...data, type: 8 })).toBe(false);
		expect(isBooleanOption({ ...data, type: 9 })).toBe(false);
		expect(isBooleanOption({ ...data, type: 10 })).toBe(false);
		expect(isBooleanOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking Number guard', () => {
		expect(isNumberOption({ ...data, type: 1 })).toBe(false);
		expect(isNumberOption({ ...data, type: 2 })).toBe(false);
		expect(isNumberOption({ ...data, type: 3 })).toBe(false);
		expect(isNumberOption({ ...data, type: 4 })).toBe(false);
		expect(isNumberOption({ ...data, type: 5 })).toBe(false);
		expect(isNumberOption({ ...data, type: 6 })).toBe(false);
		expect(isNumberOption({ ...data, type: 7 })).toBe(false);
		expect(isNumberOption({ ...data, type: 8 })).toBe(false);
		expect(isNumberOption({ ...data, type: 9 })).toBe(false);
		expect(isNumberOption({ ...data, type: 10 })).toBe(true);
		expect(isNumberOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking User guard', () => {
		expect(isUserOption({ ...data, type: 1 })).toBe(false);
		expect(isUserOption({ ...data, type: 2 })).toBe(false);
		expect(isUserOption({ ...data, type: 3 })).toBe(false);
		expect(isUserOption({ ...data, type: 4 })).toBe(false);
		expect(isUserOption({ ...data, type: 5 })).toBe(false);
		expect(isUserOption({ ...data, type: 6 })).toBe(true);
		expect(isUserOption({ ...data, type: 7 })).toBe(false);
		expect(isUserOption({ ...data, type: 8 })).toBe(false);
		expect(isUserOption({ ...data, type: 9 })).toBe(false);
		expect(isUserOption({ ...data, type: 10 })).toBe(false);
		expect(isUserOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking Channel guard', () => {
		expect(isChannelOption({ ...data, type: 1 })).toBe(false);
		expect(isChannelOption({ ...data, type: 2 })).toBe(false);
		expect(isChannelOption({ ...data, type: 3 })).toBe(false);
		expect(isChannelOption({ ...data, type: 4 })).toBe(false);
		expect(isChannelOption({ ...data, type: 5 })).toBe(false);
		expect(isChannelOption({ ...data, type: 6 })).toBe(false);
		expect(isChannelOption({ ...data, type: 7 })).toBe(true);
		expect(isChannelOption({ ...data, type: 8 })).toBe(false);
		expect(isChannelOption({ ...data, type: 9 })).toBe(false);
		expect(isChannelOption({ ...data, type: 10 })).toBe(false);
		expect(isChannelOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking Role guard', () => {
		expect(isRoleOption({ ...data, type: 1 })).toBe(false);
		expect(isRoleOption({ ...data, type: 2 })).toBe(false);
		expect(isRoleOption({ ...data, type: 3 })).toBe(false);
		expect(isRoleOption({ ...data, type: 4 })).toBe(false);
		expect(isRoleOption({ ...data, type: 5 })).toBe(false);
		expect(isRoleOption({ ...data, type: 6 })).toBe(false);
		expect(isRoleOption({ ...data, type: 7 })).toBe(false);
		expect(isRoleOption({ ...data, type: 8 })).toBe(true);
		expect(isRoleOption({ ...data, type: 9 })).toBe(false);
		expect(isRoleOption({ ...data, type: 10 })).toBe(false);
		expect(isRoleOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking Mentionable guard', () => {
		expect(isMentionableOption({ ...data, type: 1 })).toBe(false);
		expect(isMentionableOption({ ...data, type: 2 })).toBe(false);
		expect(isMentionableOption({ ...data, type: 3 })).toBe(false);
		expect(isMentionableOption({ ...data, type: 4 })).toBe(false);
		expect(isMentionableOption({ ...data, type: 5 })).toBe(false);
		expect(isMentionableOption({ ...data, type: 6 })).toBe(false);
		expect(isMentionableOption({ ...data, type: 7 })).toBe(false);
		expect(isMentionableOption({ ...data, type: 8 })).toBe(false);
		expect(isMentionableOption({ ...data, type: 9 })).toBe(true);
		expect(isMentionableOption({ ...data, type: 10 })).toBe(false);
		expect(isMentionableOption({ ...data, type: 11 })).toBe(false);
	});


	test('Checking Attatchment guard', () => {
		expect(isAttatchmentOption({ ...data, type: 1 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 2 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 3 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 4 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 5 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 6 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 7 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 8 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 9 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 10 })).toBe(false);
		expect(isAttatchmentOption({ ...data, type: 11 })).toBe(true);
	});

});