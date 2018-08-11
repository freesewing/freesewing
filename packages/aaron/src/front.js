//import * as shared from "./shared";

var front = {
  draft: function(part) {
    // prettier-ignore
    let {utils, store, sa, Point, points, Path, paths, Snippet, snippets, options, measurements, final, paperless, macro} = part.shorthand();

    // Handle stretch
    for(let i in points) points[i].x = points[i].x * (1 - options.stretchFactor);

    // Rename cb (center back) to cf (center front)
    for (let key of ["Neck", "Shoulder", "Armhole", "Waist", "Hips"]) {
      points[`cf${key}`] = new Point(
        points[`cb${key}`].x,
        points[`cb${key}`].y
      );
      delete points[`cb${key}`];
    }

    // Neckline
    points.cfNeck = points.cfNeck.shift(-90, options.necklineDrop *
      (measurements.centerBackNeckToWaist + measurements.naturalWaistToHip)
    );

    // Strap
    points.strapCenter = points.neck.shiftFractionTowards(points.shoulder, options.shoulderStrapPlacement);
    points.strapLeft = points.strapCenter.shiftTowards(points.neck, points.neck.dist(points.shoulder) * options.shoulderStrapWidth);
    points.strapRight = points.strapLeft.rotate(180, points.strapCenter);
    points.necklineCorner = utils.beamsCross(
      points.strapLeft,
      points.strapRight.rotate(-90, points.strapLeft),
        points.cfNeck.shift(0, points.armholePitch.x/4),
        points.cfNeck
    );
    points.strapLeftCp2 = points.strapLeft.shiftFractionTowards(points.necklineCorner, options.necklineBend);
    points.cfNeckCp1 = points.cfNeck.shiftFractionTowards(points.necklineCorner, options.necklineBend);

    // Hips
    points.hips.x = (measurements.hipsCircumference + (options.hipsEase * measurements.hipsCircumference))/4 * (1 - options.stretchFactor);
    points.waist.x = points.hips.x; // Because stretch
    points.waistCp2 = points.waist.shift(90,points.armhole.dy(points.waist)/2);

    // Armhole
    points.armholeCorner = utils.beamsCross(
      points.armhole,
      points.armholeCp2,
      points.strapRight,
      points.strapLeft.rotate(90, points.strapRight)
    );
    points.armholeCp2 = points.armhole.shiftFractionTowards(points.armholeCorner, 0.8);
    points.strapRightCp1 = points.strapRight.shiftFractionTowards(points.armholeCorner, 0.6);

    // Armhole drop


    console.log('cfneck', points.cfNeck);
      console.log(measurements.naturalWaistToHip);
      console.log(measurements.centerBackNeckToWaist);

    // Seamline
    paths.seam = new Path()
      .move(points.cfNeck)
      .line(points.cfHips)
      .line(points.hips)
      .line(points.waist)
      .curve(points.waistCp2, points.armhole, points.armhole)
      .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
      .line(points.strapLeft)
      .curve(points.strapLeftCp2, points.cfNeckCp1, points.cfNeck)
      .close()
      .attr("class", "fabric");
    /*
    // Final?
    if (final) {
      macro("cutonfold", {
        from: points.cfNeck,
        to: points.cfHips,
        grainline: true
      });
      macro("title", { at: points.title, nr: 1, title: "front" });
      snippets.armholePitchNotch = new Snippet("notch", points.armholePitch);
      if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }

    // Paperless?
    if (paperless) {
      shared.dimensions(macro, points, Path, sa);
      macro("hd", {
        from: points.cfHips,
        to: points.hips,
        y: points.hips.y + sa + 15
      });
      macro("vd", {
        from: points.cfHips,
        to: points.cfNeck,
        x: points.cfHips.x - sa - 15
      });
      macro("hd", {
        from: points.cfNeck,
        to: points.neck,
        y: points.neck.y - sa - 15
      });
      macro("hd", {
        from: points.cfNeck,
        to: points.shoulder,
        y: points.neck.y - sa - 30
      });
    }
*/
    return part;
  }
};

export default front;
