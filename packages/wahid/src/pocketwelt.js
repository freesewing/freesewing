export default part => {
  let {
    points,
    Point,
    paths,
    Path,
    measurements,
    options,
    utils,
    macro,
    snippets,
    Snippet,
    complete,
    sa,
    paperless
  } = part.shorthand();

  let pw = measurements.hipsCircumference * options.pocketWidth; // Pocket width
  let pwh = pw * options.weltHeight; // Pocket welt height

  points.topLeft = new Point(0, 0);
  points.topRight = new Point(pw + 30, 0);
  points.bottomLeft = new Point(0, pwh * 2 + 20);
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y);
  points.notchLeft = new Point(15, 10);
  points.notchRight = new Point(pw + 15, 10);
  points.midLeft = new Point(0, pwh + 10);
  points.midRight = new Point(pw + 30, pwh + 10);

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr("class", "fabric");

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5);
    macro("title", {
      nr: 5,
      title: "pocketWelt",
      at: points.title
    });
    macro("sprinkle", {
      snippet: "notch",
      on: ["notchLeft", "notchRight"]
    });
    paths.cutline = new Path()
      .move(points.notchLeft)
      .line(points.notchRight)
      .attr("class", "fabric stroke-sm dashed");
    paths.foldline = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .attr("class", "hint dotted");
  }

  return part;
};
