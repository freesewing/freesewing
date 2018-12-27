import { calculateReduction } from "./shared";

export default part => {
  let {
    store,
    measurements,
    utils,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand();

  // TODO: Sleeve pleats

  // Sleeve width depends on cuff style
  let width =
    measurements.wristCircumference *
    (1 + options.cuffEase + options.cuffOverlap + options.cuffDrape);
  if (
    options.cuffStyle === "straightFrenchcuff" ||
    options.cuffStyle === "roundedFrenchcuff" ||
    options.cuffStyle === "angledFrenchCuff"
  )
    width =
      measurements.wristCircumference *
      (1 + options.cuffEase + options.cuffOverlap * 1.5);
  points.wristRight.x = width / 2;
  points.wristLeft.x = width / -2;
  let cuffLength = measurements.shoulderToWrist * options.cuffLength;
  points.wristRight = points.wristRight.shift(90, cuffLength);
  points.wristLeft = points.wristLeft.shift(90, cuffLength);

  points.cuffMid = new Point(0, points.wristLeft.y);
  points.cuffLeftMid = points.cuffMid.shiftFractionTowards(
    points.wristLeft,
    0.5
  );
  points.cuffRightMid = points.cuffMid.shiftFractionTowards(
    points.wristRight,
    0.5
  );
  points.cuffLeftCusp = points.cuffLeftMid.shift(90, width / 50);
  points.cuffRightCusp = points.cuffRightMid.shift(-90, width / 50);
  points.cuffLeftCuspCp1 = points.cuffLeftCusp.shift(180, width / 10);
  points.cuffLeftCuspCp2 = points.cuffLeftCusp.shift(0, width / 10);
  points.cuffRightCuspCp1 = points.cuffRightCusp.shift(180, width / 10);
  points.cuffRightCuspCp2 = points.cuffRightCusp.shift(0, width / 10);

  paths.frenchBase = new Path()
    .move(points.wristRight)
    .line(points.bicepsRight)
    ._curve(points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve_(points.capQ4Cp2, points.bicepsLeft);
  paths.frenchBase.render = false;

  paths.saBase = new Path().move(points.bicepsLeft).line(points.wristLeft);
  paths.saBase.render = false;

  paths.cuffBase = new Path()
    .move(points.wristLeft)
    ._curve(points.cuffLeftCuspCp1, points.cuffLeftCusp)
    .curve(
      points.cuffLeftCuspCp2,
      points.cuffRightCuspCp1,
      points.cuffRightCusp
    )
    .curve_(points.cuffRightCuspCp2, points.wristRight);
  paths.cuffBase.render = false;

  paths.seam = paths.frenchBase
    .clone()
    .line(points.wristLeft)
    .join(paths.cuffBase)
    .attr("class", "fabric");

  // Complete pattern?
  if (complete) {
    macro("title", { at: points.centerBiceps, nr: 5, title: "sleeve" });
    macro("grainline", { from: points.cuffMid, to: points.sleeveTip });

    if (sa) {
      paths.sa = paths.frenchBase
        .offset(sa * 2)
        .join(paths.saBase.offset(sa))
        .join(paths.cuffBase.offset(sa))
        .close()
        .attr("class", "fabric sa");
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};
