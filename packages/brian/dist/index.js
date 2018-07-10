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
var back_1 = __importDefault(require("./lib/back"));
var brian = new freesewing_1.default.pattern(patternConfig);
brian.draft = function (config) {
    back_1.default.draft(config);
};
var config = {
    mode: 'draft',
    units: 'metric',
    measurements: models_1.manSize40,
    sa: 10,
    theme: 'default'
};
brian.draft(config);
