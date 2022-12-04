"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../structures/index");
var eris_1 = require("eris");
var eris_collector_1 = require("eris-collector");
exports.default = {
    data: {
        name: 'test',
        description: 'A test command to test some shit',
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var test, buttons, collector;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = {
                        title: 'Test Embed',
                        color: Number(index_1.config.colour.embed),
                        description: 'Test anything in here as your wish!',
                        timestamp: new Date(),
                    };
                    buttons = {
                        type: eris_1.Constants.ComponentTypes.ACTION_ROW,
                        components: [
                            {
                                label: 'Click me',
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.PRIMARY,
                                custom_id: 'clickme',
                                disabled: false,
                            },
                        ],
                    };
                    return [4, interaction.createMessage({
                            embeds: [test],
                            components: [buttons],
                        })];
                case 1:
                    _a.sent();
                    collector = new eris_collector_1.MessageCollector(client, interaction.channel, {
                        time: 1000 * 2,
                    });
                    collector.on('collect', function (i) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
                        return (0, tslib_1.__generator)(this, function (_a) {
                            if (i.data.custom_id === 'clickme') {
                                i.createMessage({
                                    content: 'works!!!',
                                });
                            }
                            return [2];
                        });
                    }); });
                    return [2];
            }
        });
    }); },
};
