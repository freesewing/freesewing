'use strict';

var _freesewing = require('freesewing');

var _freesewing2 = _interopRequireDefault(_freesewing);

var _config = require('../config/config');

var patternConfig = _interopRequireWildcard(_config);

var _back = require('./back');

var _back2 = _interopRequireDefault(_back);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var brian = new _freesewing2.default.pattern(patternConfig);

brian.draft = function () {
  _back2.default.draft(brian.parts.back, brian.context);

  return brian;
};

module.exports = brian;