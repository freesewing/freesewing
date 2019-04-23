export default part => {
  let {
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    utils
  } = part.shorthand();

  points.A = new Point(45, 45)
    .attr("data-circle", 35)
    .attr("data-circle-class", "fabric");
  points.B = new Point(5, 50);
  points.C = new Point(25, 30);
  points.D = new Point(5, 65);
  points.E = new Point(65, 5);
  points.F = new Point(15, 75);
  points.G = new Point(75, 15);

  paths.line1 = new Path().move(points.B).line(points.C);
  paths.line2 = new Path().move(points.D).line(points.E);
  paths.line3 = new Path().move(points.F).line(points.G);

  let intersections1 = utils.beamIntersectsCircle(
    points.A,
    points.A.attributes.get("data-circle"),
    points.B,
    points.C
  );
  let intersections2 = utils.beamIntersectsCircle(
    points.A,
    points.A.attributes.get("data-circle"),
    points.D,
    points.E,
    "y"
  );
  let intersections3 = utils.beamIntersectsCircle(
    points.A,
    points.A.attributes.get("data-circle"),
    points.F,
    points.G
  );

  snippets.first1 = new Snippet("bnotch", intersections1[0]);
  snippets.second1 = new Snippet("x", intersections1[1]);
  snippets.first2 = new Snippet("bnotch", intersections2[0]);
  snippets.second2 = new Snippet("x", intersections2[1]);
  snippets.first3 = new Snippet("bnotch", intersections3[0]);
  snippets.second3 = new Snippet("x", intersections3[1]);

  return part;
};
