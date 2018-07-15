import F from 'freesewing'
import { DraftConfig } from './types'
import { Pattern } from 'freesewing/dist/lib/pattern'

var backBlock = {
  draft: function(pattern: Pattern, final: boolean = true) {

  // Save some typing
  let measurements = pattern.settings.measurements || {};
  let options = pattern.options;
  let values = pattern.values;
  let points = pattern.parts.backBlock.points;
  let paths = pattern.parts.backBlock.paths;

  // Center back (cb) vertical axis
  points.cbNeck     = new F.point(0, options.backNeckCutout);
  points.cbShoulder = new F.point(0, points.cbNeck.y + ( measurements.shoulderSlope - options.shoulderSlopeReduction ) / 2);
  points.cbArmhole  = new F.point(0, points.cbShoulder.y + (measurements.bicepsCircumference + options.bicepsEase) * options.armholeDepthFactor);
  points.cbWaist    = new F.point(0, measurements.centerBackNeckToWaist + options.backNeckCutout);
  points.cbHips     = new F.point(0, points.cbWaist.y + measurements.naturalWaistToHip);

  // Side back (cb) vertical axis
  points.armhole = new F.point(measurements.chestCircumference / 4 + options.chestEase / 4, points.cbArmhole.y);
  points.waist   = new F.point(points.armhole.x, points.cbWaist.y);
  points.hips    = new F.point(points.armhole.x, points.cbHips.y);

  // Shoulder line
  points.neck     = new F.point(measurements.neckCircumference / options.collarFactor, 0);
  points.shoulder = new F.point(measurements.shoulderToShoulder / 2 + options.shoulderEase / 2, points.cbShoulder.y);

  // Armhhole
  points.armholePitch = new F.point(measurements.shoulderToShoulder * options.acrossBackFactor / 2, points.armhole.y / 2 - points.shoulder.y / 2);
  points._tmp1 = new F.point(points.armholePitch.x, points.armhole.y);
  points._tmp2 = points._tmp1.shift(45, 10);
  points._tmp3 = F.utils.beamsCross(points._tmp1, points._tmp2, points.armhole, points.armholePitch);
  points.armholeHollow = points._tmp1.shiftFractionTowards(points._tmp3, 0.5);

  paths.test = new F.path()
    .move(points.cbNeck)
    .line(points.armhole)
    .line(points.cbHips)
    .line(points.hips)
    .curve(points.neck, points.shoulder, points.armholePitch)
  ;

  points.gridAnchor = points.cbHips;
  }
}

export default backBlock;
