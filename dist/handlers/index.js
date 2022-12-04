"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("./commands");
var index_1 = require("../database/index");
exports.default = {
    loadCommands: commands_1.loadCommands,
    mongodb: index_1.mongodb,
};
