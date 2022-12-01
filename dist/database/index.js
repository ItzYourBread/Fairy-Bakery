"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodb = void 0;
var tslib_1 = require("tslib");
var mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
var chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
var index_1 = require("../structures/index");
function mongodb() {
    mongoose_1.default
        .connect(index_1.config.database.mongoDB)
        .then(function () {
        console.log(chalk_1.default.greenBright('[Database] Connected'));
    })
        .catch(function (err) {
        console.log(chalk_1.default.red('[Database] ⚠️ Unable to connect to MongoDB Database.\nError: ' +
            err));
    });
}
exports.mongodb = mongodb;
