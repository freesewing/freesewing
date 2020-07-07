import { box } from './shared'

export default part => {
  let { Point, snippets, Snippet } = part.shorthand()

  snippets.button = new Snippet('button', new Point(20, 10))
  snippets.buttonhole = new Snippet('buttonhole', new Point(40, 10))
  snippets.snapMale = new Snippet('snap-male', new Point(60, 10))
  snippets.snapFemale = new Snippet('snap-female', new Point(80, 10))

  return box(part, 100, 20)
}
