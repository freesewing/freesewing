import { box } from './shared'

export default (part) => {
  let { Point, points, Snippet, snippets } = part.shorthand()

  points.A = new Point(25, 25)
    .attr('data-text', 'Point A')
    .attr('data-text-class', 'text-xl')
    .attr('data-text-fill-opacity', '0.5')
  points.B = points.A.clone().attr('data-text', 'Point B')

  snippets.x = new Snippet('notch', points.A)

  return box(part)
}
