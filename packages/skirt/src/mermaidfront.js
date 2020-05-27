export default function(part) {
  let { Point, points, Path, paths, measurements, options } = part.shorthand();
  const inch = 25.4;
  const shiftDistance = measurements.hemLine / 6;

  // Design pattern here
  points.origin = new Point(0, 0);
  points.rWaist = points.origin.translate(measurements.frontWaistArc / 2 + options.frontDartWidth , -(1/2) * inch);
  points.waistCp = points.rWaist.shift(195, points.origin.dx(points.rWaist) / 3);

  paths.waistCurve = new Path()
    .move(points.origin)
    ._curve(points.waistCp, points.rWaist)
    .attr("class","hidden")

  // Dart points
  let waistlength = paths.waistCurve.length()/2;
  points.leftDartC = paths.waistCurve
    .shiftAlong(waistlength);
  points.leftDartR = paths.waistCurve
    .shiftAlong(waistlength + options.frontDartWidth/2);
  points.leftDartL = paths.waistCurve
    .shiftAlong(waistlength - options.frontDartWidth/2);
  points.leftDartPoint = points.leftDartC
    .shift(-90, options.frontLeftDartLength);
  /*points.rightDartL = paths.waistCurve
    .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + options.dartGap);
  points.rightDartR = paths.waistCurve
    .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + options.dartGap + options.frontDartWidth);
  points.rightDartC = paths.waistCurve
    .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + options.dartGap + options.frontDartWidth/2);
  points.rightDartPoint = points.rightDartC
    .shift(-87, options.frontRightDartLength);*/
  
  points.leftDartR = points.leftDartR.shift(0, shiftDistance);
  points.leftMermaidLHip = points.origin.shift(-90, options.naturalWaistToHip);
  points.leftMermaidRHip = points.leftDartC.shift(-90, options.naturalWaistToHip);
  points.rightMermaidLHip = points.leftMermaidRHip.shift(0, shiftDistance);
  points.rightMermaidRHip = points.origin.translate(measurements.frontHipArc + shiftDistance, options.naturalWaistToHip);
  points.rightMermaidRHipCp = points.rightMermaidRHip.shift(90, options.naturalWaistToHip / 2);

  const leftMermaidHipHemDiff = points.leftMermaidLHip.dx(points.leftMermaidRHip);
  const rightMermaidHipHemDiff = points.rightMermaidLHip.dx(points.rightMermaidRHip);

  points.leftMermaidCpL = points.leftMermaidLHip.shift(-87, measurements.inseam/1.6);
  points.leftMermaidCpR = points.leftMermaidRHip.shift(-93, measurements.inseam/2);
  points.rightMermaidCpL = points.rightMermaidLHip.shift(-85, measurements.inseam/2);
  points.rightMermaidCpR = points.rightMermaidRHip.shift(-93, measurements.inseam/1.8);
  points.shiftedLeftDartPoint = points.leftDartPoint.shift(0, shiftDistance);
  points.shiftedLeftDartC = points.leftDartC.shift(0, shiftDistance);
  points.rWaist = points.rWaist.shift(0, shiftDistance);
  points.waistCp = points.waistCp.shift(0, shiftDistance);

  points.leftMermaidBottom = points.origin
    .translate(leftMermaidHipHemDiff / 2, measurements.inseam + options.inseamToGround);
  points.rightMermaidBottom = points.shiftedLeftDartC
    .translate(rightMermaidHipHemDiff / 2, measurements.inseam + options.inseamToGround);
  points.leftMermaidLHem = points.leftMermaidBottom
    .translate(-leftMermaidHipHemDiff, -0.1 * leftMermaidHipHemDiff);
  points.leftMermaidRHem = points.leftMermaidBottom
    .translate(leftMermaidHipHemDiff, -0.1 * leftMermaidHipHemDiff);
  points.rightMermaidLHem = points.rightMermaidBottom
    .translate(-rightMermaidHipHemDiff, -0.1 * rightMermaidHipHemDiff);
  points.rightMermaidRHem = points.rightMermaidBottom
    .translate(rightMermaidHipHemDiff, -0.1 * rightMermaidHipHemDiff);
  points.leftMermaidBottomCpL = points.leftMermaidBottom
    .shift(180, leftMermaidHipHemDiff / 1.5);
  points.leftMermaidBottomCpR = points.leftMermaidBottom
    .shift(0, leftMermaidHipHemDiff / 1.5);
  points.rightMermaidBottomCpL = points.rightMermaidBottom
    .shift(180, rightMermaidHipHemDiff / 1.5);
  points.rightMermaidBottomCpR = points.rightMermaidBottom
    .shift(0, rightMermaidHipHemDiff / 1.5);

  points.leftMermaidCut = points.leftDartPoint.shift(185, 0.1 * shiftDistance);
  points.rightMermaidCut = points.shiftedLeftDartPoint.shift(-5, 0.1 * shiftDistance);

  paths.waistCurve = new Path()
    .move(points.leftDartR)
    ._curve(points.waistCp, points.rWaist)
  
  paths.frontMermaid1 = new Path()
    .move(points.leftDartPoint)
    .line(points.leftDartL)
    .line(points.origin)
    .line(points.leftMermaidLHip)
    ._curve(points.leftMermaidCpL, points.leftMermaidLHem)
    ._curve(points.leftMermaidBottomCpL, points.leftMermaidBottom)
    ._curve(points.leftMermaidBottomCpR, points.leftMermaidRHem)
    ._curve(points.leftMermaidCpR, points.leftMermaidRHip)
    .line(points.leftDartPoint)
    .line(points.leftMermaidCut);

  paths.frontMermaid2 = new Path()
    .move(points.shiftedLeftDartPoint)
    .line(points.leftDartR)
    ._curve(points.waistCp, points.rWaist)
    ._curve(points.rightMermaidRHipCp, points.rightMermaidRHip)
    ._curve(points.rightMermaidCpR, points.rightMermaidRHem)
    ._curve(points.rightMermaidBottomCpR, points.rightMermaidBottom)
    ._curve(points.rightMermaidBottomCpL, points.rightMermaidLHem)
    ._curve(points.rightMermaidCpL, points.rightMermaidLHip)
    .line(points.shiftedLeftDartPoint)
    .line(points.rightMermaidCut);

  // Complete?
  if (complete) {
    if (sa) {
    }
    // Paperless?
    if (paperless) {
    }
  }
  return part;
}