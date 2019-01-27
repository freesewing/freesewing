export default part => {
  let { Point, points, Path, paths, macro } = part.shorthand();

  points.topLeft = new Point(0, 0);
  points.topRight = new Point(120, 0);
  points.bottomRight = new Point(120, 70);
  points.bottomLeft = new Point(0, 70);
  points.titleAnchor = new Point(60, 35);

  paths.box = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .line(points.bottomRight)
    .line(points.bottomLeft)
    .close();

  macro("title", {
    at: points.titleAnchor,
    nr: 4,
    title: "sleeve"
  });

  return part;
};
