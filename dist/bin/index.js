"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const __1 = require("..");
const utils_1 = require("../functions/utils");
require('dotenv').config();
(async () => {
    const program = new commander_1.Command()
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
    const token = options.token ?? process.env.BOT_TOKEN;
    const clientId = options.clientid ?? process.env.CLIENT_ID;
    const guildId = options.guildId;
    const recursive = options.recursive;
    const deleteCommands = options.delete;
    const [dir] = program.processedArgs;
    if (!dir)
        exit();
    if (!token)
        exit('BOT_TOKEN was not found & options.token is undefined');
    if (!clientId)
        exit('CLIENT_ID was not found & options.client is undefined');
    const loader = new __1.CommandLoader({ clientId, guildId, token });
    if (deleteCommands) {
        warn('Deleting all commands');
        blank();
        loader.on('deleted', ({ name }) => error(`Deleted command ${chalk_1.default.red(name)}`));
        await loader.deleteAllCommands();
    }
    else {
        info(`Loaded commands from ${chalk_1.default.green(utils_1.fullPath(dir))}`);
        loader.loadFromDirectory(dir, recursive);
        warn('Updating commands');
        blank();
        loader.on('created', ({ name }) => warn(`Created command ${chalk_1.default.yellow(name)}`));
        loader.on('updated', ({ name }) => info(`Updated command ${chalk_1.default.green(name)}`));
        loader.on('deleted', ({ name }) => info(`Deleted command ${chalk_1.default.red(name)}`));
        await loader.loadCommands();
    }
    blank();
    info('Finished task!');
    function exit(msg) {
        if (msg)
            program.addHelpText('afterAll', msg);
        program.help();
    }
    function info(msg) {
        console.log(chalk_1.default.green('⇒ '), msg);
    }
    function warn(msg) {
        console.log(chalk_1.default.yellow('⇒ '), msg);
    }
    function error(msg) {
        console.log(chalk_1.default.red('⇒ '), msg);
    }
    function blank() {
        console.log(' ');
    }
})();
