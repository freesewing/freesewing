export default function(part) {
  let { sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  // Back vent(s)
  let ventY = points.cbHips.y - points.cbWaistCp2.dy(points.cbHips) * options.backVentLength;
  if (options.backVent === 1) { // Single back vent
    // Vent tip
    points.ventStart = utils.curveIntersectsY(
      points.cbHips,
      points.cbHipsCp1,
      points.cbWaistCp2,
      points.cbWaist,
      ventY
    );
    paths.ventBase = new Path()
      .move(points.cbWaist)
      .curve(points.cbWaistCp2, points.cbHipsCp1, points.cbHips)
      .split(points.ventStart)
      .pop()
      .line(points.cbHem);
    paths.vent = paths.ventBase.offset(measurements.neckCircumference / 10);
    paths.vent.render = false;
    points.ventSlopeStart = utils.lineIntersectsCurve(
      paths.vent.start(),
      paths.vent.start().shift(10, measurements.neckCircumference / 5),
      points.cbHips,
      points.cbHipsCp1,
      points.cbWaistCp2,
      points.cbWaist
    );
  } else if (options.backVent === 2) { // Double back vent
    // Vent tip
    points.ventStart = utils.curveIntersectsY(
      points.hips,
      points.hipsCp2,
      points.waistCp1,
      points.waist,
      ventY
    );
    paths.ventBase = new Path()
      .move(points.waist)
      .curve(points.waistCp1, points.hipsCp2, points.hips)
      .split(points.ventStart)
      .pop()
      .line(points.hem);
    paths.vent = paths.ventBase.offset(measurements.neckCircumference / -10);
    paths.vent.render = false;
    points.ventSlopeStart = utils.lineIntersectsCurve(
      paths.vent.start(),
      paths.vent.start().shift(170, measurements.neckCircumference / 5),
      points.hips,
      points.hipsCp2,
      points.waistCp1,
      points.waist
    );
  }

  // Store shoulder slope
  store.set("shoulderSlope", Math.abs(points.neck.angle(points.shoulder)-360));

  // Clean up - Remove this to understand what's going on
  for (let i of Object.keys(paths))
    if(i !== "vent") delete paths[i];
  for (let i of Object.keys(snippets)) delete snippets[i];

  // Paths
  if (options.backVent === 2) {
    paths.saBase = paths.vent
      .clone()
      .reverse()
      .line(points.ventSlopeStart)
      .join(new Path()
        .move(points.hips)
        .curve(points.hipsCp2, points.waistCp1, points.waist)
        .split(points.ventSlopeStart)
        .pop()
      )
    paths.saBase.render = true;
  } else {
    paths.saBase = new Path()
      .move(points.hem)
      .line(points.hips)
      .curve(points.hipsCp2, points.waistCp1, points.waist)
  }
  paths.saBase
    .curve(points.waistCp2, points.bsArmholeHollowCp2, points.bsArmholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve_(points.neckCp2, points.cbNeck);
  if (options.centerBackDart > 0) paths.saBase = paths.saBase._curve(points.cbChestCp1, points.cbChest);
  else paths.saBase = paths.saBase.line(points.cbChest);
  paths.saBase = paths.saBase.curve(points.cbChestCp2, points.cbWaistCp1, points.cbWaist);
  if (options.backVent === 1) {
    paths.saBase = paths.saBase
      .join(
        new Path()
          .move(points.cbWaist)
          .curve(points.cbWaistCp2, points.cbHipsCp1, points.cbHips)
          .line(points.cbHem)
          .split(points.ventSlopeStart)
          .shift()
      )
      .line(paths.vent.start())
      .join(paths.vent)
  } else {
    paths.saBase
      .curve(points.cbWaistCp2, points.cbHipsCp1, points.cbHips)
      .line(points.cbHem);
  }
  paths.saBase.render = false;

  if (options.backVent === 2) paths.hemBase = new Path().move(points.cbHem).line(paths.vent.end());
  else if (options.backVent === 1) paths.hemBase = new Path().move(paths.vent.end()).line(points.hem);
  else paths.hemBase = new Path().move(points.cbHem).line(points.hem);
  paths.hemBase.render = false;

  paths.seam = paths.saBase.join(paths.hemBase).attr("class", "fabric");

  if (complete) {

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hemBase.offset(sa * 3))
        .close()
        .attr("class", "fabric sa");
    }
  }

  return part;
}
