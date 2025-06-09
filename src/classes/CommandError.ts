import { CommandInteraction, InteractionReplyOptions, MessageFlags } from 'discord.js';


export class CommandError extends Error {

	public static async handleError(error: CommandError, interaction: CommandInteraction): Promise<void> {
		if(interaction.replied || interaction.deferred) {
			await interaction.editReply(error.options);
		} else {
			await interaction.reply(error.options);
		}
	}


	public readonly options: InteractionReplyOptions;

	constructor(options: InteractionReplyOptions | string) {
		super('An error happened while executing this command.');

		if(typeof options === 'string')
			options = { content: options, flags: MessageFlags.Ephemeral};
		else if(typeof options.ephemeral == 'undefined')
			//	@ts-ignore
			options.flags = (options.flags ?? 0) | MessageFlags.Ephemeral;

		this.options = options;
	}
}