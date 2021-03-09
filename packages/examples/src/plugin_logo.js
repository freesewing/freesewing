import { box } from './shared'

export default (part) => {
  let { Point, snippets, Snippet } = part.shorthand()

  snippets.logo = new Snippet('logo', new Point(50, 30))

  return box(part, 100, 40)
}
