"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var profile_1 = require("../../database/models/profile");
var index_1 = require("../../structures/index");
exports.default = {
    data: {
        name: 'daily',
        description: 'Get your daily reward!',
    },
    run: function (client, interaction) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var user, Data, cash, streak, bonus, dailyReset, reward;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = interaction.member;
                    return [4, profile_1.User.findOne({ id: user.id })];
                case 1:
                    Data = (_a.sent()) || new profile_1.User({ id: user.id });
                    if (Data.daily.time > Date.now()) {
                        return [2, interaction.createMessage({
                                embeds: [
                                    {
                                        color: Number(index_1.config.colour.danger),
                                        description: "You already claimed your daily reward today!\nYour next daily <t:".concat(Math.floor(Data.daily.time / 1000) + 3600, ":R>"),
                                    },
                                ],
                                flags: 64,
                            })];
                    }
                    if (Date.now() - Data.daily.time > 172800000) {
                        Data.daily.streak = 1;
                    }
                    else {
                        Data.daily.streak += 1;
                    }
                    cash = 200;
                    streak = Data.daily.streak;
                    bonus = Math.round(0.02 * cash * streak);
                    if (streak > 1) {
                        cash = cash + bonus;
                    }
                    dailyReset = new Date();
                    Data.cash += cash;
                    Data.daily.time = dailyReset.setUTCHours(23, 59, 59, 999);
                    Data.save();
                    reward = {
                        title: "".concat(user.username, "'s Daily"),
                        color: Number(index_1.config.colour.embed),
                        description: "You received ".concat(index_1.config.emoji.cash, "`").concat(cash, "` and added to your profile!"),
                        fields: [
                            {
                                name: 'Streak',
                                value: "".concat(Data.daily.streak),
                                inline: true,
                            },
                            {
                                name: 'Next Daily',
                                value: "<t:".concat(Math.floor(Data.daily.time / 1000) + 3600, ":R>"),
                                inline: true,
                            },
                        ],
                        timestamp: new Date(),
                    };
                    return [4, interaction.createMessage({ embeds: [reward] })];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    }); },
};
