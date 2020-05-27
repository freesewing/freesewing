export default function(part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
    const inch = 25.4;
  
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
    
  
    paths.seam = new Path()
      .move(points.origin)
      .line(points.rHem)
      .line(points.lHem)
      ._curve(points.cp2, points.lHip)
      ._curve(points.cp1, points.lWaist)
  
    paths.leftDart = new Path()
      .move(points.leftDartL)
      .line(points.leftDartPoint)
      .line(points.leftDartR)
  
    paths.rightDart = new Path()
      .move(points.rightDartL)
      .line(points.rightDartPoint)
      .line(points.rightDartR)

    // Godets
    points.godet = points.rHem.shift(90, options.godetLength);
    for (let i = 1; 1 ; i++) {
        let distance = Math.floor((i-1) * (options.godetWidth + options.backGodetGap));
        if(distance > Math.abs(points.lHem.x)) break;
        points[`godet${i}Top`] = points.godet.shift(180, distance);
        if(points[`godet${i}Top`].x <= 0 && points[`godet${i}Top`].x > points.lHem.x) {
            points[`godet${i}Left`] = points[`godet${i}Top`].translate(-options.godetWidth / 2, options.godetLength);
            points[`godet${i}LeftTop`] = points[`godet${i}Left`].shift(90, 0.8 * options.godetLength);
            points[`godet${i}TopLcp`] = points[`godet${i}Left`].shift(90, options.godetLength);
            paths[`godet${i}Left`] = new Path()
                .move(points[`godet${i}Top`])
                ._curve(points[`godet${i}TopLcp`], points[`godet${i}LeftTop`])
                .line(points[`godet${i}Left`]);
        }
        if(points[`godet${i}Top`].x >= points.lHem.x && points[`godet${i}Top`].x < 0) {
            points[`godet${i}Right`] = points[`godet${i}Top`].translate(options.godetWidth / 2, options.godetLength);
            points[`godet${i}RightTop`] = points[`godet${i}Right`].shift(90, 0.8 * options.godetLength);
            points[`godet${i}TopRcp`] = points[`godet${i}Right`].shift(90, options.godetLength);
            paths[`godet${i}Right`] = new Path()
                .move(points[`godet${i}Top`])
                ._curve(points[`godet${i}TopRcp`], points[`godet${i}RightTop`])
                .line(points[`godet${i}Right`]);
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