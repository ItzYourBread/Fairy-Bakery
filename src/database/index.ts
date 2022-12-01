import mongoose from 'mongoose';
import chalk from 'chalk';
import { config } from '../structures/index';

export function mongodb() {
    mongoose
        .connect(config.database.mongoDB)
        .then(() => {
            console.log(chalk.greenBright('[Database] Connected'));
        })
        .catch((err) => {
            console.log(
                chalk.red(
                    '[Database] ⚠️ Unable to connect to MongoDB Database.\nError: ' +
                        err
                )
            );
        });
}
