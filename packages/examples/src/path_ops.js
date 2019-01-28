export default part => {
  let { Point, points, Path, paths } = part.shorthand();

  points.A = new Point(10, 10)
    .attr("data-text", "msg_move")
    .attr("data-text-class", "center text-xs");
  points.B = new Point(70, 30);
  points.BCp2 = new Point(40, 10);
  points.C = new Point(90, -50);
  points.CCp1 = new Point(125, -30);
  points.D = new Point(20, -50);
  points.DCp = new Point(40, 0);
  points.E = new Point(-20, -20);
  points.ECp = new Point(-20, -50);

  paths.line = new Path()
    .move(points.A)
    .line(points.B)
    .attr("data-text", "msg_line")
    .attr("data-text-class", "center text-xs");

  paths.curve = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .attr("data-text", "msg_curve")
    .attr("data-text-class", "center text-xs");

  paths._curve = new Path()
    .move(points.C)
    ._curve(points.DCp, points.D)
    .attr("data-text", "msg__curve")
    .attr("data-text-class", "center text-xs");

  paths.curve_ = new Path()
    .move(points.D)
    .curve_(points.ECp, points.E)
    .attr("data-text", "msg_curve_")
    .attr("data-text-class", "center text-xs");

  paths.close = new Path()
    .move(points.E)
    .line(points.A)
    .attr("data-text", "msg_close")
    .attr("data-text-class", "center text-xs");

  paths.example = paths.line
    .join(paths.curve)
    .join(paths._curve)
    .join(paths.curve_)
    .close();

  return part;
};
