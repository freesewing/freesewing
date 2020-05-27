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

  points.origin = points.origin.shift(180, inch*6);
  points.lHem = points.lHem.shift(180,inch*6);

  paths.waistCurve = new Path()
  .move(points.origin)
  ._curve(points.waistCpcopy, points.rWaistcopy)
  

  points.leftDartC = paths.waistCurve
  .shiftAlong(options.waistDartPosition+ inch*6);
  points.leftDartR = paths.waistCurve
  .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + inch*6);
  points.leftDartL = paths.waistCurve
  .shiftAlong(options.waistDartPosition - options.frontDartWidth/2 + inch*6);
  points.leftDartPoint = points.leftDartC
  .shift(-90, options.frontLeftDartLength);

  
  
  //path
  
  paths.seam = new Path()
    .move(points.origin)
    .line(points.lHem)
    .line(points.slashstart)
    .curve(points.bottomRight,points.rHemcopy,points.rHemcopy)
    ._curve(points.cp2copy, points.rHipcopy)
    ._curve(points.cp1copy, points.rWaistcopy)
  
  
    
  paths.leftDart = new Path()
    .move(points.leftDartL)
    .line(points.leftDartPoint)
    .line(points.leftDartR)

  


//aline front
  points.slashendmirror = points.slashend.flipX();
  points.slashendmirror = points.slashendmirror.shift(180,6.5*inch);
  points.rHemcopymirror = points.rHemcopy.flipX();
  points.rHemcopymirror = points.rHemcopymirror.shift(180,6.5*inch);
  points.rHipcopymirror = points.rHipcopy.flipX();
  points.rHipcopymirror = points.rHipcopymirror.shift(180,6.5*inch);
  points.cp2copymirror = points.cp2copy.flipX();
  points.cp2copymirror = points.cp2copymirror.shift(180,6.5*inch);
  points.cp1copymirror = points.cp1copy.flipX();
  points.cp1copymirror = points.cp1copymirror.shift(180,6.5*inch);
  points.rWaistcopymirror = points.rWaistcopy.flipX();
  points.rWaistcopymirror = points.rWaistcopymirror.shift(180,6.5*inch);
  points.waistCpcopymirror = points.waistCpcopy.flipX();
  points.waistCpcopymirror = points.waistCpcopymirror.shift(180,6.5*inch);
  points.originmirror = points.origin.shift(180,0.5*inch);
  points.lHemmirror = points.lHem.shift(180,0.5*inch);
  points.slashstartmirror = points.slashstart.flipX();
  points.slashstartmirror = points.slashstartmirror.shift(180,6.5*inch);
  points.bottomRightmirror = points.bottomRight.flipX();
  points.bottomRightmirror = points.bottomRightmirror.shift(180,6.5*inch);

  paths.waistCurvem = new Path()
  .move(points.originmirror)
  ._curve(points.waistCpcopymirror, points.rWaistcopymirror)
  

  points.leftDartCm = paths.waistCurvem
  .shiftAlong(options.waistDartPosition);
  points.leftDartRm = paths.waistCurvem
  .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 );
  points.leftDartLm = paths.waistCurvem
  .shiftAlong(options.waistDartPosition - options.frontDartWidth/2 );
  points.leftDartPointm = points.leftDartCm
  .shift(-90, options.frontLeftDartLength);

  
  
  //path
  
  paths.seamm = new Path()
    .move(points.originmirror)
    .line(points.lHemmirror)
    .line(points.slashstartmirror)
    .curve(points.bottomRightmirror,points.rHemcopymirror,points.rHemcopymirror)
    ._curve(points.cp2copymirror, points.rHipcopymirror)
    ._curve(points.cp1copymirror, points.rWaistcopymirror)
  
  
    
  paths.leftDartm = new Path()
    .move(points.leftDartLm)
    .line(points.leftDartPointm)
    .line(points.leftDartRm)








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