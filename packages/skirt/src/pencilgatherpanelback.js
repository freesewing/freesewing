export default function(part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
    const inch = 25.4;
  
    // Design pattern here
    points.origin = new Point(0, 0);
    points.lHem = points.origin.translate(-(measurements.backHipArc + options.manipulateHem - (measurements.backHipArc - measurements.backWaistArc/2 - options.backDartWidth)*0.8 ), measurements.length);
    points.rHem = points.origin.shift(-90, measurements.length);
    points.lHip = points.origin.translate(-measurements.backHipArc, options.naturalWaistToHip);
    points.lWaist = points.origin.translate(-(measurements.backWaistArc / 2 + options.backDartWidth), -(1/2) * inch);
    points.waistCp = points.lWaist.shift(-195, points.origin.dx(points.lWaist) / 3);
    points.topLeft = points.origin.shift(180, measurements.backHipArc);
    points.bottomLeft = points.topLeft.shift(-90, measurements.length);
  
    paths.waistCurve = new Path()
    .move(points.origin)
    ._curve(points.waistCp, points.lWaist)
    .setRender(false);
    let waistlength = paths.waistCurve.length()/2;
  
    // Dart Points
    points.rightDartC = paths.waistCurve
      .shiftAlong(waistlength);
    points.rightDartL = paths.waistCurve
      .shiftAlong(waistlength + options.backDartWidth/2);
    points.rightDartR = paths.waistCurve
      .shiftAlong(waistlength - options.backDartWidth/2);
    points.rightDartPoint = points.rightDartC
      .shift(-90, options.backRightDartLength);
   
      //Dividing panels
    points.hemmid1 = new Point(points.origin.dx(points.rightDartPoint),points.origin.dy(points.rHem));
    points.rightDartPointnew = points.rightDartPoint.shift(0,-20);
    points.rightDartL = points.rightDartL.shift(0,-20);
    points.waistCp = points.waistCp.shift(0,-20);
    points.lWaist = points.lWaist.shift(0,-20);
    points.lHip = points.lHip.shift(0,-20);
    points.lHem = points.lHem.shift(0,-20);
    points.hemmid2 = points.hemmid1.shift(0,-20);
    
  
    paths.panel3 = new Path()
      .move(points.origin)
      .line(points.rHem)
      .line(points.hemmid1)
      .line(points.rightDartPoint)
      .line(points.rightDartR)
      .line(points.origin);
    
    paths.panel4 = new Path()
      .move(points.hemmid2)
      .line(points.lHem)
      .line(points.lHip)
      .line(points.lWaist)
      .curve_(points.waistCp,points.rightDartL)
      .line(points.rightDartPointnew)
      .line(points.hemmid2);
  
  

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