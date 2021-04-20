import { box } from './shared'

export default (part) => {
  let { Point, snippets, Snippet } = part.shorthand()

  snippets.button = new Snippet('button', new Point(20, 10))
  snippets.buttonhole = new Snippet('buttonhole', new Point(40, 10))
  snippets.buttonholeStart = new Snippet('buttonhole-start', new Point(60, 10))
  snippets.buttonholeEnd = new Snippet('buttonhole-end', new Point(80, 10))
  snippets.snapMale = new Snippet('snap-stud', new Point(100, 10))
  snippets.snapFemale = new Snippet('snap-socket', new Point(120, 10))

  return box(part, 140, 20)
}
