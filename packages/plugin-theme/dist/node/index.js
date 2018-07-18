'use strict';

var _header = require('./lib/header');

var _header2 = _interopRequireDefault(_header);

var _style = require('./lib/style');

var _style2 = _interopRequireDefault(_style);

var _markers = require('./lib/markers');

var _markers2 = _interopRequireDefault(_markers);

var _snippets = require('./lib/snippets');

var _snippets2 = _interopRequireDefault(_snippets);

var _logo = require('./lib/logo');

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  preRenderSvg: function preRenderSvg(next) {
    this.header = _header2.default;
    this.style = _style2.default;
    this.defs = _markers2.default + _snippets2.default + _logo2.default;
  }
};