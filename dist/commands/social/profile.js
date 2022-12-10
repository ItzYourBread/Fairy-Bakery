"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var profile_1 = require("../../database/models/profile");
var index_1 = require("../../structures/index");
var stubby_ts_1 = require("stubby.ts");
var inventory_json_1 = require("../../data/inventory.json");
exports.default = {
    data: {
        name: 'profile',
        description: 'View our bakery members profile!',
        options: [
            {
                name: 'user',
                type: eris_1.Constants.ApplicationCommandOptionTypes.USER,
                description: 'Select a user',
                required: false,
            },
        ],
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var user_id, user, Data, Stocks, Bakeries, main, inventory, storage, cooldown, menus, timer, collector;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_id = interaction.data.options && interaction.data.options[0]
                        ? interaction.data.options[0].value
                        : interaction.member.id;
                    return [4, client.users.get(user_id)];
                case 1:
                    user = _a.sent();
                    return [4, profile_1.User.findOne({ id: user_id })];
                case 2:
                    Data = (_a.sent()) || new profile_1.User({ id: user_id });
                    Stocks = '';
                    Bakeries = '';
                    inventory_json_1.stocks.map(function (e) {
                        if (Data.stocks[e.value] && Data.stocks[e.value] >= 1) {
                            Stocks += "" + index_1.config.emoji[e.emoji] + (0, stubby_ts_1.SmallNumber)(Data.stocks[e.value], Data.stocks[e.value].toString().length + 1) + "  ";
                        }
                    });
                    inventory_json_1.bakeries.map(function (e) {
                        if (Data.bakeries[e.value] && Data.bakeries[e.value] >= 1) {
                            Bakeries += "" + index_1.config.emoji[e.emoji] + (0, stubby_ts_1.SmallNumber)(Data.bakeries[e.value], Data.bakeries[e.value].toString().length + 1) + "  ";
                        }
                    });
                    if (!Stocks) {
                        Stocks = 'ᴇᴍᴘᴛʏ';
                    }
                    if (!Bakeries) {
                        Bakeries = 'ᴇᴍᴘᴛʏ';
                    }
                    main = {
                        title: user.username + "'s Profile",
                        color: Number(index_1.config.colour.embed),
                        description: "Bio: New Bakery User 2022!",
                        timestamp: new Date(),
                    };
                    inventory = {
                        title: user.username + "'s Inventory",
                        color: Number(index_1.config.colour.embed),
                        description: Stocks,
                        timestamp: new Date(),
                    };
                    storage = {
                        title: user.username + "'s Storage",
                        color: Number(index_1.config.colour.embed),
                        description: Bakeries,
                        timestamp: new Date(),
                    };
                    cooldown = {
                        title: user.username + "'s Cooldown",
                        color: Number(index_1.config.colour.embed),
                        description: "None",
                        timestamp: new Date(),
                    };
                    menus = {
                        type: eris_1.Constants.ComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: eris_1.Constants.ComponentTypes.SELECT_MENU,
                                custom_id: 'ProfileSelectMenus',
                                placeholder: 'Options',
                                options: [
                                    {
                                        label: 'Main',
                                        value: 'main',
                                    },
                                    {
                                        label: 'Inventory',
                                        value: 'inventory',
                                    },
                                    {
                                        label: 'Storage',
                                        value: 'storage',
                                    },
                                    {
                                        label: 'Cooldown',
                                        value: 'cooldown',
                                    },
                                ],
                                min_values: 1,
                                max_values: 1,
                                disabled: false,
                            },
                        ],
                    };
                    return [4, interaction.createMessage({
                            embeds: [main],
                            components: [menus],
                        })];
                case 3:
                    _a.sent();
                    timer = null;
                    collector = function (caller) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
                        var _a;
                        return (0, tslib_1.__generator)(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (caller.member.id !== interaction.member.id) {
                                        return [2, caller.createMessage({
                                                content: "It's not for you!",
                                                flags: 64,
                                            })];
                                    }
                                    if (!(caller.data.component_type ===
                                        eris_1.Constants.ComponentTypes.SELECT_MENU &&
                                        caller.data.custom_id === 'ProfileSelectMenus')) return [3, 10];
                                    return [4, caller.deferUpdate()];
                                case 1:
                                    _b.sent();
                                    _a = caller.data.values[0];
                                    switch (_a) {
                                        case 'main': return [3, 2];
                                        case 'inventory': return [3, 4];
                                        case 'storage': return [3, 6];
                                        case 'cooldown': return [3, 8];
                                    }
                                    return [3, 10];
                                case 2: return [4, caller.editOriginalMessage({ embeds: [main] })];
                                case 3:
                                    _b.sent();
                                    console.log('Main works');
                                    return [3, 10];
                                case 4: return [4, caller.editOriginalMessage({
                                        embeds: [inventory],
                                    })];
                                case 5:
                                    _b.sent();
                                    console.log('inventory works');
                                    return [3, 10];
                                case 6: return [4, caller.editOriginalMessage({ embeds: [storage] })];
                                case 7:
                                    _b.sent();
                                    console.log('storage works');
                                    return [3, 10];
                                case 8: return [4, caller.editOriginalMessage({
                                        embeds: [cooldown],
                                    })];
                                case 9:
                                    _b.sent();
                                    console.log('cooldown works');
                                    return [3, 10];
                                case 10:
                                    clearTimeout(timer);
                                    client.off('interactionCreate', collector);
                                    return [2];
                            }
                        });
                    }); };
                    client.on('interactionCreate', collector);
                    timer = setTimeout(function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
                        return (0, tslib_1.__generator)(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    client.off('interactionCreate', collector);
                                    return [4, interaction.editOriginalMessage({
                                            components: [],
                                        })];
                                case 1:
                                    _a.sent();
                                    console.log('Collector ended!');
                                    return [2];
                            }
                        });
                    }); }, 15000);
                    return [2];
            }
        });
    }); },
};
