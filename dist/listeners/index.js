"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ready_1 = require("./ready");
var shardReady_1 = require("./shardReady");
var error_1 = require("./error");
var rawWS_1 = require("./rawWS");
var interactionCreate_1 = require("./interactionCreate");
exports.default = {
    ready: ready_1.ready,
    shardReady: shardReady_1.shardReady,
    error: error_1.error,
    rawWS: rawWS_1.rawWS,
    interactionCreate: interactionCreate_1.interactionCreate,
};
