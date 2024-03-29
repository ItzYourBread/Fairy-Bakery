"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var tslib_1 = require("tslib");
var mongoose_1 = (0, tslib_1.__importStar)(require("mongoose"));
var Profile = new mongoose_1.Schema({
    id: { type: String, unique: true, required: true },
    coin: { type: Number, default: 100 },
    heart: { type: Number, default: 0 },
    daily: {
        time: { type: Date, default: new Date() },
        streak: { type: Number, default: 0 },
    },
    storage: {
        level: { type: Number, default: 1 },
        space: { type: Number, default: 2 },
    },
    stove: {
        first: {
            level: { type: Number, default: 1 },
            status: { type: Boolean, default: true },
            timer: { type: Number, default: 0 },
            date: { type: Date, default: new Date() },
            bakery: { type: String },
        },
    },
    bakeries: {
        miniBreads: { type: Number, default: 0 },
    },
    stocks: {
        milks: { type: Number, default: 0 },
        eggs: { type: Number, default: 0 },
        sugars: { type: Number, default: 0 },
        chocolates: { type: Number, default: 0 },
        creams: { type: Number, default: 0 },
    },
});
var User = mongoose_1.default.model('Profile', Profile);
exports.User = User;
