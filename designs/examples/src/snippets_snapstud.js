import { box } from './shared'

export default (part) => {
  let { Point, points, Snippet, snippets } = part.shorthand()

  points.anchor = new Point(50, 5)
  snippets.demo = new Snippet('snap-stud', points.anchor)

  return box(part, 100, 10)
}
