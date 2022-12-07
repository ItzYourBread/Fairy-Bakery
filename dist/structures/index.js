"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonPagination = exports.config = void 0;
var tslib_1 = require("tslib");
var config = (0, tslib_1.__importStar)(require("../config.json"));
exports.config = config;
var buttons_1 = require("./paginations/buttons");
Object.defineProperty(exports, "ButtonPagination", { enumerable: true, get: function () { return buttons_1.ButtonPagination; } });
