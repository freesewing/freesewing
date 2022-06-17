import { box } from './shared'

export default (part) => {
  let { Point, points, Snippet, snippets } = part.shorthand()

  points.anchor = new Point(50, 35)
  snippets.demo = new Snippet('logo', points.anchor)

  return box(part, 100, 50)
}
