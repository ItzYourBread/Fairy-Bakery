import express from 'express';
import chalk from 'chalk';
import 'dotenv/config';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Bakery Api service');
});

app.listen(process.env.PORT, () => {
    console.log(chalk.greenBright('[Express] Bakery Api service is up'));
});
