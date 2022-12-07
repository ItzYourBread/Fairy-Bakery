"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../structures/index");
exports.default = {
    data: {
        name: 'help',
        description: 'Bakery help!',
    },
    run: function (client, interaction) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var commands;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commands = {
                        title: 'Help and Commands!',
                        color: Number(index_1.config.colour.embed),
                        fields: [
                            {
                                name: 'Social',
                                value: 'soon',
                                inline: false,
                            },
                            {
                                name: 'Currency',
                                value: '`balance`, `inventory`',
                                inline: false,
                            },
                            {
                                name: 'Misc',
                                value: '`ping`',
                                inline: false,
                            },
                            {
                                name: 'Utility',
                                value: '`help`',
                                inline: false,
                            },
                        ],
                        footer: {
                            text: 'Powered by Creative.co',
                        },
                        timestamp: new Date(),
                    };
                    return [4, interaction.createMessage({ embeds: [commands] })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); },
};
