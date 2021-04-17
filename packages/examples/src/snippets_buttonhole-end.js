import { box } from './shared'

export default (part) => {
  let { Point, points, Snippet, snippets } = part.shorthand()

  points.anchor = new Point(50, 0)
  snippets.demo = new Snippet('buttonhole-end', points.anchor)

  return box(part, 100, 10)
}
