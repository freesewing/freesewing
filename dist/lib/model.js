"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var part_1 = __importDefault(require("./part"));
var option_1 = __importDefault(require("./option"));
var Pattern = /** @class */ (function () {
    function Pattern(config) {
        this.config = config;
        this.parts = {};
        for (var _i = 0, _a = config.parts; _i < _a.length; _i++) {
            var id = _a[_i];
            this.parts[id] = new part_1.default(id);
        }
        this.options = {};
        for (var _b = 0, _c = config.options; _b < _c.length; _b++) {
            var conf = _c[_b];
            this.options[conf.id] = new option_1.default(conf);
        }
        return this;
    }
    Pattern.prototype.draft = function (config) {
        throw Error('You have to implement the draft() method in your Pattern instance.');
    };
    Pattern.prototype.getOption = function (id) {
        return this.options[id].val;
    };
    Pattern.prototype.o = function (id) {
        return this.getOption(id);
    };
    return Pattern;
}());
exports.default = Pattern;
