"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
var tslib_1 = require("tslib");
var chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
function ready(client) {
    client.on('ready', function () {
        client.editStatus('online', { name: 'Bakery bot!', type: 0 });
        console.log(chalk_1.default.greenBright("[Discord API] " + client.user.username + " is now connected to Discord!"));
    });
}
exports.ready = ready;
