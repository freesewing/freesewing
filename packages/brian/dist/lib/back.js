'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freesewing = require('freesewing');

var _freesewing2 = _interopRequireDefault(_freesewing);

var _pattern = require('freesewing/dist/lib/pattern');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var backBlock = {
  draft: function draft(pattern) {
    var final = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


    // Save some typing
    var measurements = pattern.settings.measurements || {};
    var options = pattern.options;
    var values = pattern.values;
    var points = pattern.parts.backBlock.points;
    var paths = pattern.parts.backBlock.paths;

    // Center back (cb) vertical axis
    points.cbNeck = new _freesewing2.default.point(0, options.backNeckCutout);
    points.cbShoulder = new _freesewing2.default.point(0, points.cbNeck.y + (measurements.shoulderSlope - options.shoulderSlopeReduction) / 2);
    points.cbArmhole = new _freesewing2.default.point(0, points.cbShoulder.y + (measurements.bicepsCircumference + options.bicepsEase) * options.armholeDepthFactor);
    points.cbWaist = new _freesewing2.default.point(0, measurements.centerBackNeckToWaist + options.backNeckCutout);
    points.cbHips = new _freesewing2.default.point(0, points.cbWaist.y + measurements.naturalWaistToHip);

    // Side back (cb) vertical axis
    points.armhole = new _freesewing2.default.point(measurements.chestCircumference / 4 + options.chestEase / 4, points.cbArmhole.y);
    points.waist = new _freesewing2.default.point(points.armhole.x, points.cbWaist.y);
    points.hips = new _freesewing2.default.point(points.armhole.x, points.cbHips.y);

    // Shoulder line
    points.neck = new _freesewing2.default.point(measurements.neckCircumference / options.collarFactor, 0);
    points.shoulder = new _freesewing2.default.point(measurements.shoulderToShoulder / 2 + options.shoulderEase / 2, points.cbShoulder.y);

    // Armhhole
    points.armholePitch = new _freesewing2.default.point(measurements.shoulderToShoulder * options.acrossBackFactor / 2, points.armhole.y / 2 - points.shoulder.y / 2);
    points._tmp1 = new _freesewing2.default.point(points.armholePitch.x, points.armhole.y);
    points._tmp2 = points._tmp1.shift(45, 10);
    points._tmp3 = _freesewing2.default.utils.beamsCross(points._tmp1, points._tmp2, points.armhole, points.armholePitch);
    points.armholeHollow = points._tmp1.shiftFractionTowards(points._tmp3, 0.5);

    paths.test = new _freesewing2.default.path().move(points.cbNeck).line(points.armhole).line(points.cbHips).line(points.hips).curve(points.neck, points.shoulder, points.armholePitch);

    points.gridAnchor = points.cbHips;
  }
};

exports.default = backBlock;