'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freesewing = require('freesewing');

var _freesewing2 = _interopRequireDefault(_freesewing);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var back = {
  draft: function draft(part, context) {
    var _F$utils$shorthand = _freesewing2.default.utils.shorthand(part, context),
        measurements = _F$utils$shorthand.measurements,
        options = _F$utils$shorthand.options,
        points = _F$utils$shorthand.points,
        paths = _F$utils$shorthand.paths,
        snippets = _F$utils$shorthand.snippets,
        macro = _F$utils$shorthand.macro,
        final = _F$utils$shorthand.final,
        paperless = _F$utils$shorthand.paperless;

    console.log('shorthand', _freesewing2.default.utils.shorthand(part, context));
    _base2.default.draft(part, context);

    paths.seam = new _freesewing2.default.path().move(points.cbNeck).line(points.cbHips).line(points.hips).line(points.armhole).curve(points.armholeCp1, points.armholeCp2, points.armholeHollow).curve(points.armholeHollowCp1, points.armholeHollowCp2, points.armholePitch).curve(points.armholePitchCp1, points.armholePitchCp2, points.shoulder).line(points.neck).curve(points.neckCp1, points.cbNeck, points.cbNeck).close();

    // Final?

    var decorate = function decorate(part, context) {
      macro('cof', {
        from: points.cbNeck,
        to: points.cbHips
      });
    };

    if (final) {
      decorate(part, context);
    }

    // Paperless?

    var gauge = function gauge(part, context) {};

    if (paperless) {
      gauge(part, context);
    }
  }
};

exports.default = back;