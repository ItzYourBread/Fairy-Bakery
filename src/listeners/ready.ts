import chalk from 'chalk';

export function ready(client) {
    client.on('ready', () => {
        client.editStatus('online', { name: 'Bakery bot!', type: 0 });
        console.log(
            chalk.greenBright(
                `[Discord API] ${client.user.username} is now connected to Discord!`
            )
        );
    });
    console.log(chalk.cyanBright('[Event] ready is loaded'));
}
