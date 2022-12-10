"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var stubby_ts_1 = require("stubby.ts");
var profile_1 = require("../../database/models/profile");
var index_1 = require("../../structures/index");
var node_fetch_1 = (0, tslib_1.__importDefault)(require("node-fetch"));
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
        var user, Data_1, RestApi, Bakeries_1, storage;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.data.options[0].name === 'view')) return [3, 4];
                    user = interaction.member;
                    return [4, profile_1.User.findOne({ id: user.id })];
                case 1:
                    Data_1 = (_a.sent()) ||
                        new profile_1.User({ id: user.id });
                    return [4, (0, node_fetch_1.default)(index_1.config.service.api + "/json/inventory").then(function (r) { return r.json(); })];
                case 2:
                    RestApi = _a.sent();
                    Bakeries_1 = '';
                    RestApi.bakeries.map(function (e) {
                        if (Data_1.bakeries[e.value] && Data_1.bakeries[e.value] >= 1) {
                            Bakeries_1 += "" + index_1.config.emoji[e.emoji] + (0, stubby_ts_1.SmallNumber)(Data_1.bakeries[e.value], Data_1.bakeries[e.value].toString().length + 1) + "  ";
                        }
                    });
                    if (!Bakeries_1) {
                        Bakeries_1 = 'ᴇᴍᴘᴛʏ';
                    }
                    storage = {
                        title: user.username + "'s Storage",
                        color: Number(index_1.config.colour.embed),
                        description: Bakeries_1,
                        timestamp: new Date(),
                    };
                    return [4, interaction.createMessage({ embeds: [storage] })];
                case 3:
                    _a.sent();
                    Bakeries_1 = '';
                    return [3, 5];
                case 4:
                    if (interaction.data.options[0].name === 'upgrade') {
                        return [2, interaction.createMessage({
                                content: 'This command is under development!',
                            })];
                    }
                    _a.label = 5;
                case 5: return [2];
            }
        });
    }); },
};
