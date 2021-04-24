import { box } from './shared'

export default (part) => {
  let { Point, points, Path, paths, macro } = part.shorthand()

  points.A = new Point(90, 70).attr('data-text', 'Point A')
  points.B = new Point(30, 30).attr('data-text', 'Point B')
  points.C = points.A.shiftOutwards(points.B, 30)
    .attr('data-text', 'Point C is point A shifted 3cm\nbeyond point B')
    .attr('data-text-lineheight', 6)

  paths.direction = new Path().move(points.A).line(points.C).attr('class', 'note dashed')

  macro('ld', {
    from: points.C,
    to: points.B,
    d: -10,
  })

  return box(part, 110, 75)
}
