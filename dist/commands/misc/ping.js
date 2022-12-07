"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
exports.default = {
    data: {
        name: 'ping',
        description: 'Ping pong',
        type: eris_1.Constants.ApplicationCommandTypes.CHAT_INPUT,
    },
    run: function (client, interaction) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var ping;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ping = Date.now() - interaction.createdAt;
                    return [4, interaction.createMessage({
                            content: "Pong! `".concat(ping, "ms` "),
                        })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); },
};
