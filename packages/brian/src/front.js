import freesewing from "freesewing";
import base from "./base";

var front = {
  draft: function(pattern) {
    let part = new pattern.part().copy(pattern.parts.back);

    // prettier-ignore
    let {sa, point, points, path, paths, snippet, snippets, options, measurements, final, paperless, macro} = freesewing.utils.shorthand(part);

    let deeper = measurements.chestCircumference * options.frontArmholeDeeper;
    points.armholeHollowCp2.x -= deeper;
    points.armholePitch.x -= deeper;
    points.armholePitchCp1.x -= deeper;

    paths.seam = new path()
      .move(points.cbNeck)
      .line(points.cbHips)
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
      .curve(points.neckCp1, points.cbNeck, points.cbNeck)
      .close()
      .attr("class", "fabric");

    // Final?
    if (final) {
      macro("title", { at: points.title, nr: 1, title: "front" });
      snippets.armholePitchNotch = new snippet("notch", points.armholePitch);
      if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }

    // Paperless?

    if (paperless) {
      macro("pd", {
        path: new path()
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
        path: new path()
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
