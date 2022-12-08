import express from 'express';
import chalk from 'chalk';
import 'dotenv/config';

// all json files
import * as Inventory from '../data/inventory.json';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Bakery Api service');
});

app.get('/json/inventory', (req, res) => {
    res.status(200);
    res.send(Inventory);
});

app.listen(process.env.PORT, () => {
    console.log(chalk.greenBright('[Express] Bakery Api service is up'));
});
