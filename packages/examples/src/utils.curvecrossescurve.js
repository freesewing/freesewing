import freesewing from "freesewing";

var utilsCurveCrossesCurve = {
  draft: function(part) {
    // prettier-ignore
    let {debug, Point, points, Path, paths, Snippet, snippets, utils} = part.shorthand();

    points.A = new Point(10, 10);
    points.Acp = new Point(310, 40);
    points.B = new Point(110, 70);
    points.Bcp = new Point(-210, 40);

    points.C = new Point(20, -5);
    points.Ccp = new Point(60, 300);
    points.D = new Point (100, 85);
    points.Dcp = new Point (70, -220);
    paths.curveA = new Path()
      .move(points.A)
      .curve(points.Acp, points.Bcp, points.B);
    paths.curveB = new Path()
      .move(points.C)
      .curve(points.Ccp, points.Dcp, points.D);

    for (let p of utils.curveCrossesCurve(
          points.A,
          points.Acp,
          points.Bcp,
          points.B,
          points.C,
          points.Ccp,
          points.Dcp,
          points.D)) snippets[part.getUid()] = new Snippet('x', p);

    return part;
  }
};

export default utilsCurveCrossesCurve;
