import { APIApplicationCommand, APIApplicationCommandOption } from 'discord-api-types/v10';
import { Client, CommandInteraction } from 'discord.js';
import { ApplicationCommand } from '../../types';

export abstract class BaseCommand<T extends Client = Client> {
	public client: T;

	// private commands: Collection<string, Subcommand>;
	public data: APIApplicationCommand;

	//	Command data

	public abstract readonly name: string;
	public abstract readonly description: string; // @ts-ignore
	public abstract options?: APIApplicationCommandOption[];

	//	Events


	/**
	 * Gets called when the class started.
	 * Subcommands should be loaded from this
	 *
	 * **`this.client` IS NOT ALWAYS DEFINED HERE**
	 */
	public abstract onStart(): void


	/**
	 * Load the command
	 * @param command The command to load
	 */
	public load(command: APIApplicationCommand): void {
		this.data = command;
		this.onLoad();
	}


	/**
	 * Gets called when the class loads.
	 * When this loads, the ApplicationCommand object will be delivered with it.
	 */
	public abstract onLoad(): void


	/**
	 * Runs this command
	 * @param interaction The current interaction
	 */
	public abstract run(interaction: CommandInteraction): Promise<any | void>;


	//	Utility Functions


	/**
	 * Transforms this command to ApplicationCommandData
	 * @returns ApplicationCommandData
	 */
	public toJSON(): ApplicationCommand {
		const json: ApplicationCommand = {
			name:               this.name,
			description:        this.description
		};

		const options = this.mapOptions(this.options, false);
		if (options && options.length > 0) json.options = options;

		return json;
	}

	
	/**
	 * Maps the command options so they match the discord API closer
	 * @param options The options to match
	 * @param defined If the options should be defined or not
	 * @returns The mapped options
	 */
	public mapOptions(options: APIApplicationCommandOption[] | undefined, defined = true): APIApplicationCommandOption[] | undefined {
		//	@ts-ignore
		return options?.map(({ type, name, description, required, choices, options, autocomplete }) => {
			const option: any = { type, name, description, autocomplete };

			if (required)     option.required     = true;
			if (choices)      option.choices      = choices;
			if (options)      option.options      = this.mapOptions(options, false);
			if (autocomplete) option.autocomplete = true;

			return option;
		}) ?? (defined ? [] : undefined);
	}
}
