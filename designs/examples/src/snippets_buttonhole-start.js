import { box } from './shared'

export default (part) => {
  let { Point, points, Snippet, snippets } = part.shorthand()

  points.anchor = new Point(50, 10)
  snippets.demo = new Snippet('buttonhole-start', points.anchor)

  return box(part, 100, 10)
}
