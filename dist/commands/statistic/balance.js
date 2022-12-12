"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var profile_1 = require("../../database/models/profile");
var index_1 = require("../../structures/index");
var stubby_ts_1 = require("stubby.ts");
exports.default = {
    data: {
        name: 'balance',
        description: 'Your balance',
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
        var user_id, user, Data, balance;
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
                    balance = {
                        title: user.username + "'s Balance",
                        color: Number(index_1.config.colour.embed),
                        description: '',
                        timestamp: new Date(),
                    };
                    balance.description += "" + index_1.config.emoji.coin + (0, stubby_ts_1.SmallNumber)(Data.coin, Data.coin.toString().length + 1) + " ** **";
                    balance.description += "" + index_1.config.emoji.heart + (0, stubby_ts_1.SmallNumber)(Data.heart, Data.heart.toString().length + 1) + " ** **";
                    return [4, interaction.createMessage({ embeds: [balance] })];
                case 3:
                    _a.sent();
                    return [2];
            }
        });
    }); },
};
