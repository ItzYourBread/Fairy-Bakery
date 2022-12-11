"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var stubby_ts_1 = require("stubby.ts");
var profile_1 = require("../../database/models/profile");
var index_1 = require("../../structures/index");
var inventory_json_1 = require("../../data/inventory.json");
exports.default = {
    data: {
        name: 'storage',
        description: 'storage subcommands',
        options: [
            {
                name: 'view',
                description: 'View your bakeries storage',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
            {
                name: 'upgrade',
                description: 'Upgrade your bakaries storage space',
                type: eris_1.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
        ],
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var user, Data_1, Bakeries_1, storage, user, Data_2, pages, buttons_1, collector_1;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.data.options[0].name === 'view')) return [3, 3];
                    user = interaction.member;
                    return [4, profile_1.User.findOne({ id: user.id })];
                case 1:
                    Data_1 = (_a.sent()) ||
                        new profile_1.User({ id: user.id });
                    Bakeries_1 = '';
                    inventory_json_1.bakeries.map(function (e) {
                        if (Data_1.bakeries[e.value] && Data_1.bakeries[e.value] >= 1) {
                            Bakeries_1 += "" + index_1.config.emoji[e.emoji] + (0, stubby_ts_1.SmallNumber)(Data_1.bakeries[e.value], Data_1.bakeries[e.value].toString().length + 1) + "  ";
                        }
                    });
                    storage = {
                        title: user.username + "'s Storage",
                        color: Number(index_1.config.colour.embed),
                        description: '',
                        fields: [],
                        footer: {
                            text: "You only can store " + Data_1.storage.space + " types of bakeries",
                        },
                        timestamp: new Date(),
                    };
                    if (!Bakeries_1) {
                        storage.description = 'ᴇᴍᴘᴛʏ';
                    }
                    else {
                        storage.description =
                            'You can upgrade your storage by typing `/storage upgrade`.';
                        storage.fields.push({
                            name: "Storage level " + Data_1.storage.level,
                            value: Bakeries_1,
                            inline: false,
                        });
                    }
                    return [4, interaction.createMessage({ embeds: [storage] })];
                case 2:
                    _a.sent();
                    Bakeries_1 = '';
                    return [3, 6];
                case 3:
                    if (!(interaction.data.options[0].name === 'upgrade')) return [3, 6];
                    user = interaction.member;
                    return [4, profile_1.User.findOne({ id: user.id })];
                case 4:
                    Data_2 = (_a.sent()) ||
                        new profile_1.User({ id: user.id });
                    pages = [
                        {
                            title: 'Storage upgrade',
                            color: Number(index_1.config.colour.embed),
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1049381132438876171/1051519163383955486/IMG_0474.png',
                            },
                            description: 'Do you want to uprade your storage to level 2?',
                            timestamp: new Date(),
                        },
                    ];
                    buttons_1 = {
                        type: eris_1.Constants.ComponentTypes.ACTION_ROW,
                        components: [
                            {
                                label: "Upgrade",
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.SUCCESS,
                                custom_id: 'upgradeStorage',
                                disabled: false,
                            },
                        ],
                    };
                    pages[0].description += "\n**Perks**\nspace 2 => 4\n\nCost: " + index_1.config.emoji.coin + "500";
                    return [4, interaction.createMessage({
                            embeds: [pages[0]],
                            components: [buttons_1],
                        })];
                case 5:
                    _a.sent();
                    collector_1 = function (caller) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
                        var _a;
                        return (0, tslib_1.__generator)(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (caller.member.id != interaction.member.id) {
                                        return [2, caller.createMessage({
                                                content: "It's not for you!",
                                                flags: 64,
                                            })];
                                    }
                                    return [4, caller.deferUpdate()];
                                case 1:
                                    _b.sent();
                                    _a = caller.data.custom_id;
                                    switch (_a) {
                                        case 'upgradeStorage': return [3, 2];
                                    }
                                    return [3, 4];
                                case 2:
                                    if (Data_2.coin < 1) {
                                        return [2, caller.createMessage({
                                                content: "You don't have enough **" + index_1.config.emoji.coin + "Coin** to uprgade storage!",
                                                flags: 64,
                                            })];
                                    }
                                    return [4, caller.editOriginalMessage({
                                            embeds: [
                                                {
                                                    title: 'Storage upgraded!',
                                                    color: Number(index_1.config.colour.success),
                                                    thumbnail: {
                                                        url: 'https://cdn.discordapp.com/attachments/1049381132438876171/1051519163383955486/IMG_0474.png',
                                                    },
                                                    description: "You successfully upgraded your storage to level **" + (Data_2.storage.level - 1) + "** to **" + Data_2.storage.level + "**",
                                                    timestamp: new Date(),
                                                },
                                            ],
                                            components: [],
                                        })];
                                case 3:
                                    _b.sent();
                                    return [3, 4];
                                case 4:
                                    client.off('interactionCreate', collector_1);
                                    return [2];
                            }
                        });
                    }); };
                    client.on('interactionCreate', collector_1);
                    setTimeout(function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
                        return (0, tslib_1.__generator)(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    buttons_1.components.map(function (d) {
                                        d.disabled = true;
                                    });
                                    return [4, interaction.editOriginalMessage({
                                            components: [buttons_1],
                                        })];
                                case 1:
                                    _a.sent();
                                    client.on('interactionCreate', collector_1);
                                    return [2];
                            }
                        });
                    }); }, 30000);
                    _a.label = 6;
                case 6: return [2];
            }
        });
    }); },
};
