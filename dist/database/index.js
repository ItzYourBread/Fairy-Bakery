"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodb = void 0;
var tslib_1 = require("tslib");
var mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
var chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
require("config/dotenv");
function mongodb() {
    mongoose_1.default
        .connect(process.env.DATABASE)
        .then(function () {
        console.log(chalk_1.default.greenBright('[Database] Connected'));
    })
        .catch(function (err) {
        console.log(chalk_1.default.red('[Database] ⚠️ Unable to connect to MongoDB Database.\nError: ' +
            err));
    });
}
exports.mongodb = mongodb;
