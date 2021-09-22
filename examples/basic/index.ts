import { Client, CommandInteraction, Intents } from 'discord.js';
import { join } from 'path';
import { CommandHandler } from '../../src/classes/CommandHandler';
require('dotenv').config();

const client = new Client({
	intents: [Intents.FLAGS.GUILDS]
});

const handler = new CommandHandler(client, {
	createCommands: true,
	deleteCommands: true,
	updateCommands: true,
	guildId: process.env.GUILD_ID,
});

handler.loadFromDirectory(join(__dirname, 'commands'));

client.once('ready', async () => {
	console.log('Loading commands...');
	await handler.loadCommands();
	console.log(`Loaded ${handler.commands.length} commands!`);
	console.log('Client is ready!');
});

client.on('interactionCreate', async i => {
	if(await handler.runCommand(i as CommandInteraction)) {
		console.log('Handled command');
	}
	else {
		console.log('Command not found');
	}
});

client.login(process.env.BOT_TOKEN);