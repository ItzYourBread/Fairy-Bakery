"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var profile_1 = require("../../database/models/profile");
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
        var user, Data, stove, FirstStove;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.data.options[0].name === 'view')) return [3, 3];
                    user = interaction.member;
                    return [4, profile_1.User.findOne({ id: user.id })];
                case 1:
                    Data = (_a.sent()) ||
                        new profile_1.User({ id: user.id });
                    stove = {
                        title: user.username + "'s Stove",
                        color: Number(index_1.config.colour.embed),
                        description: 'Baking',
                        fields: [],
                        timestamp: new Date(),
                    };
                    FirstStove = '';
                    if (Date.now() - Data.stove.first.date < Data.stove.first.timer) {
                        FirstStove += "Baking " + Data.stove.first.bakery + "!";
                        FirstStove += "\n**Timer:** " + Data.stove.first.timer;
                    }
                    else {
                        FirstStove = 'Stove has nothing to bake :(';
                    }
                    if (Data.stove.first.status) {
                        stove.fields.push({
                            name: "Stove [Lvl " + Data.stove.first.level + "]",
                            value: FirstStove,
                            inline: true,
                        });
                    }
                    return [4, interaction.createMessage({ embeds: [stove] })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2];
            }
        });
    }); },
};
