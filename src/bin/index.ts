import chalk from 'chalk';
import { Command } from 'commander';
import { CommandLoader } from '..';
import { fullPath } from '../functions/utils';
require('dotenv').config();

(async () => {

	const program = new Command()
		.version('1.0.0')
		.name('cmdhandler')
		.usage('<input directory> [options]')
		.argument('[input directory]')
		.option('-r, --recursive', 'Should it check recursively?', true)
		.option('-d, --delete', 'Should it delete all commands?', false)
		.option('-t, --token', 'The bot token to use, defaults to BOT_TOKEN env')
		.option('-i, --client', 'The client id to use, defaults to CLIENT_ID env')
		.option('-g, --guild', 'The guild id to use')
		.addHelpText('after', ' ')
		.parse();

	const options = program.opts();


	//	Getting values


	const token: string = options.token ?? process.env.BOT_TOKEN;
	const clientId: string = options.clientid ?? process.env.CLIENT_ID;
	const guildId: string | undefined = options.guildId;

	const recursive: boolean = options.recursive;
	const deleteCommands: boolean = options.delete;

	const [ dir ] = program.processedArgs;


	//	Validation


	if(!dir) exit();
	if(!token) exit('BOT_TOKEN was not found & options.token is undefined');
	if(!clientId) exit('CLIENT_ID was not found & options.client is undefined');


	//	Stating loader


	const loader = new CommandLoader({ clientId, guildId, token });


	//	Checking cases


	if(deleteCommands) {
		warn('Deleting all commands'); blank();
		loader.on('deleted', ({name}) => error(`Deleted command ${chalk.red(name)}`));
		await loader.deleteAllCommands();
	}
	else {

		info(`Loaded commands from ${chalk.green(fullPath(dir))}`);
		loader.loadFromDirectory(dir, recursive);

		warn('Updating commands'); blank();

		//	Events

		loader.on('created', ({name}) => warn(`Created command ${chalk.yellow(name)}`));
		loader.on('updated', ({name}) => info(`Updated command ${chalk.green(name)}`));
		loader.on('deleted', ({name}) => info(`Deleted command ${chalk.red(name)}`));

		//	Loading

		await loader.loadCommands();
	}

	blank(); info('Finished task!');

	//	Util functions


	function exit(msg?: string): void {
		if(msg) program.addHelpText('afterAll', msg);
		program.help();
	}


	function info(msg: string) {
		console.log(chalk.green('⇒ '), msg);
	}


	function warn(msg: string) {
		console.log(chalk.yellow('⇒ '), msg);
	}


	function error(msg: string) {
		console.log(chalk.red('⇒ '), msg);
	}


	function blank() {
		console.log(' ');
	}
})();
