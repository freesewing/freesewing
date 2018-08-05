import freesewing from "freesewing";

var back = {
  draft: function(pattern) {
    let part = new pattern.part().copy(pattern.parts.base);

    // prettier-ignore
    let {sa, point, points, path, paths, snippet, snippets, final, paperless, macro} = freesewing.utils.shorthand(part);

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
      macro("title", { at: points.title, nr: 2, title: "back" });
      snippets.armholePitchNotch = new snippet("notch", points.armholePitch);
      if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }

    // Paperless?
    if (paperless) {
      macro("pd", {
        id: "armholeLengthDimension",
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
        id: "armholePitchDimension",
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

export default back;
