export default function(part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
    const inch = 25.4;

//importing basic back

  // Design pattern here
  points.origin = new Point(0, 0);
  points.lHem = points.origin.translate(-(measurements.backHipArc + options.manipulateHem ), measurements.length);
  points.rHem = points.origin.shift(-90, measurements.length);
  points.lHip = points.origin.translate(-measurements.backHipArc, options.naturalWaistToHip);
  points.lWaist = points.origin.translate(-(measurements.backWaistArc / 2 + options.backDartWidth*2), -(1/2) * inch);
  points.waistCp = points.lWaist.shift(-195, points.origin.dx(points.lWaist) / 3);
  points.cp1 = points.lHip.shift(90, -points.lHip.dy(points.origin) / 2);
  points.cp2 = points.lHip.shift(-90, points.lHip.dy(points.lHem) / 2.5);
  points.topLeft = points.origin.shift(180, measurements.backHipArc);
  points.bottomLeft = points.topLeft.shift(-90, measurements.length);

  paths.waistCurve = new Path()
  .move(points.origin)
  ._curve(points.waistCp, points.lWaist)
  .setRender(false);

  // Dart Points
  points.rightDartC = paths.waistCurve
    .shiftAlong(options.waistDartPosition);
  points.rightDartL = paths.waistCurve
    .shiftAlong(options.waistDartPosition + options.backDartWidth/2);
  points.rightDartR = paths.waistCurve
    .shiftAlong(options.waistDartPosition - options.backDartWidth/2);
  points.rightDartPoint = points.rightDartC
    .shift(-90, options.backRightDartLength);
  points.leftDartR = paths.waistCurve
    .shiftAlong(options.waistDartPosition + options.backDartWidth/2 + options.dartGap);
  points.leftDartL = paths.waistCurve
    .shiftAlong(options.waistDartPosition + options.backDartWidth/2 + options.dartGap + options.backDartWidth);
  points.leftDartC = paths.waistCurve
    .shiftAlong(options.waistDartPosition + options.backDartWidth/2 + options.dartGap + options.backDartWidth/2);
  points.leftDartPoint = points.leftDartC
    .shift(-91, options.backLeftDartLength);

//aline

  //copyting points
  points.slashstart = new Point(-points.leftDartPoint.dx(points.origin),measurements.length);
  points.lHemcopy = points.lHem.copy();
  points.lHipcopy = points.lHip.copy();
  points.cp2copy = points.lHipcopy.shift(-90, points.lHipcopy.dy(points.lHem) / 2.5);
  points.cp1copy = points.lHipcopy.shift(90, -points.lHipcopy.dy(points.origin) / 2);
  points.lWaistcopy = points.lWaist.copy();
  points.waistCpcopy = points.lWaistcopy.shift(-195, points.origin.dx(points.lWaistcopy) / 3);
  points.slashend = points.slashstart.copy();

  points.rotationcenter = points.leftDartPoint.shift(-90,inch*(1/8));
  let rotationangle = points.leftDartPoint.angle(points.leftDartL) - points.rightDartPoint.angle(points.leftDartR);

  //rotating
  points.slashend = points.slashend.rotate(rotationangle,points.rotationcenter);
  points.lHemcopy = points.lHemcopy.rotate(rotationangle,points.rotationcenter);
  points.lHipcopy = points.lHipcopy.rotate(rotationangle,points.rotationcenter);
  points.cp2copy = points.cp2copy.rotate(rotationangle,points.rotationcenter);
  points.cp1copy = points.cp1copy.rotate(rotationangle,points.rotationcenter);
  points.lWaistcopy = points.lWaistcopy.rotate(rotationangle,points.rotationcenter);
  points.waistCpcopy = points.waistCpcopy.rotate(rotationangle,points.rotationcenter);

  //paths
  paths.seam = new Path()
    .move(points.origin)
    .line(points.rHem)
    .line(points.slashstart)
    .curve(points.bottomLeft,points.lHemcopy,points.lHemcopy)
    ._curve(points.cp2copy, points.lHipcopy)
    ._curve(points.cp1copy, points.lWaistcopy)

  paths.waistCurve = new Path()
    .move(points.origin)
    ._curve(points.waistCpcopy, points.lWaistcopy)

  points.rightDartC = paths.waistCurve
    .shiftAlong(options.waistDartPosition);
  points.rightDartL = paths.waistCurve
    .shiftAlong(options.waistDartPosition + options.backDartWidth/2);
  points.rightDartR = paths.waistCurve
    .shiftAlong(options.waistDartPosition - options.backDartWidth/2);
  points.rightDartPoint = points.rightDartC
    .shift(-90, options.backRightDartLength);
  

  paths.rightDart = new Path()
    .move(points.rightDartL)
    .line(points.rightDartPoint)
    .line(points.rightDartR)



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