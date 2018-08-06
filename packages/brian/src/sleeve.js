import freesewing from "freesewing";

var sleeve = {
  draft: function(pattern) {
    let part = new pattern.Part();

    // prettier-ignore
    let {store, sa, measurements, options, Point, points, Path, paths, Snippet, snippets, final, paperless, macro} = freesewing.utils.shorthand(part);

    store.set("sleeveFactor", 1);

    // Sleeve center axis
    points.centerCap = new Point(0, 0);
    points.centerWrist = new Point(
      0,
      measurements.shoulderToWrist * (1 + options.sleeveLengthBonus)
    );
    points.centerBiceps = new Point(
      0,
      points.centerWrist.y -
        measurements.bicepsCircumference *
          (1 + options.sleevecapHeightFactor) *
          store.get("sleeveFactor")
    );

    // Sleeve half width, limit impact of sleeveTweakFactor to 25% to avoid a too narrow sleeve
    let halfWidth =
      (measurements.bicepsCircumference * (1 + options.bicepsEase)) / 2;
    points.leftBiceps = points.centerBiceps.shift(
      180,
      halfWidth * 0.75 + halfWidth * 0.25 * store.get("sleeveFactor")
    );
    points.rightBiceps = points.leftBiceps.flipX(points.centerBiceps);

    // Pitch points
    points.backPitch = new Point(
      points.leftBiceps.x * options.sleevecapBackFactorX,
      points.leftBiceps.y * options.sleevecapBackFactorY
    );
    points.frontPitch = new Point(
      points.rightBiceps.x * options.sleevecapFrontFactorX,
      points.rightBiceps.y * options.sleevecapFrontFactorY
    );

    // 4 sleevecap quadrants
    // Base points
    points.capQ1Base = points.frontPitch.shiftFractionTowards(
      points.rightBiceps,
      0.5
    );
    points.capQ2Base = points.frontPitch.shiftFractionTowards(
      points.centerCap,
      0.5
    );
    points.capQ3Base = points.backPitch.shiftFractionTowards(
      points.centerCap,
      0.5
    );
    points.capQ4Base = points.backPitch.shiftFractionTowards(
      points.leftBiceps,
      0.5
    );
    // Offset points
    let baseOffset =
      measurements.bicepsCircumference * (1 + options.bicepsEase);
    points.capQ1 = points.capQ1Base.shift(
      points.rightBiceps.angle(points.frontPitch) + 90,
      baseOffset * options.sleevecapQ1Offset
    );
    points.capQ2 = points.capQ2Base.shift(
      points.centerCap.angle(points.frontPitch) + 90,
      baseOffset * options.sleevecapQ2Offset
    );
    points.capQ3 = points.capQ3Base.shift(
      points.centerCap.angle(points.backPitch) - 90,
      baseOffset * options.sleevecapQ3Offset
    );
    points.capQ4 = points.capQ4Base.shift(
      points.leftBiceps.angle(points.backPitch) - 90,
      baseOffset * options.sleevecapQ4Offset
    );
    // Control points
    points.capQ1Cp1 = points.capQ1.shift(
      points.frontPitch.angle(points.rightBiceps),
      baseOffset * options.sleevecapQ1Spread1
    );
    points.capQ1Cp2 = points.capQ1.shift(
      points.frontPitch.angle(points.rightBiceps),
      baseOffset * options.sleevecapQ1Spread2 * -1
    );
    points.capQ2Cp1 = points.capQ2.shift(
      points.centerCap.angle(points.frontPitch),
      baseOffset * options.sleevecapQ2Spread1
    );
    points.capQ2Cp2 = points.capQ2.shift(
      points.centerCap.angle(points.frontPitch),
      baseOffset * options.sleevecapQ2Spread2 * -1
    );
    points.capQ3Cp1 = points.capQ3.shift(
      points.backPitch.angle(points.centerCap),
      baseOffset * options.sleevecapQ3Spread1
    );
    points.capQ3Cp2 = points.capQ3.shift(
      points.backPitch.angle(points.centerCap),
      baseOffset * options.sleevecapQ3Spread2 * -1
    );
    points.capQ4Cp1 = points.capQ4.shift(
      points.leftBiceps.angle(points.backPitch),
      baseOffset * options.sleevecapQ4Spread1
    );
    points.capQ4Cp2 = points.capQ4.shift(
      points.leftBiceps.angle(points.backPitch),
      baseOffset * options.sleevecapQ4Spread2 * -1
    );
    // Center cap control points
    points.centerCapCp1 = points.centerCap.shift(
      points.capQ3.angle(points.capQ2),
      baseOffset * options.sleevecapTopSpread1
    );
    points.centerCapCp2 = points.centerCap.shift(
      points.capQ3.angle(points.capQ2),
      baseOffset * options.sleevecapTopSpread2 * -1
    );

    paths.test = new Path()
      .move(points.centerWrist)
      .line(points.centerCap)
      .move(points.leftBiceps)
      .line(points.rightBiceps)
      .curve(points.rightBiceps, points.capQ1Cp1, points.capQ1)
      .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
      .curve(points.capQ2Cp2, points.centerCapCp1, points.centerCap)
      .curve(points.centerCapCp2, points.capQ3Cp1, points.capQ3)
      .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
      .curve(points.capQ4Cp2, points.leftBiceps, points.leftBiceps);
    //// Wrist
    //$wristWidth = $model->getMeasurement('wristCircumference') + $this->getOption('cuffEase');
    //$p->newPoint(31, $wristWidth / -2, $p->y(3), 'Wrist point back');
    //$p->newPoint(32, $wristWidth / 2, $p->y(3), 'Wrist point front');
    //// Elbow location
    //$p->newPoint(33, 0, $p->y(2) + $p->distance(2, 3) / 2 - 25, 'Elbow point');
    //$p->addPoint('.help1', $p->shift(33, 0, 10));
    //$p->addPoint(34, $p->beamsCross(-5, 31, 33, '.help1'), 'Elbow point back side');
    //$p->addPoint(35, $p->beamsCross(5, 32, 33, 34), 'Elbow point front side');
    //$path = 'M 31 L -5 C -5 20 16 C 21 10 10 C 10 22 17 C 23 28 30 C 29 25 18 C 24 11 11 C 11 27 19 C 26 5 5 L 32 z';
    //$p->newPath('seamline', $path, ['class' => 'fabric']);
    //// Mark path for sample service
    //$p->paths['seamline']->setSample(true);
    //
    //// Store sleevehead length
    //$this->setValue('sleeveheadLength',
    //    $p->curveLen(-5,-5,20,16) +
    //    $p->curveLen(16,21,10,10) +
    //    $p->curveLen(10,10,22,17) +
    //    $p->curveLen(17,23,28,30) +
    //    $p->curveLen(30,29,25,18) +
    //    $p->curveLen(18,24,11,11) +
    //    $p->curveLen(11,11,27,19) +
    //    $p->curveLen(19,26,5,5)
    //);

    // Anchor point for sampling
    points.gridAnchor = points.origin;
    points.test = new Point(10, 10);
    console.log(part);

    // Final?
    if (final) {
      //macro("title", { at: points.title, nr: 2, title: "back" });
      //snippets.armholePitchNotch = new Snippet("notch", points.armholePitch);
      //if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }

    // Paperless?
    if (paperless) {
      //shared.dimensions(macro, points, Path, sa);
    }

    return part;
  }
};

export default sleeve;
