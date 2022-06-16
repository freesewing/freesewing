import { box } from './shared'

export default (part) => {
  let { Point, points } = part.shorthand()

  points.anchor = new Point(100, 25)
    .attr('data-text', 'supportFreesewingBecomeAPatron')
    .attr('data-text-class', 'center')

  return box(part, 200, 50)
}
