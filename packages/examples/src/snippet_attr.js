import { box } from './shared'

export default (part) => {
  let { Point, points, Snippet, snippets } = part.shorthand()

  points.anchor = new Point(50, 15)
  snippets.demo = new Snippet('logo', points.anchor)
    .attr('data-scale', 0.8)
    .attr('data-rotate', 180)

  return box(part)
}
