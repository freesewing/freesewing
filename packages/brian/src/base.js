import freesewing from "freesewing";

var base = {
  draft: function(part) {
    part.render = false;

    // prettier-ignore
    let {measurements, options, store, points, snippets, Point, Snippet, utils, complete } = part.shorthand();

    store.set(
      "shoulderEase",
      (measurements.shoulderToShoulder * options.shoulderEase) / 2
    );

    // Center back (cb) vertical axis
    points.cbNeck = new Point(
      0,
      options.backNeckCutout * measurements.neckCircumference
    );
    points.cbShoulder = new Point(
      0,
      (measurements.shoulderSlope -
        measurements.shoulderToShoulder * options.shoulderSlopeReduction) /
        2
    );
    points.cbArmhole = new Point(
      0,
      points.cbShoulder.y +
        measurements.bicepsCircumference *
          (1 + options.bicepsEase) *
          options.armholeDepthFactor
    );
    points.cbWaist = new Point(
      0,
      measurements.centerBackNeckToWaist + options.backNeckCutout
    );
    points.cbHips = new Point(
      0,
      points.cbWaist.y +
        measurements.naturalWaistToHip +
        (measurements.centerBackNeckToWaist + measurements.naturalWaistToHip) *
          options.lengthBonus
    );

    // Side back (cb) vertical axis
    points.armhole = new Point(
      (measurements.chestCircumference * (1 + options.chestEase)) / 4,
      points.cbArmhole.y
    );
    points.waist = new Point(points.armhole.x, points.cbWaist.y);
    points.hips = new Point(points.armhole.x, points.cbHips.y);

    // Shoulder line
    points.neck = new Point(
      (measurements.neckCircumference * (1 + options.collarEase)) /
        options.collarFactor,
      0
    );
    points.shoulder = new Point(
      measurements.shoulderToShoulder / 2 + store.get("shoulderEase"),
      points.cbShoulder.y
    );

    // Armhhole
    points.armholePitch = new Point(
      (measurements.shoulderToShoulder * options.acrossBackFactor) / 2 +
        store.get("shoulderEase") / 2,
      points.shoulder.y + points.shoulder.dy(points.armhole) / 2
    );
    points._tmp1 = new Point(points.armholePitch.x, points.armhole.y);
    points._tmp2 = points._tmp1.shift(45, 10);
    points._tmp3 = utils.beamsIntersect(
      points._tmp1,
      points._tmp2,
      points.armhole,
      points.armholePitch
    );
    points.armholeHollow = points._tmp1.shiftFractionTowards(points._tmp3, 0.5);
    points.armholeCp2 = points.armhole.shift(
      180,
      points._tmp1.dx(points.armhole) / 4
    );
    points.armholeHollowCp1 = points.armholeHollow.shift(
      -45,
      points.armholeHollow.dy(points.armhole) / 2
    );
    points.armholeHollowCp2 = points.armholeHollow.shift(
      135,
      points.armholePitch.dx(points.armholeHollow)
    );
    points.armholePitchCp1 = points.armholePitch.shift(
      -90,
      points.armholePitch.dy(points.armholeHollow) / 2
    );
    points.armholePitchCp2 = points.armholePitch.shift(
      90,
      points.shoulder.dy(points.armholePitch) / 2
    );
    points.shoulderCp1 = points.shoulder
      .shiftTowards(points.neck, points.shoulder.dy(points.armholePitch) / 5)
      .rotate(90, points.shoulder);

    // Neck opening
    points._tmp4 = points.neck
      .shiftTowards(points.shoulder, 10)
      .rotate(-90, points.neck);
    points.neckCp2 = utils.beamIntersectsY(
      points.neck,
      points._tmp4,
      points.cbNeck.y
    );

    // Anchor point for sampling
    points.gridAnchor = points.cbHips;

    // Complete pattern?
    if (complete) {
      points.title = new Point(
        points.armholePitch.x / 2,
        points.armholePitch.y
      );
      points.logo = points.title.shift(-90, 100);
      snippets.logo = new Snippet("logo", points.logo);
    }

    return part;
  }
};

export default base;
