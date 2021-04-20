export default (part) => {
  let { Point, points, Path, paths, options } = part.shorthand()

  const textClasses = (label) =>
    options.focus === label ? 'center text-xs fill-note' : 'center text-xs'

  points.A = new Point(10, 10)
    .attr('data-text', 'Path.move()')
    .attr('data-text-class', textClasses('move'))
  points.B = new Point(70, 30)
  points.BCp2 = new Point(40, 10)
  points.C = new Point(90, -50)
  points.CCp1 = new Point(125, -30)
  points.D = new Point(20, -50)
  points.DCp = new Point(40, 0)
  points.E = new Point(-20, -20)
  points.ECp = new Point(-20, -50)

  paths.line = new Path()
    .move(points.A)
    .line(points.B)
    .attr('data-text', 'Path.line()')
    .attr('data-text-class', textClasses('line'))

  paths.curve = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .attr('data-text', 'Path.curve()')
    .attr('data-text-class', textClasses('curve'))

  paths._curve = new Path()
    .move(points.C)
    ._curve(points.DCp, points.D)
    .attr('data-text', 'Path._curve()')
    .attr('data-text-class', textClasses('_curve'))

  paths.curve_ = new Path()
    .move(points.D)
    .curve_(points.ECp, points.E)
    .attr('data-text', 'Path.curve_()')
    .attr('data-text-class', textClasses('curve_'))

  paths.close = new Path()
    .move(points.E)
    .line(points.A)
    .attr('data-text', 'Path.close()')
    .attr('data-text-class', textClasses('close'))

  paths.example = paths.line.join(paths.curve).join(paths._curve).join(paths.curve_).close()

  return part
}
