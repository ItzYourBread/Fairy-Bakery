import chalk from 'chalk';
import { Client } from 'eris';

export function ready(client: Client) {
    client.on('ready', () => {
        client.editStatus('idle', {
            name: 'Creating by Satify.cf!!❤️',
            type: 0,
        });
        console.log(
            chalk.greenBright(
                `[Discord API] ${client.user.username} is now connected to Discord!`
            )
        );
    });
    console.log(chalk.cyanBright('[Event] ready is loaded'));
}
