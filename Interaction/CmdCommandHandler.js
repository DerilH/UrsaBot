var readline = require('readline');

class CmdCommandHandler {
    constructor(bot) {
        var rl = readline.createInterface(process.stdin, process.stdout);
        rl.setPrompt('Cmd> ');
        rl.prompt();
        rl.on('line', function (line) {

            const input = line.toString();
            if(!input.startsWith('/')) return;
            if (input === '/de') {
                bot.commandManager.loadCommands(bot.commandManager.currentPath);
                bot.commandManager.deployCommandsLocal(process.env.guildId);
            }else if(input === '/deG')
            {
                bot.commandManager.loadCommands(bot.commandManager.currentPath);
                bot.commandManager.deployCommandsGlobal();
            } 

            rl.prompt();
        }).on('close', function () {
            process.exit(0);
        });
    }
}
module.exports.CmdCommandHandler = CmdCommandHandler;