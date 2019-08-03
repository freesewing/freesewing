import { box } from './shared'

export default part => {
  let { Point, snippets, Snippet } = part.shorthand()

  snippets.button = new Snippet('button', new Point(30, 10))
  snippets.buttonhole = new Snippet('buttonhole', new Point(70, 10))

  return box(part, 100, 20)
}
