import { Client } from 'eris';
import figlet from 'figlet';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

console.clear();
console.log(
    chalk.hex('#FFCF80')(
        figlet.textSync('Bakery.', { horizontalLayout: 'full' })
    )
);

console.log('[System] Loading...');
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
export { client };

client.connect();
console.log('[System] Loaded.');
