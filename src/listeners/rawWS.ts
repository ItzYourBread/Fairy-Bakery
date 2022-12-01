import chalk from 'chalk';
import { Client } from 'eris';

export function rawWS(client: Client) {
    client.on('rawWS', () => {});
    console.log(chalk.cyanBright('[Event] rawWS is loaded'));
}
