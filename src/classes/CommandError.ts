import { CommandInteraction, InteractionReplyOptions } from 'discord.js';


export class CommandError extends Error {

	public static async handleError(error: CommandError, interaction: CommandInteraction): Promise<void> {
		if(interaction.replied) {
			await interaction.editReply(error.options);
		} else {
			await interaction.reply(error.options);
		}
	}


	public readonly options: InteractionReplyOptions;

	constructor(options: InteractionReplyOptions | string) {
		super('An error happened while executing this command.');

		if(typeof options === 'string')
			options = { content: options, ephemeral: true};
		else if(typeof options.ephemeral == 'undefined')
			options.ephemeral = true;

		this.options = options;
	}
}