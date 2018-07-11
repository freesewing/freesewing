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
var models_1 = require("@freesewing/models");
/** This would come in from whoever is consuming this module */
var config = {
    mode: 'draft',
    units: 'metric',
    measurements: models_1.manSize40,
    sa: 10,
    theme: 'default'
};
var brian = new freesewing_1.default.pattern(patternConfig);
var back = brian.parts.backBlock;
brian.draft = function (config) {
    back.draft(config, brian);
};
back.draft = function (config, pattern) {
    back.points.cbNeck = new freesewing_1.default.point(0, pattern.o('backNeckCutout'));
    back.points.cbArmhole = new freesewing_1.default.point(0, back.points.cbNeck.y + (models_1.manSize40.shoulderSlope - pattern.o('shoulderSlopeReduction')) / 2);
    console.log(back.points);
};
// Calling this here for now so we see something happening
brian.draft(config);
exports.default = brian;
