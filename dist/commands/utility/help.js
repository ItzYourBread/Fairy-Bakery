"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../structures/index");
exports.default = {
    data: {
        name: 'help',
        description: 'Bakery help!',
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var pages;
        return (0, tslib_1.__generator)(this, function (_a) {
            pages = [
                {
                    title: 'Help & Commands',
                    color: Number(index_1.config.colour.embed),
                    fields: [
                        {
                            name: '</balance:0>',
                            value: 'Your balance',
                            inline: false,
                        },
                        {
                            name: '</inventory:0>',
                            value: 'Your inventory to store stocks',
                            inline: false,
                        },
                        {
                            name: '</storage:0>',
                            value: 'View storage, Upgrade storage',
                            inline: false,
                        },
                        {
                            name: '</daily:0>',
                            value: 'Get your daily reward',
                            inline: false,
                        },
                        {
                            name: '</profile:0>',
                            value: 'View profile',
                            inline: false,
                        },
                    ],
                    footer: {
                        text: 'Pages 1/2',
                    },
                },
                {
                    title: 'Help & Commands',
                    color: Number(index_1.config.colour.embed),
                    fields: [
                        {
                            name: '</profile:0>',
                            value: 'View profile',
                            inline: false,
                        },
                        {
                            name: '</ping:0>',
                            value: 'Ping pong',
                            inline: false,
                        },
                        {
                            name: '</help:0>',
                            value: 'Get help from FairyBakery',
                            inline: false,
                        },
                    ],
                    footer: {
                        text: 'Pages 2/2',
                    },
                },
            ];
            (0, index_1.ButtonPagination)(client, interaction, pages, 35000);
            return [2];
        });
    }); },
};
