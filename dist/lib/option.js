"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option = /** @class */ (function () {
    function Option(config) {
        this.id = config.id;
        this.config = config;
        this.val = config.val;
        return this;
    }
    return Option;
}());
exports.default = Option;
