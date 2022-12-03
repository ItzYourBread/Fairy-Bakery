"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentCollector = exports.config = void 0;
var tslib_1 = require("tslib");
var config = (0, tslib_1.__importStar)(require("../config.json"));
exports.config = config;
var component_1 = require("./collectors/component");
Object.defineProperty(exports, "ComponentCollector", { enumerable: true, get: function () { return component_1.ComponentCollector; } });
