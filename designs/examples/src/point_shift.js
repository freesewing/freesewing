import { box } from './shared'

export default (part) => {
  let { Point, points, macro } = part.shorthand()

  points.A = new Point(90, 40).attr('data-text', 'Point A').attr('data-text-class', 'right')
  points.B = points.A.shift(155, 70)
    .attr('data-text', 'Point B is point A shifted 7cm\nat a 155 degree angle')
    .attr('data-text-lineheight', 6)

  macro('ld', {
    from: points.B,
    to: points.A,
    d: -10,
  })

  return box(part, 100, 45)
}
