import { calculateRatios } from "./shared";

export default function(part) {
  let { paperless, sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  calculateRatios(part);
  // Belt width
  let bw = measurements.centerBackNeckToWaist * options.beltWidth;
  store.set("beltWidth", bw);

  // Box pleat (bp)
  points.bpStart = new Point(0, points.armholePitch.y);
  points.bpTop = new Point(
    measurements.chestCircumference * options.backPleat * -1,
    points.armholePitch.y
  );
  points.bpBottom = new Point(
    points.bpTop.x,
    points.cbWaist.y - bw/2
  );
  points.bpTriangleEdge = points.bpStart.shift(0, points.bpTop.dx(points.bpStart)*0.6);
  points.bpTriangleTip = points.bpStart.shift(90, points.bpStart.dx(points.bpTriangleEdge));

  // Waist shaping
  points.waist = new Point(
    store.get("chest")/4 - store.get("waistReduction") / 8,
    points.bpBottom.y
  );
  points.waistCp2 = points.waist.shift(90, points.armhole.dy(points.waist)/3);
  points.cbWaist = new Point(0, points.bpBottom.y);

  // Dart
  points.dartCenter = points.cbWaist.shiftFractionTowards(points.waist, 0.4);
  points.dartTip = points.dartCenter.shift(90, points.armhole.dy(points.dartCenter)*0.85);
  points.dartRight = points.dartCenter.shift(0, store.get("waistReduction")/8);
  points.dartLeft = points.dartRight.flipX(points.dartCenter);
  points.dartLeftCp = points.dartLeft.shift(90, points.dartTip.dy(points.dartCenter)*0.6);
  points.dartRightCp = points.dartLeftCp.flipX(points.dartCenter);

  store.set("cbToDart", points.dartLeft.x);
  store.set("dartToSide", points.dartRight.dx(points.waist));

  // Back stay (bs)
  points.bsCp1 = points.bpStart.shiftFractionTowards(points.armholePitch, 0.5);
  points.bsCp2 = points.armhole.shiftFractionTowards(points.cbArmhole, 0.3);

  // Store collar length
  store.set(
    "backCollarLength",
    new Path()
      .move(points.cbNeck)
      ._curve(points.neckCp2, points.neck)
      .length()
  );

  // Clean up
  for (let i in paths) delete paths[i]
  for (let i in snippets) delete snippets[i]

  // Paths
  paths.seam = new Path()
    .move(points.cbNeck)
    .line(points.bpStart)
    .line(points.bpTop)
    .line(points.bpBottom)
    .line(points.dartLeft)
    .curve_(points.dartLeftCp, points.dartTip)
    ._curve(points.dartRightCp, points.dartRight)
    .line(points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve_(points.neckCp2, points.cbNeck)
    .close()
    .attr("class", "fabric");

  paths.backStay = new Path()
    .move(points.bpStart)
    .curve(points.bsCp1, points.bsCp2, points.armhole)
    .attr("class", "canvas lashed");

  if (complete) {
  }

  return part;
}
