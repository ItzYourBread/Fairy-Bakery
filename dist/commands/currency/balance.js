"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var profile_1 = require("../../database/models/profile");
var index_1 = require("../../structures/index");
exports.default = {
    data: {
        name: 'balance',
        description: 'Cash!!!',
        options: [
            {
                name: 'user',
                type: eris_1.Constants.ApplicationCommandOptionTypes.USER,
                description: 'Select a user',
                required: false,
            },
        ],
    },
    run: function (client, interaction) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var user_id, user, Data;
        return tslib_1.__generator(this, function (_a) {
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
                    return [4, interaction.createMessage({
                            content: "**".concat(user.username, "** has ").concat(index_1.config.emoji.cash, "`").concat(Data.cash.toLocaleString(), "` cash "),
                        })];
                case 3:
                    _a.sent();
                    return [2];
            }
        });
    }); },
};
