"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PRECISION = 2;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = +x.toFixed(PRECISION);
        this.y = +y.toFixed(PRECISION);
        return this;
    }
    return Point;
}());
exports.default = Point;
