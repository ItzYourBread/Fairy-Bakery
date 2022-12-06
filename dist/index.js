"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var figlet_1 = (0, tslib_1.__importDefault)(require("figlet"));
var chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
require("dotenv/config");
var index_1 = (0, tslib_1.__importDefault)(require("./listeners/index"));
var index_2 = (0, tslib_1.__importDefault)(require("./handlers/index"));
console.clear();
console.log(chalk_1.default.hex('#FFCF80')(figlet_1.default.textSync('Bakery.', { horizontalLayout: 'full' })));
console.log(chalk_1.default.blueBright('[System] Loading...'));
var client = new eris_1.Client(process.env.TOKEN, {
    restMode: true,
    autoreconnect: true,
    firstShardID: 0,
    lastShardID: 0,
    maxShards: 0,
    allowedMentions: {
        everyone: false,
        users: true,
        roles: true,
    },
    intents: [
        'guilds',
        'guildMessages',
        'guildMembers',
        'directMessages',
        'guildEmojis',
    ],
});
exports.client = client;
index_1.default.ready(client);
index_1.default.shardReady(client);
index_1.default.error(client);
index_1.default.rawWS(client);
index_1.default.interactionCreate(client);
index_2.default.loadCommands(client);
index_2.default.mongodb();
client.connect();
console.log(chalk_1.default.blueBright('[System] Loaded.'));
