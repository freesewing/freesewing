import freesewing from "freesewing";

var pathSplit = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Path, paths, Snippet, snippets, macro} = part.shorthand();

    points.A = new Point(45, 60);
    points.B = new Point(10, 30);
    points.BCp2 = new Point(40, 20);
    points.C = new Point(90, 30);
    points.CCp1 = new Point(50, -30);
    points.D = new Point(50, 130);
    points.DCp1 = new Point(150, 30);

    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .curve(points.DCp1, points.DCp1, points.D);

    paths.example2 = new Path()
      .move(points.D)
      .curve(points.DCp1, points.DCp1, points.C)
      .curve(points.CCp1, points.BCp2, points.B)
      .line(points.A);

    points.split = paths.example.shiftAlong(20);
    snippets.x = new Snippet("x", points.split);

    let halves = paths.example2.split(points.split);
    for (let i in halves) {
      paths[i] = halves[i].attr(
        "style",
        `stroke-width: 3; stroke-opacity: 0.5; stroke: hsl(${i *
          70}, 100%, 50%)`
      );
    }

    return part;
  }
};

export default pathSplit;
