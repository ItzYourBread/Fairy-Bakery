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
            page1 = { title: 'Hello!', footer: {} };
            page2 = { title: 'How', footer: {} };
            page3 = { title: 'Are', footer: {} };
            page4 = { title: 'You', footer: {} };
            page5 = { title: 'Doing', footer: {} };
            page6 = { title: 'Today!', footer: {} };
            embeds = [page1, page2, page3, page4, page5, page6];
            embeds.map(function (embed, index) {
                embed.footer = { text: "Pages: " + (index + 1) + "/" + embeds.length };
            });
            (0, index_1.ButtonPagination)(client, interaction, embeds, 15000);
            return [2];
        });
    }); },
};
