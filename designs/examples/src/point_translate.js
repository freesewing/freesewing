import { box } from './shared'

export default (part) => {
  let { Point, points, macro } = part.shorthand()

  points.A = new Point(20, 20).attr('data-text', 'Point A')
  points.B = points.A.translate(120, 60)
    .attr('data-text', 'Point B is point A with a\ntranslate(120, 60)\ntransform applied')
    .attr('data-text-class', 'right')
    .attr('data-text-dy', -6)
    .attr('data-text-lineheight', 6)

  macro('ld', {
    from: points.A,
    to: points.B,
    text: 'translate(120,60)',
    noStartMarker: true,
  })

  return box(part, 150, 85)
}
