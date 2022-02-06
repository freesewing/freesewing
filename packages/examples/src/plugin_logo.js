import { box } from './shared'

export default (part) => {
  let { points, Point, snippets, Snippet } = part.shorthand()
  points.anchor = new Point(50, 25)

  snippets.logo = new Snippet('logo', points.anchor).attr('data-scale', 0.666)

  return box(part, 100, 35)
}
