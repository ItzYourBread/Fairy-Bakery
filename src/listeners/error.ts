import chalk from 'chalk';

export function error(client) {
    client.on('error', (err) => {
        if (err.code === 1006) return;
        else console.error(error);
    });
    console.log(chalk.cyanBright('[Event] error is loaded'));
}
