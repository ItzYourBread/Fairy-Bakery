import chalk from 'chalk';
import { Client } from 'eris';

export function error(client: Client) {
    client.on('error', (err) => {
        console.error(err);
    });
    console.log(chalk.cyanBright('[Event] error is loaded'));
}
