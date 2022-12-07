"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../structures/index");
exports.default = {
    data: {
        name: 'test',
        description: 'A test command to test some shit',
    },
    run: function (client, interaction) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var page1, page2, page3, page4, page5, page6, embeds;
        return (0, tslib_1.__generator)(this, function (_a) {
            page1 = { title: 'Hello!' };
            page2 = { title: 'How' };
            page3 = { title: 'Are' };
            page4 = { title: 'You' };
            page5 = { title: 'Doing' };
            page6 = { title: 'Today!' };
            embeds = [page1, page2, page3, page4, page5, page6];
            (0, index_1.ButtonPagination)(client, interaction, embeds);
            return [2];
        });
    }); },
};
