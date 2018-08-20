import freesewing from "freesewing";
import * as shared from "./shared";

var back = {
  draft: function(part) {
    // prettier-ignore
    let {store, sa, points, Path, paths, Snippet, snippets, final, paperless, macro} = part.shorthand();

    // Seamline
    paths.saBase = shared.saBase("back", points, Path);
    paths.seam = new Path()
      .move(points.cbNeck)
      .line(points.cbHips)
      .join(paths.saBase)
      .attr("class", "fabric");

    // Store lengths to fit sleeve
    store.set("backArmholeLength", shared.armholeLength(points, Path));
    store.set(
      "backShoulderToArmholePitch",
      shared.shoulderToArmholePitch(points, Path)
    );

    // Final?
    if (final) {
      macro("cutonfold", {
        from: points.cbNeck,
        to: points.cbHips,
        grainline: true
      });

      macro("title", { at: points.title, nr: 2, title: "back" });
      snippets.armholePitchNotch = new Snippet("bnotch", points.armholePitch);
      if (sa) {
        paths.sa = paths.saBase
          .offset(sa)
          .attr("class", "fabric sa")
          .line(points.cbNeck)
          .move(points.cbHips);
        paths.sa.line(paths.sa.start());
      }
    }

    // Paperless?
    if (paperless) {
      shared.dimensions(macro, points, Path, sa);
      macro("hd", {
        from: points.cbHips,
        to: points.hips,
        y: points.hips.y + sa + 15
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
    }

    return part;
  }
};

export default back;
