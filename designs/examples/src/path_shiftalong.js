export default (part) => {
  let { Point, points, Path, paths, Snippet, snippets } = part.shorthand()

  points.A = new Point(45, 60)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)

  paths.example = new Path().move(points.A).line(points.B).curve(points.BCp2, points.CCp1, points.C)

  points.x1 = paths.example
    .shiftAlong(20)
    .attr('data-text', '2cm')
    .attr('data-text-class', 'center fill-note')
    .attr('data-text-lineheight', 6)
  points.x2 = paths.example
    .shiftAlong(90)
    .attr('data-text', '9cm')
    .attr('data-text-class', 'center fill-note')
    .attr('data-text-lineheight', 6)

  snippets.x1 = new Snippet('notch', points.x1)
  snippets.x2 = new Snippet('notch', points.x2)

  return part
}
