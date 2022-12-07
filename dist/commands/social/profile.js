"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eris_1 = require("eris");
var profile_1 = require("../../database/models/profile");
var index_1 = require("../../structures/index");
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
    run: function (client, interaction) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var user_id, user, Data, main, cooldown, menus, timer, collector;
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
                    main = {
                        title: "".concat(user.username, "'s Profile"),
                        color: Number(index_1.config.colour.embed),
                        description: "Bio: New Bakery User 2022!",
                        timestamp: new Date(),
                    };
                    cooldown = {
                        title: "".concat(user.username, "'s Cooldown"),
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
                    collector = function (caller) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (caller.member.id !== interaction.member.id) {
                                        return [2, caller.createMessage({
                                                content: "It's not for you!",
                                                flags: 64,
                                            })];
                                    }
                                    if (!(caller.data.component_type === 3 &&
                                        caller.data.custom_id === 'ProfileSelectMenus')) return [3, 2];
                                    return [4, caller.deferUpdate()];
                                case 1:
                                    _a.sent();
                                    switch (caller.data.values[0]) {
                                        case 'main':
                                            caller.editOriginalMessage({ embeds: [main] });
                                            break;
                                        case 'cooldown':
                                            caller.editOriginalMessage({ embeds: [cooldown] });
                                            break;
                                    }
                                    clearTimeout(timer);
                                    client.off('interaction', collector);
                                    _a.label = 2;
                                case 2: return [2];
                            }
                        });
                    }); };
                    client.on('interaction', collector);
                    timer = setTimeout(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    client.off('interaction', collector);
                                    return [4, interaction.editOriginalMessage({
                                            components: [],
                                        })];
                                case 1:
                                    _a.sent();
                                    console.log('Collector ended!');
                                    return [2];
                            }
                        });
                    }); }, 4000);
                    return [2];
            }
        });
    }); },
};
