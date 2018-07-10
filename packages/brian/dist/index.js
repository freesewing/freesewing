"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var freesewing_1 = __importDefault(require("freesewing"));
var config_1 = __importDefault(require("./config/config"));
console.log(config_1.default);
var brian = new freesewing_1.default.pattern(config_1.default);
//brian.test('hello world');
//brian.draft = function(options: {}): void {
console.log(brian);
