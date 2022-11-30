import chalk from 'chalk';

export function shardReady(client) {
    client.on('shardReady', (id) => {
        console.log(chalk.yellowBright(`[Shard] ${id} ready!`));
    });
    console.log(chalk.cyanBright('[Event] shardReady is loaded'));
}
