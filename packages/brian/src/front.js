import freesewing from "freesewing";
import base from "./base";
import * as shared from "./shared";

var front = {
  draft: function(pattern) {
    let part = new pattern.Part().copy(pattern.parts.back);

    // prettier-ignore
    let {store, sa, Point, points, Path, paths, Snippet, snippets, options, measurements, final, paperless, macro} = freesewing.utils.shorthand(part);

    // Cut arm a bit deeper at the front
    let deeper = measurements.chestCircumference * options.frontArmholeDeeper;
    points.armholeHollowCp2.x -= deeper;
    points.armholePitch.x -= deeper;
    points.armholePitchCp1.x -= deeper;

    // Rename cb (center back) to cf (center front)
    for (let key of ["Neck", "Shoulder", "Armhole", "Waist", "Hips"]) {
      points[`cf${key}`] = new Point(
        points[`cb${key}`].x,
        points[`cb${key}`].y
      );
      delete points[`cb${key}`];
    }

    // Adapt neck opening
    points.cfNeck = points.cfNeck.shift(-90, points.neck.x);
    points.neckCp2 = points.cfNeck.shift(0, points.neck.x * 0.7);

    paths.seam = shared.seamLine("front", points, Path);

    // Store lengths to fit sleeve
    store.set("frontArmholeLength", shared.armholeLength(points, Path));
    store.set(
      "frontShoulderToArmholePitch",
      shared.shoulderToArmholePitch(points, Path)
    );

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

    return part;
  }
};

export default front;
