"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentCollector = void 0;
var tslib_1 = require("tslib");
var events_1 = (0, tslib_1.__importDefault)(require("events"));
var ComponentCollectorDefaultOptions = {
    timeout: 10000,
    count: undefined,
    filter: function (interaction) { return true; },
};
var ComponentCollector = (function (_super) {
    (0, tslib_1.__extends)(ComponentCollector, _super);
    function ComponentCollector(channel, options) {
        var _this = _super.call(this) || this;
        _this.running = false;
        _this.collected = [];
        _this.start = function () {
            _this.running = true;
            return new Promise(function (resolve) {
                _this.channel.client.setMaxListeners(_this.getMaxListeners() + 1);
                _this.channel.client.on('interactionCreate', _this.onInteractionCreate);
                _this.setMaxListeners(_this.getMaxListeners() + 1);
                _this.on('collect', _this.onCollect);
                if (_this.timeout)
                    setTimeout(function () { return _this.stop(); }, _this.timeout);
                _this.once('stop', function () { return resolve(_this); });
            });
        };
        _this.stop = function () {
            _this.running = false;
            _this.channel.client.setMaxListeners(_this.getMaxListeners() - 1);
            _this.channel.client.off('interactionCreate', _this.onInteractionCreate);
            _this.setMaxListeners(_this.getMaxListeners() - 1);
            _this.off('collect', _this.onCollect);
            _this.emit('stop');
            return _this;
        };
        _this.onInteractionCreate = function (interaction) {
            if (!_this.running)
                return;
            if (_this.channel.id !== interaction.channel.id)
                return;
            if (!_this.filter(interaction))
                return;
            _this.emit('collect', interaction);
        };
        _this.onCollect = function (interaction) {
            _this.collected.push(interaction);
            if (_this.count && _this.collected.length === _this.count)
                _this.stop();
        };
        var opt = Object.assign(ComponentCollectorDefaultOptions, options);
        _this.channel = channel;
        _this.timeout = opt.timeout;
        _this.count = opt.count;
        _this.filter = opt.filter;
        return _this;
    }
    return ComponentCollector;
}(events_1.default));
exports.ComponentCollector = ComponentCollector;
