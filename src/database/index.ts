import mongoose from 'mongoose';
import chalk from 'chalk';
import 'config/dotenv'

export function mongodb() {
    mongoose
        .connect(process.env.DATABASE)
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
