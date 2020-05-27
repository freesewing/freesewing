export default function(part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
    const inch = 25.4;

//importing basic skirt

// Design pattern here
points.origin = new Point(0, 0);
points.rHem = points.origin.translate(measurements.frontHipArc + options.manipulateHem , measurements.length);
points.lHem = points.origin.shift(-90, measurements.length);
points.rHip = points.origin.translate(measurements.frontHipArc, options.naturalWaistToHip);
points.rWaist = points.origin.translate(measurements.frontWaistArc / 2 + options.frontDartWidth*2 , -(1/2) * inch);
points.waistCp = points.rWaist.shift(195, points.origin.dx(points.rWaist) / 3);
points.cp1 = points.rHip.shift(90, -points.rHip.dy(points.origin) / 2);
points.cp2 = points.rHip.shift(-90, points.rHip.dy(points.rHem) / 2.5);
points.topRight = points.origin.shift(0, measurements.frontHipArc);
points.bottomRight = points.topRight.shift(-90, measurements.length);

paths.waistCurve = new Path()
    .move(points.origin)
    ._curve(points.waistCp, points.rWaist)
    .setRender(false);

// Dart points
points.leftDartC = paths.waistCurve
  .shiftAlong(options.waistDartPosition);
points.leftDartR = paths.waistCurve
  .shiftAlong(options.waistDartPosition + options.frontDartWidth/2);
points.leftDartL = paths.waistCurve
  .shiftAlong(options.waistDartPosition - options.frontDartWidth/2);
points.leftDartPoint = points.leftDartC
  .shift(-90, options.frontLeftDartLength);
points.rightDartL = paths.waistCurve
  .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + options.dartGap);
points.rightDartR = paths.waistCurve
  .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + options.dartGap + options.frontDartWidth);
points.rightDartC = paths.waistCurve
  .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + options.dartGap + options.frontDartWidth/2);
points.rightDartPoint = points.rightDartC
  .shift(-87, options.frontRightDartLength);

//aline

  //copyting points
  points.slashstart = new Point(-points.rightDartPoint.dx(points.origin),measurements.length);
  points.rHemcopy = points.rHem.copy();
  points.rHipcopy = points.rHip.copy();
  points.cp2copy = points.rHipcopy.shift(-90, points.rHipcopy.dy(points.rHem) / 2.5);
  points.cp1copy = points.rHipcopy.shift(90, -points.rHipcopy.dy(points.origin) / 2);
  points.rWaistcopy = points.rWaist.copy();
  points.waistCpcopy = points.rWaist.shift(195, points.origin.dx(points.rWaistcopy) / 3);
  points.slashend = points.slashstart.copy();

  points.rotationcenter = points.rightDartPoint.shift(-90,inch*(1/8));
  let rotationangle = points.rightDartPoint.angle(points.rightDartL) - points.rightDartPoint.angle(points.rightDartR);

  //rotating
  points.slashend = points.slashend.rotate(rotationangle,points.rotationcenter);
  points.rHemcopy = points.rHemcopy.rotate(rotationangle,points.rotationcenter);
  points.rHipcopy = points.rHipcopy.rotate(rotationangle,points.rotationcenter);
  points.cp2copy = points.cp2copy.rotate(rotationangle,points.rotationcenter);
  points.cp1copy = points.cp1copy.rotate(rotationangle,points.rotationcenter);
  points.rWaistcopy = points.rWaistcopy.rotate(rotationangle,points.rotationcenter);
  points.waistCpcopy = points.waistCpcopy.rotate(rotationangle,points.rotationcenter);
  
  //path
  
  paths.seam = new Path()
    .move(points.origin)
    .line(points.lHem)
    .line(points.slashstart)
    .curve(points.bottomRight,points.rHemcopy,points.rHemcopy)
    ._curve(points.cp2copy, points.rHipcopy)
    ._curve(points.cp1copy, points.rWaistcopy)
  
  paths.waistCurve = new Path()
  .move(points.origin)
  ._curve(points.waistCpcopy, points.rWaistcopy)

  points.leftDartC = paths.waistCurve
  .shiftAlong(options.waistDartPosition);
  points.leftDartR = paths.waistCurve
  .shiftAlong(options.waistDartPosition + options.frontDartWidth/2);
  points.leftDartL = paths.waistCurve
  .shiftAlong(options.waistDartPosition - options.frontDartWidth/2);
  points.leftDartPoint = points.leftDartC
  .shift(-90, options.frontLeftDartLength);
    
  paths.leftDart = new Path()
    .move(points.leftDartL)
    .line(points.leftDartPoint)
    .line(points.leftDartR)



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