export default (part) => {
  let { Point, points, Path, paths } = part.shorthand()

  points.sun = new Point(10, 5)
  points.moon = points.sun.shift(-15, 70)
  points.text = points.sun
    .shiftFractionTowards(points.moon, 0.8)
    .attr('data-text', points.sun.angle(points.moon) + '°')
    .attr('data-text-class', 'text-sm fill-note center')

  paths.line = new Path().move(points.sun).line(points.moon).attr('class', 'dashed')

  return part
}
