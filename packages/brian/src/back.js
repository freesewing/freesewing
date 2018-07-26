import * as F from "freesewing";
import base from "./base";

var back = {
  draft: function(part) {
    let {
      measurements,
      options,
      points,
      paths,
      snippets,
      macro,
      final,
      paperless
    } = F.utils.shorthand(part);
    base.draft(part);

    paths.seam = new F.path()
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
      .close();

    // Final?

    var decorate = function(part) {
      macro("cutonfold", {
        from: points.cbNeck,
        to: points.cbHips,
        grainline: true
      });

      points.title = new F.point(
        points.armholePitch.x / 2,
        points.armholePitch.y
      );
      macro("title", { at: points.title, nr: 2 });

      points.logo = points.title.shift(-90, 100);
      snippets.logo = new F.snippet("logo", points.logo);
    };

    if (final) {
      decorate(part);
    }

    // Paperless?

    var gauge = function(part) {};

    if (paperless) {
      gauge(part);
    }
  }
};

export default back;
