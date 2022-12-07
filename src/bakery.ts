import { Client } from 'eris';
import figlet from 'figlet';
import chalk from 'chalk';
import 'dotenv/config';
import listener from './listeners/index';
import handler from './handlers/index';

console.clear();
console.log(
    chalk.hex('#FFCF80')(
        figlet.textSync('Bakery.', { horizontalLayout: 'full' })
    )
);

console.log(chalk.blueBright('[System] Loading...'));
const client = new Client(process.env.TOKEN, {
    restMode: true,
    autoreconnect: true,
    firstShardID: 0,
    lastShardID: 0,
    maxShards: 0,
    allowedMentions: {
        everyone: false,
        users: true,
        roles: true,
    },
    intents: [
        'guilds',
        'guildMessages',
        'guildMembers',
        'directMessages',
        'guildEmojis',
    ],
});

// all listeners here
listener.ready(client);
listener.shardReady(client);
listener.error(client);
listener.rawWS(client);
listener.interactionCreate(client);

// all handlers here
handler.loadCommands(client);
handler.mongodb();

// connect to discord api
client.connect();
console.log(chalk.blueBright('[System] Loaded.'));
