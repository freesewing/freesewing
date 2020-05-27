export default function(part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
    const inch = 25.4;
  
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
    
    paths.seam = new Path()
      .move(points.origin)
      .line(points.lHem)
      .line(points.rHem)
      ._curve(points.cp2, points.rHip)
      ._curve(points.cp1, points.rWaist)
      
    paths.leftDart = new Path()
      .move(points.leftDartL)
      .line(points.leftDartPoint)
      .line(points.leftDartR)
  
    paths.rightDart = new Path()
      .move(points.rightDartL)
      .line(points.rightDartPoint)
      .line(points.rightDartR)

    
    // Godets
    points.godet = points.lHem.shift(90, options.godetLength);
    for (let i = 1; 1 ; i++) {
        let distance = (i-1) * (options.godetWidth + options.frontGodetGap);
        if(distance > points.rHem.x) break;
        points[`godet${i}Top`] = points.godet.shift(0, distance);
        if(points[`godet${i}Top`].x >= 0 && points[`godet${i}Top`].x < points.rHem.x) {
            points[`godet${i}Right`] = points[`godet${i}Top`].translate(options.godetWidth / 2, options.godetLength);
            points[`godet${i}RightTop`] = points[`godet${i}Right`].shift(90, 0.8 * options.godetLength);
            points[`godet${i}TopRcp`] = points[`godet${i}Right`].shift(90, options.godetLength);
            paths[`godet${i}Right`] = new Path()
                .move(points[`godet${i}Top`])
                ._curve(points[`godet${i}TopRcp`], points[`godet${i}RightTop`])
                .line(points[`godet${i}Right`]);
        }
        if(points[`godet${i}Top`].x <= points.rHem.x && points[`godet${i}Top`].x > 0) {
            points[`godet${i}Left`] = points[`godet${i}Top`].translate(-options.godetWidth / 2, options.godetLength);
            points[`godet${i}LeftTop`] = points[`godet${i}Left`].shift(90, 0.8 * options.godetLength);
            points[`godet${i}TopLcp`] = points[`godet${i}Left`].shift(90, options.godetLength);
            paths[`godet${i}Left`] = new Path()
                .move(points[`godet${i}Top`])
                ._curve(points[`godet${i}TopLcp`], points[`godet${i}LeftTop`])
                .line(points[`godet${i}Left`]);
        }
    }
  
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