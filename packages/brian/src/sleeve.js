import freesewing from "freesewing";

/** Calculates the differece between actual and optimal sleevecap length
 * Positive values mean sleevecap is longer than armhole
 */
function sleevecapDelta(store) {
  return store.get("sleevecapLength") - store.get("sleevecapTarget");
}

function sleevecapAdjust(store) {
  let delta = sleevecapDelta(store);
  let factor = store.get("sleeveFactor");
  if (delta > 0) factor = factor * 0.98;
  else factor = factor * 1.02;
  store.set("sleeveFactor", factor);
}

function draftSleevecap(part, run) {
  // prettier-ignore
  let {debug, units, store, measurements, options, Point, points, Path, paths} = part.shorthand();
  // Sleeve center axis
  points.centerBiceps = new Point(0, 0);
  points.centerCap = points.centerBiceps.shift(
    90,
    measurements.bicepsCircumference *
      (1 + options.bicepsEase) *
      options.armholeDepthFactor *
      store.get("sleeveFactor")
  );

  // Left and right biceps points, limit impact of sleeveFactor to 25%
  let halfWidth =
    (measurements.bicepsCircumference * (1 + options.bicepsEase)) / 2;
  points.bicepsLeft = points.centerBiceps.shift(
    180,
    halfWidth * options.sleeveWidthGuarantee +
      halfWidth * (1 - options.sleeveWidthGuarantee) * store.get("sleeveFactor")
  );
  points.bicepsRight = points.bicepsLeft.flipX(points.centerBiceps);

  // Pitch points
  let width = points.bicepsRight.x;
  let height = points.centerCap.y;
  points.backPitch = new Point(
    -1 * width * options.sleevecapBackFactorX,
    height * options.sleevecapBackFactorY
  );
  points.frontPitch = new Point(
    width * options.sleevecapFrontFactorX,
    height * options.sleevecapFrontFactorY
  );

  // 4 sleevecap quadrants
  // Base points
  points.capQ1Base = points.frontPitch.shiftFractionTowards(
    points.bicepsRight,
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
    points.bicepsLeft,
    0.5
  );
  // Offset points
  let baseOffset = measurements.bicepsCircumference * (1 + options.bicepsEase);
  points.capQ1 = points.capQ1Base.shift(
    points.bicepsRight.angle(points.frontPitch) + 90,
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
    points.bicepsLeft.angle(points.backPitch) - 90,
    baseOffset * options.sleevecapQ4Offset
  );
  // Control points
  points.capQ1Cp1 = points.capQ1.shift(
    points.frontPitch.angle(points.bicepsRight),
    baseOffset * options.sleevecapQ1Spread1
  );
  points.capQ1Cp2 = points.capQ1.shift(
    points.frontPitch.angle(points.bicepsRight),
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
    points.bicepsLeft.angle(points.backPitch),
    baseOffset * options.sleevecapQ4Spread1
  );
  points.capQ4Cp2 = points.capQ4.shift(
    points.bicepsLeft.angle(points.backPitch),
    baseOffset * options.sleevecapQ4Spread2 * -1
  );

  // Sleevecap seamline
  paths.sleevecap = new Path()
    .move(points.bicepsRight)
    .curve(points.bicepsRight, points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve(points.capQ4Cp2, points.bicepsLeft, points.bicepsLeft);

  // Store sleevecap length
  store.set("sleevecapLength", paths.sleevecap.length());
  if (run === 1) {
    let armholeLength =
      store.get("frontArmholeLength") + store.get("backArmholeLength");
    let sleevecapEase = armholeLength * options.sleevecapEase;
    store.set("sleevecapEase", sleevecapEase);
    store.set("sleevecapTarget", armholeLength + sleevecapEase);
    debug("Sleevecap ease is", units(sleevecapEase));

    // Uncomment this line to see all sleevecap iterations
    //paths[run] = paths.sleevecap;
  }
}

var sleeve = {
  draft: function(part) {
    // prettier-ignore
    let {debug, store, units, sa, measurements, options, Point, points, Path, paths, Snippet, snippets, final, paperless, macro} = part.shorthand();

    store.set("sleeveFactor", 1);
    let run = 1;
    do {
      draftSleevecap(part, run);
      debug(
        `Sleevecap draft ${run}, sleevecap delta is ${units(
          sleevecapDelta(store)
        )}`
      );
      sleevecapAdjust(store);
      run++;
    } while (Math.abs(sleevecapDelta(store)) > 2 && run < 100);

    // Wrist
    let top = paths.sleevecap.bbox().topLeft.y;
    debug("Sleevecap height is ", units(Math.abs(top)));
    debug("Sleeve width is ", units(points.bicepsRight.x * 2));
    points.centerWrist = new Point(
      0,
      top + measurements.shoulderToWrist * (1 + options.sleeveLengthBonus)
    );
    points.wristRight = points.centerWrist.shift(
      0,
      (measurements.wristCircumference * (1 + options.cuffEase)) / 2
    );
    points.wristLeft = points.wristRight.rotate(180, points.centerWrist);

    // Paths
    paths.sleevecap.render = false;
    paths.seam = new Path()
      .move(points.bicepsLeft)
      .move(points.wristLeft)
      .move(points.wristRight)
      .line(points.bicepsRight)
      .join(paths.sleevecap)
      .close()
      .attr("class", "fabric");

    // Anchor point for sampling
    points.gridAnchor = points.origin;
    points.test = new Point(10, 10);

    // Final?
    if (final) {
      points.logo = points.centerBiceps.shiftFractionTowards(
        points.centerWrist,
        0.3
      );
      snippets.logo = new Snippet("logo", points.logo);
      macro("title", { at: points.centerBiceps, nr: 3, title: "sleeve" });
      macro("grainline", { from: points.centerWrist, to: points.centerBiceps });

      points.sleeveTip = paths.sleevecap.shiftFractionAlong(0.5);
      points.frontNotch = paths.sleevecap.shiftAlong(
        paths.sleevecap.length() / 2 -
          store.get("frontShoulderToArmholePitch") -
          store.get("sleevecapEase") / 2
      );
      points.backNotch = paths.sleevecap.shiftAlong(
        paths.sleevecap.length() / 2 +
          store.get("backShoulderToArmholePitch") +
          store.get("sleevecapEase") / 2
      );
      snippets.frontNotch = new Snippet("notch", points.frontNotch);
      snippets.backNotch = new Snippet("bnotch", points.backNotch);
      if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }

    // Paperless?
    if (paperless) {
      macro("vd", {
        from: points.wristLeft,
        to: points.bicepsLeft,
        x: points.bicepsLeft.x - sa - 15
      });
      macro("vd", {
        from: points.wristLeft,
        to: points.sleeveTip,
        x: points.bicepsLeft.x - sa - 30
      });
      macro("hd", {
        from: points.bicepsLeft,
        to: points.bicepsRight,
        y: points.sleeveTip.y - sa - 30
      });
      macro("pd", {
        path: paths.sleevecap.reverse(),
        d: -1 * sa - 15
      });
    }
    return part;
  }
};

export default sleeve;
