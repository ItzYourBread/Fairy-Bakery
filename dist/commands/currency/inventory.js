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
        name: 'inventory',
        description: 'Your inventory',
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
        var user_id, user, Data, Bakeries, Stocks, msg, inventory;
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
                    Bakeries = '';
                    Stocks = '';
                    inventory_json_1.bakeries.map(function (e) {
                        if (Data.bakeries[e.value] && Data.bakeries[e.value] >= 1) {
                            Bakeries += "" + index_1.config.emoji[e.emoji] + (0, stubby_ts_1.SmallNumber)(Data.bakeries[e.value], Data.bakeries[e.value].toString().length + 1) + "  ";
                        }
                    });
                    inventory_json_1.stocks.map(function (e) {
                        if (Data.stocks[e.value] && Data.stocks[e.value] >= 1) {
                            Stocks += "" + index_1.config.emoji[e.emoji] + (0, stubby_ts_1.SmallNumber)(Data.stocks[e.value], Data.stocks[e.value].toString().length + 1) + "  ";
                        }
                    });
                    if (!Bakeries && !Stocks) {
                        msg = 'ᴇᴍᴘᴛʏ';
                    }
                    inventory = {
                        title: user.username + "'s Inventory",
                        color: Number(index_1.config.colour.embed),
                        description: msg,
                        fields: [],
                        timestamp: new Date(),
                    };
                    if (Bakeries) {
                        inventory.fields.push({
                            name: 'Bakeries',
                            value: Bakeries,
                            inline: true,
                        });
                    }
                    if (Stocks) {
                        inventory.fields.push({
                            name: 'Stocks',
                            value: Stocks,
                            inline: true,
                        });
                    }
                    return [4, interaction.createMessage({ embeds: [inventory] })];
                case 3:
                    _a.sent();
                    Bakeries = '';
                    Stocks = '';
                    return [2];
            }
        });
    }); },
};
