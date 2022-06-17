import { box } from './shared'

export default (part) => {
  let { Point, points, Snippet, snippets } = part.shorthand()

  points.anchor = new Point(35, 35)
  snippets.demo = new Snippet('logo', points.anchor).attr('style', 'color: #f006')

  snippets.clone = snippets.demo.clone().attr('data-scale', 0.5)

  return box(part)
}
