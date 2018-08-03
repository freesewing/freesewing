import freesewing from "freesewing";
import base from "./base";

var back = {
  draft: function(part) {
    // prettier-ignore
    let {sa, point, points, path, paths, snippet, snippets, final, paperless, macro} = freesewing.utils.shorthand(part);

    base.draft(part);

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

    // Anchor point for sampling
    points.gridAnchor = points.cbHips;

    // Final?
    if (final) {
      macro("cutonfold", {
        from: points.cbNeck,
        to: points.cbHips,
        grainline: true
      });

      points.title = new point(
        points.armholePitch.x / 2,
        points.armholePitch.y
      );
      macro("title", { at: points.title, nr: 2 });

      points.logo = points.title.shift(-90, 100);
      snippets.logo = new snippet("logo", points.logo);
      snippets.armholePitchNotch = new snippet("notch", points.armholePitch);

      if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }

    // Paperless?

    if (paperless) {
      macro("hd", {
        from: points.cbHips,
        to: points.hips,
        y: points.hips.y + sa + 15
      });
      macro("vd", {
        from: points.hips,
        to: points.armhole,
        x: points.hips.x + sa + 15
      });
      macro("vd", {
        from: points.hips,
        to: points.armholePitch,
        x: points.hips.x + sa + 30
      });
      macro("vd", {
        from: points.hips,
        to: points.shoulder,
        x: points.hips.x + sa + 45
      });
      macro("vd", {
        from: points.hips,
        to: points.neck,
        x: points.hips.x + sa + 60
      });
      macro("vd", {
        from: points.cbHips,
        to: points.cbNeck,
        x: points.cbHips.x - sa - 15
      });
      macro("hd", {
        from: points.cbNeck,
        to: points.neck,
        y: points.neck.y - sa - 15
      });
      macro("hd", {
        from: points.cbNeck,
        to: points.shoulder,
        y: points.neck.y - sa - 30
      });
      macro("ld", { from: points.neck, to: points.shoulder, d: sa + 15 });
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

export default back;
