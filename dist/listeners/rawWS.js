"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawWS = void 0;
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
function rawWS(client) {
    client.on('rawWS', function () { });
    console.log(chalk_1.default.cyanBright('[Event] rawWS is loaded'));
}
exports.rawWS = rawWS;
