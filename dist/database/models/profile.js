"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var tslib_1 = require("tslib");
var mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
var Profile = new mongoose_1.default.Schema({
    id: { type: String, unique: true, required: true },
    cash: { type: Number, default: 100 },
    bakeries: {
        biscuits: { type: Number, default: 0 },
    },
    resources: {
        wheats: { type: Number, default: 0 },
    },
});
var User = mongoose_1.default.model('Profile', Profile);
exports.User = User;
