"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var freesewing_1 = __importDefault(require("freesewing"));
var patternConfig = __importStar(require("./config/config"));
var back_1 = __importDefault(require("./lib/back"));
var models_1 = require("@freesewing/models");
var brian = new freesewing_1.default.pattern(patternConfig);
brian.draft = function (final) {
    if (final === void 0) { final = true; }
    back_1.default.draft(brian, final);
    return brian;
};
exports.default = brian;
// This is not for inclusion in production
console.log(models_1.manSize38);
brian.settings.measurements = models_1.manSize38;
brian.draft();
console.log(brian.parts.backBlock.points);
