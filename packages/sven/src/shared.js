export const frontBackShared = function(part) {
  let {
    store,
    measurements,
    options,
    points,
    paths,
    Path,
    sa,
    complete,
    paperless,
    macro
  } = part.shorthand();
  let front = true;
  if (typeof points.cfHem === "undefined") front = false;

  //  Waist shaping
  points.waist.x = (measurements.naturalWaist * (1 + options.waistEase)) / 4;
  points.hips.x = (measurements.hipsCircumference * (1 + options.hipsEase)) / 4;
  points.hem.x = points.hips.x;
  points.hipsCp2 = points.hips.shift(90, measurements.naturalWaistToHip / 3);
  points.waistCp1 = points.waist.shift(-90, measurements.naturalWaistToHip / 3);
  points.waistCp2 = points.waist.shift(
    90,
    measurements.centerBackNeckToWaist / 4
  );

  if (options.ribbing) {
    // Adapt lengtht for ribbing
    let ribbingHeight;
    if (typeof store.get("ribbingHeight") === "undefined") {
      ribbingHeight =
        (measurements.centerBackNeckToWaist + measurements.naturalWaistToHip) *
        options.ribbingHeight;
      store.set("ribbingHeight", ribbingHeight);
    } else ribbingHeight = store.get("ribbingHeight");
    points.hem = points.hem.shift(90, ribbingHeight);
    if (front) points.cfHem = points.cfHem.shift(90, ribbingHeight);
    else points.cbHem = points.cbHem.shift(90, ribbingHeight);
  }

  // Paths
  paths.saBase = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck);
  if (front)
    paths.saBase.curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck);
  else paths.saBase.curve_(points.neckCp2, points.cbNeck);
  if (front) paths.hemBase = new Path().move(points.cfHem).line(points.hem);
  else paths.hemBase = new Path().move(points.cbHem).line(points.hem);

  paths.saBase.render = false;
  paths.hemBase.render = false;

  paths.seam = paths.hemBase.join(paths.saBase);
  if (front) paths.seam.line(points.cfHem);
  else paths.seam.line(points.cbHem);
  paths.seam.attr("class", "fabric");

  // Seam allowance
  if (complete) {
    if (sa) {
      paths.sa = paths.hemBase.offset(sa * 3).join(paths.saBase.offset(sa));
      if (front) paths.sa.line(points.cfNeck).move(points.cfHem);
      else paths.sa.line(points.cbNeck).move(points.cbHem);
      paths.sa.line(paths.sa.start());
    }
  }

  // Paperless
  if (paperless) {
    macro("pd", {
      path: new Path()
        .move(points.armhole)
        .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
        .curve(
          points.armholeHollowCp2,
          points.armholePitchCp1,
          points.armholePitch
        )
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
      d: sa + 15
    });
    macro("pd", {
      path: new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
      d: -15
    });
    macro("vd", {
      from: points.hips,
      to: points.waist,
      x: points.hips.x + sa + 15
    });
    macro("vd", {
      from: points.hips,
      to: points.armhole,
      x: points.hips.x + sa + 30
    });
    macro("vd", {
      from: points.hips,
      to: points.armholePitch,
      x: points.hips.x + sa + 45
    });
    macro("vd", {
      from: points.hips,
      to: points.shoulder,
      x: points.hips.x + sa + 60
    });
    macro("vd", {
      from: points.hips,
      to: points.neck,
      x: points.hips.x + sa + 75
    });
    macro("ld", { from: points.neck, to: points.shoulder, d: sa + 15 });
  }
};

export const draftRibbing = function(part, length) {
  let {
    store,
    measurements,
    options,
    points,
    paths,
    Path,
    Point,
    sa,
    complete,
    paperless,
    macro,
    units
  } = part.shorthand();
  if (typeof store.get("ribbingHeight") === "undefined") {
    store.set(
      "ribbingHeight",
      (measurements.centerBackNeckToWaist + measurements.naturalWaistToHip) *
        options.ribbingHeight
    );
  }
  let height = store.get("ribbingHeight");
  let gap = 25;
  let lead = 50;
  if (length < 125) lead = length / 3;

  points.topLeft = new Point(0, 0);
  points.topRight = new Point(height * 2, 0);
  points.leftGapStart = new Point(0, lead);
  points.rightGapEnd = new Point(points.topRight.x, lead);
  points.leftGapEnd = new Point(0, lead + gap);
  points.rightGapStart = new Point(points.topRight.x, lead + gap);
  points.bottomLeft = new Point(0, gap + 2 * lead);
  points.bottomRight = new Point(points.topRight.x, gap + 2 * lead);

  paths.seam = new Path()
    .move(points.rightGapEnd)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.leftGapStart)
    .move(points.leftGapEnd)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.rightGapStart)
    .attr("class", "fabric");

  paths.hint = new Path()
    .move(points.leftGapStart)
    .line(points.leftGapEnd)
    .move(points.rightGapStart)
    .line(points.rightGapEnd)
    .attr("class", "fabric dashed");

  if (complete) {
    points.title = new Point(
      points.bottomRight.x / 2,
      points.bottomRight.y / 2
    );
    if (sa) {
      paths.sa = new Path()
        .move(points.topLeft)
        .line(points.bottomLeft)
        .line(points.bottomRight)
        .line(points.topRight)
        .line(points.topLeft)
        .close()
        .offset(sa)
        .attr("class", "fabric sa");
    }
  }

  if (paperless) {
    macro("vd", {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
      text: units(length)
    });
    macro("hd", {
      from: points.topLeft,
      to: points.topRight,
      y: points.topRight.y - sa - 15
    });
  }
};
