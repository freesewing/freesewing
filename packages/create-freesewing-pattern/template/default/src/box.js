export default function(part) {
  let {
    options,
    Point,
    Path,
    points,
    paths,
    complete,
    paperless
  } = part.shorthand();

  points.topLeft = new Point(0, 0);
  points.topRight = new Point(options.size, 0);
  points.bottomLeft = new Point(0, options.size);
  points.bottomRight = new Point(options.size, options.size);

  paths.demo = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr("data-text", "thisIsTheFrontPart")
    .attr("data-text-class", "center");

  // Complete?
  if (complete) {
  }

  // Paperless?
  if (paperless) {
  }

  return part;
}
