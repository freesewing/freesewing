"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = __importDefault(require("./point"));
var Part = /** @class */ (function () {
    function Part(id) {
        this.id = id;
        this.points = {};
        return this;
    }
    Part.prototype.newPoint = function (id, x, y) {
        this.points[id] = new point_1.default(x, y);
    };
    return Part;
}());
exports.default = Part;
