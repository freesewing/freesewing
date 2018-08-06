import freesewing from "freesewing";
import base from "./base";

var front = {
  draft: function(pattern) {
    let part = new pattern.Part().copy(pattern.parts.back);

    // prettier-ignore
    let {sa, Point, points, Path, paths, Snippet, snippets, options, measurements, final, paperless, macro} = freesewing.utils.shorthand(part);

    // Cut arm a bit deeper at the front
    let deeper = measurements.chestCircumference * options.frontArmholeDeeper;
    points.armholeHollowCp2.x -= deeper;
    points.armholePitch.x -= deeper;
    points.armholePitchCp1.x -= deeper;

    // Rename cb (center back) to cf (center front)
    for (let key of ["Neck", "Shoulder", "Armhole", "Waist", "Hips"]) {
      console.log("key is", key);
      points[`cf${key}`] = new Point(
        points[`cb${key}`].x,
        points[`cb${key}`].y
      );
      delete points[`cb${key}`];
    }

    // Adapt neck opening
    points.cfNeck = points.cfNeck.shift(-90, points.neck.x);
    points.neckCp2 = points.cfNeck.shift(0, points.neck.x * 0.7);

    paths.seam = new Path()
      .move(points.cfNeck)
      .line(points.cfHips)
      .line(points.hips)
      .line(points.armhole)
      .curve(points.armholeCp1, points.armholeCp2, points.armholeHollow)
      .curve(
        points.armholeHollowCp1,
        points.armholeHollowCp2,
        points.armholePitch
      )
      .curve(points.armholePitchCp1, points.armholePitchCp2, points.shoulder)
      .line(points.neck)
      .curve(points.neckCp1, points.neckCp2, points.cfNeck)
      .close()
      .attr("class", "fabric");

    // Final?
    if (final) {
      macro("title", { at: points.title, nr: 1, title: "front" });
      snippets.armholePitchNotch = new Snippet("notch", points.armholePitch);
      if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }

    // Paperless?

    if (paperless) {
      macro("pd", {
        path: new Path()
          .move(points.armhole)
          .curve(points.armholeCp1, points.armholeCp2, points.armholeHollow)
          .curve(
            points.armholeHollowCp1,
            points.armholeHollowCp2,
            points.armholePitch
          )
          .curve(
            points.armholePitchCp1,
            points.armholePitchCp2,
            points.shoulder
          ),
        d: sa + 15
      });
      macro("pd", {
        path: new Path()
          .move(points.armholePitch)
          .curve(
            points.armholePitchCp1,
            points.armholePitchCp2,
            points.shoulder
          ),
        d: -15
      });
    }

    return part;
  }
};

export default front;
