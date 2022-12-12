"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var index_1 = require("../../structures/index");
exports.default = {
    data: {
        name: 'stove',
        description: 'Stove SubCommand',
        options: [
            {
                name: 'view',
                description: 'View your stove',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
        ],
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var user, stove;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.data.options[0].name === 'view')) return [3, 2];
                    user = interaction.member;
                    stove = {
                        title: user.username + "'s Stove",
                        color: Number(index_1.config.colour.embed),
                        description: "empty",
                        timestamp: new Date(),
                    };
                    return [4, interaction.createMessage({ embeds: [stove] })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2];
            }
        });
    }); },
};
