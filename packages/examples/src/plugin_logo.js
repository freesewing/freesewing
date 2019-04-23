export default part => {
  let { Point, points, Path, paths, snippets, Snippet } = part.shorthand();

  points.topLeft = new Point(0, 0);
  points.topRight = new Point(120, 0);
  points.bottomRight = new Point(120, 70);
  points.bottomLeft = new Point(0, 70);
  points.logoAnchor = new Point(60, 47);

  paths.box = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .line(points.bottomRight)
    .line(points.bottomLeft)
    .close();

  snippets.logo = new Snippet("logo", points.logoAnchor);

  return part;
};
