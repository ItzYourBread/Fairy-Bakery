import chalk from 'chalk';

export function rawWS(client) {
    client.on('rawWS', () => {});
    console.log(chalk.cyanBright('[Event] rawWS is loaded'));
}
