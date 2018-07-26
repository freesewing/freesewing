import freesewing from "freesewing";
import base from "./base";

var back = {
  draft: function(part) {
    let {
      measurements,
      options,
      points,
      paths,
      snippets,
      path,
      point,
      snippet,
      final,
      paperless,
      macro
    } = freesewing.utils.shorthand(part);
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
      .close();

    // Final?

    var decorate = function(part) {
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

      console.log("path offset");
      points.t1 = new point(100, 400);
      points.t2 = new point(200, 400);
      points.t3 = new point(200, 500);
      points.t4 = new point(100, 500);
      paths.test = new path()
        .move(points.t1)
        .line(points.t2)
        .line(points.t3)
        .line(points.t4)
        .close();
      paths.test.offset(10);
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
