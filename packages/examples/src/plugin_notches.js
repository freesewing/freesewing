import { box } from './shared'

export default (part) => {
  let { Point, snippets, Snippet } = part.shorthand()

  snippets.notch = new Snippet('notch', new Point(60, 10))
  snippets.bnotch = new Snippet('bnotch', new Point(80, 10))

  return box(part, 140, 20)
}
