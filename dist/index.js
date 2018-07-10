"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pattern_1 = __importDefault(require("./lib/pattern"));
var bezier_js_1 = __importDefault(require("bezier-js"));
var Freesewing = {
    version: '0.0.1',
    pattern: pattern_1.default,
    bezier: bezier_js_1.default
};
exports.default = Freesewing;
