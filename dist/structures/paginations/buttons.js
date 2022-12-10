"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonPagination = void 0;
var tslib_1 = require("tslib");
var eris_1 = require("eris");
function ButtonPagination(client, interaction, embeds, timeout) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        var allbuttons, currentPage, collector;
        var _this = this;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allbuttons = {
                        type: eris_1.Constants.ComponentTypes.ACTION_ROW,
                        components: [
                            {
                                label: '<<',
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.PRIMARY,
                                custom_id: '0',
                                disabled: false,
                            },
                            {
                                label: '<',
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.PRIMARY,
                                custom_id: '1',
                                disabled: false,
                            },
                            {
                                label: '>',
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.PRIMARY,
                                custom_id: '2',
                                disabled: false,
                            },
                            {
                                label: '>>',
                                type: eris_1.Constants.ComponentTypes.BUTTON,
                                style: eris_1.Constants.ButtonStyles.PRIMARY,
                                custom_id: '3',
                                disabled: false,
                            },
                        ],
                    };
                    if (embeds.length === 1) {
                        if (interaction.acknowledged) {
                            return [2, interaction.editOriginalMessage({
                                    embeds: [embeds[0]],
                                })];
                        }
                        else {
                            return [2, interaction.editOriginalMessage({
                                    embeds: [embeds[0]],
                                })];
                        }
                    }
                    if (!interaction.acknowledged) return [3, 2];
                    return [4, interaction.editOriginalMessage({
                            embeds: [embeds[0]],
                            components: [allbuttons],
                        })];
                case 1:
                    _a.sent();
                    return [3, 4];
                case 2: return [4, interaction.createMessage({
                        embeds: [embeds[0]],
                        components: [allbuttons],
                    })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    currentPage = 0;
                    collector = function (b) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                        var _a;
                        return (0, tslib_1.__generator)(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4, b.deferUpdate()];
                                case 1:
                                    _b.sent();
                                    _a = b.data.custom_id;
                                    switch (_a) {
                                        case '0': return [3, 2];
                                        case '1': return [3, 5];
                                        case '2': return [3, 10];
                                        case '3': return [3, 15];
                                    }
                                    return [3, 17];
                                case 2:
                                    if (!(currentPage != 0)) return [3, 4];
                                    currentPage = 0;
                                    return [4, b
                                            .editOriginalMessage({
                                            embeds: [embeds[currentPage]],
                                            components: [allbuttons],
                                        })
                                            .catch(function (e) { return null; })];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [3, 17];
                                case 5:
                                    if (!(currentPage != 0)) return [3, 7];
                                    currentPage -= 1;
                                    return [4, b
                                            .editOriginalMessage({
                                            embeds: [embeds[currentPage]],
                                            components: [allbuttons],
                                        })
                                            .catch(function (e) { return null; })];
                                case 6:
                                    _b.sent();
                                    return [3, 9];
                                case 7:
                                    currentPage = embeds.length - 1;
                                    return [4, b
                                            .editOriginalMessage({
                                            embeds: [embeds[currentPage]],
                                            components: [allbuttons],
                                        })
                                            .catch(function (e) { return null; })];
                                case 8:
                                    _b.sent();
                                    _b.label = 9;
                                case 9: return [3, 17];
                                case 10:
                                    if (!(currentPage < embeds.length - 1)) return [3, 12];
                                    currentPage++;
                                    return [4, b
                                            .editOriginalMessage({
                                            embeds: [embeds[currentPage]],
                                            components: [allbuttons],
                                        })
                                            .catch(function (e) { return null; })];
                                case 11:
                                    _b.sent();
                                    return [3, 14];
                                case 12:
                                    currentPage = 0;
                                    return [4, b
                                            .editOriginalMessage({
                                            embeds: [embeds[currentPage]],
                                            components: [allbuttons],
                                        })
                                            .catch(function (e) { return null; })];
                                case 13:
                                    _b.sent();
                                    _b.label = 14;
                                case 14: return [3, 17];
                                case 15:
                                    currentPage = embeds.length - 1;
                                    return [4, b
                                            .editOriginalMessage({
                                            embeds: [embeds[currentPage]],
                                            components: [allbuttons],
                                        })
                                            .catch(function (e) { return null; })];
                                case 16:
                                    _b.sent();
                                    return [3, 17];
                                case 17: return [2];
                            }
                        });
                    }); };
                    client.on('interactionCreate', collector);
                    setTimeout(function () { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                        return (0, tslib_1.__generator)(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    allbuttons.components.map(function (d) {
                                        d.disabled = true;
                                    });
                                    return [4, interaction.editOriginalMessage({ components: [allbuttons] })];
                                case 1:
                                    _a.sent();
                                    client.off('interactionCreate', collector);
                                    console.log('Collector ended!');
                                    return [2];
                            }
                        });
                    }); }, timeout);
                    return [2];
            }
        });
    });
}
exports.ButtonPagination = ButtonPagination;
