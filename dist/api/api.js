"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = (0, tslib_1.__importDefault)(require("express"));
var chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
require("dotenv/config");
var Inventory = (0, tslib_1.__importStar)(require("../data/inventory.json"));
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send('Welcome to Bakery Api service');
});
app.get('/json/inventory', function (req, res) {
    res.status(200);
    res.send(Inventory);
});
app.listen(process.env.PORT, function () {
    console.log(chalk_1.default.greenBright('[Express] Bakery Api service is up'));
});
