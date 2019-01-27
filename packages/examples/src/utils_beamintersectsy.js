export default part => {
  let {
    debug,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    utils
  } = part.shorthand();

  points.A = new Point(10, 10);
  points.B = new Point(50, 40);

  paths.AB = new Path().move(points.A).line(points.B);

  snippets.X = new Snippet("x", utils.beamIntersectsY(points.A, points.B, 30));

  paths.help = new Path()
    .move(new Point(0, 30))
    .line(new Point(50, 30))
    .attr("class", "note dashed");

  return part;
};
