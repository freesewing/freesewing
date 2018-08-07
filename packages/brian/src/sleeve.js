import freesewing from "freesewing";

function sleevecapDelta(store) {
  // Positive values mean sleevecap is longer than armhole
  return (
    store.get("sleevecapLength") -
    (store.get("frontArmholeLength") + store.get("backArmholeLength"))
  );
}

function sleevecapAdjust(store) {
  let delta = sleevecapDelta(store);
  let factor = store.get("sleeveFactor");
  if (delta > 50) factor = factor * 0.95;
  else if (delta > 0) factor = factor * 0.995;
  else if (delta < 50) factor = factor * 1.05;
  else factor = factor * 1.005;
  store.set("sleeveFactor", factor);
}

function draftSleevecap(part) {
  // prettier-ignore
  let {debug, store, measurements, options, Point, points, Path, paths} = freesewing.utils.shorthand(part);
  // Sleeve center axis
  points.centerCap = new Point(0, 0);
  points.centerWrist = new Point(
    0,
    measurements.shoulderToWrist * (1 + options.sleeveLengthBonus)
  );
  points.centerBiceps = new Point(
    0,
    points.centerWrist.y -
      (measurements.bicepsCircumference * (1 + options.sleevecapHeightFactor)) /
        store.get("sleeveFactor")
  );

  // Left and right biceps points
  points.leftBiceps = points.centerBiceps.shift(
    180,
    ((measurements.bicepsCircumference * (1 + options.bicepsEase)) / 2) *
      store.get("sleeveFactor")
  );
  // Make sure we draft a sleeve that fits the biceps
  if (points.leftBiceps.x * -1 < measurements.bicepsCircumference / 1.95) {
    points.leftBiceps.x = measurements.bicepsCircumference / 1.95;
    part.debug("Warning: Forced sleeve to fit biceps");
  }
  points.rightBiceps = points.leftBiceps.flipX(points.centerBiceps);

  // Pitch points
  points.backPitch = new Point(
    points.leftBiceps.x * options.sleevecapBackFactorX,
    points.leftBiceps.y * options.sleevecapBackFactorY
  );
  points.frontPitch = new Point(
    points.rightBiceps.x * options.sleevecapFrontFactorX,
    points.rightBiceps.y * options.sleevecapFrontFactorY
  );

  // 4 sleevecap quadrants
  // Base points
  points.capQ1Base = points.frontPitch.shiftFractionTowards(
    points.rightBiceps,
    0.5
  );
  points.capQ2Base = points.frontPitch.shiftFractionTowards(
    points.centerCap,
    0.5
  );
  points.capQ3Base = points.backPitch.shiftFractionTowards(
    points.centerCap,
    0.5
  );
  points.capQ4Base = points.backPitch.shiftFractionTowards(
    points.leftBiceps,
    0.5
  );
  // Offset points
  let baseOffset = measurements.bicepsCircumference * (1 + options.bicepsEase);
  points.capQ1 = points.capQ1Base.shift(
    points.rightBiceps.angle(points.frontPitch) + 90,
    baseOffset * options.sleevecapQ1Offset
  );
  points.capQ2 = points.capQ2Base.shift(
    points.centerCap.angle(points.frontPitch) + 90,
    baseOffset * options.sleevecapQ2Offset
  );
  points.capQ3 = points.capQ3Base.shift(
    points.centerCap.angle(points.backPitch) - 90,
    baseOffset * options.sleevecapQ3Offset
  );
  points.capQ4 = points.capQ4Base.shift(
    points.leftBiceps.angle(points.backPitch) - 90,
    baseOffset * options.sleevecapQ4Offset
  );
  // Control points
  points.capQ1Cp1 = points.capQ1.shift(
    points.frontPitch.angle(points.rightBiceps),
    baseOffset * options.sleevecapQ1Spread1
  );
  points.capQ1Cp2 = points.capQ1.shift(
    points.frontPitch.angle(points.rightBiceps),
    baseOffset * options.sleevecapQ1Spread2 * -1
  );
  points.capQ2Cp1 = points.capQ2.shift(
    points.centerCap.angle(points.frontPitch),
    baseOffset * options.sleevecapQ2Spread1
  );
  points.capQ2Cp2 = points.capQ2.shift(
    points.centerCap.angle(points.frontPitch),
    baseOffset * options.sleevecapQ2Spread2 * -1
  );
  points.capQ3Cp1 = points.capQ3.shift(
    points.backPitch.angle(points.centerCap),
    baseOffset * options.sleevecapQ3Spread1
  );
  points.capQ3Cp2 = points.capQ3.shift(
    points.backPitch.angle(points.centerCap),
    baseOffset * options.sleevecapQ3Spread2 * -1
  );
  points.capQ4Cp1 = points.capQ4.shift(
    points.leftBiceps.angle(points.backPitch),
    baseOffset * options.sleevecapQ4Spread1
  );
  points.capQ4Cp2 = points.capQ4.shift(
    points.leftBiceps.angle(points.backPitch),
    baseOffset * options.sleevecapQ4Spread2 * -1
  );

  // Wrist
  points.wristRight = points.centerWrist.shift(
    0,
    (measurements.wristCircumference * (1 + options.cuffEase)) / 2
  );
  points.wristLeft = points.wristRight.rotate(180, points.centerWrist);

  // Seamline
  let sleevecap = new Path()
    .move(points.rightBiceps)
    .curve(points.rightBiceps, points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve(points.capQ4Cp2, points.leftBiceps, points.leftBiceps);

  paths.seam = new Path()
    .move(points.leftBiceps)
    .move(points.wristLeft)
    .move(points.wristRight)
    .line(points.rightBiceps)
    .join(sleevecap, true);

  // Store sleevecap length
  store.set("sleevecapLength", sleevecap.length());
}

var sleeve = {
  draft: function(pattern) {
    let part = new pattern.Part();

    // prettier-ignore
    let {debug, store, sa, measurements, options, Point, points, Path, paths, Snippet, snippets, final, paperless, macro} = freesewing.utils.shorthand(part);

    store.set("sleeveFactor", 1);
    let run = 1;
    do {
      draftSleevecap(part);
      part.debug(
        `Sleevecap draft ${run}, sleevecap delta is ${sleevecapDelta(store)}`
      );
      sleevecapAdjust(store);
      run++;
    } while (Math.abs(sleevecapDelta(store)) > 2 && run < 10);

    // Anchor point for sampling
    points.gridAnchor = points.origin;
    points.test = new Point(10, 10);

    // Final?
    if (final) {
      points.title = points.centerBiceps.shiftFractionTowards(
        points.centerWrist,
        0.3
      );
      macro("title", { at: points.title, nr: 3, title: "sleeve" });
      //snippets.armholePitchNotch = new Snippet("notch", points.armholePitch);
      //if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }

    // Paperless?
    if (paperless) {
      //shared.dimensions(macro, points, Path, sa);
    }
    return part;
  }
};

export default sleeve;
