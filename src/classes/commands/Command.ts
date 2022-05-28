import { Client } from 'discord.js';
import { APIApplicationCommand, APIApplicationCommandOption, ApplicationCommandType } from 'discord-api-types/v10';
import { CommandWithLoader } from './CommandWithLoader';


export abstract class Command<T extends Client = Client> extends CommandWithLoader<T> {
	protected readonly extension = 'subcommand';

	//	Permissions
	public defaultMemberPermisions: string | null = null;

	public abstract options: APIApplicationCommandOption[];
	public type: ApplicationCommandType = ApplicationCommandType.ChatInput;


	/**
	 * Checking if this command is up to date
	 * @param command The command to check with
	 * @returns If this command is up to date
	 */
	public matchesAPICommand(command: APIApplicationCommand): boolean {
		if (command.name != this.name)               return false;
		if (command.type != this.type)               return false;
		if (command.description != this.description) return false;
		if (command.default_member_permissions != this.defaultMemberPermisions) return false;

		if (command.guild_id) {
			if (this.data.guild_id != command.guild_id) return false;
		}
		else {
			//	TODO: Check if this is allowed in DM
			// if (this.)
		}

		//	TODO check localised strings

		if (command.options && !this._optionsMatch(command.options)) return false;

		return true;
	}


	private _optionsMatch(options: APIApplicationCommandOption[]): boolean {
		for(const option of options) {
			const myOption = options.find(o=>o.name == option.name);
			if(!myOption) return false;
			
			
			
			if (option.type != myOption.type) return false;
			if (option.name != myOption.name) return false;
			if (option.description != myOption.description) return false;
			if (option.required != myOption.required) return false;

			//	TODO: Check choices

			//	TODO: check localized
		}

		return true
	}
}