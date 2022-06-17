import { box } from './shared'

export default (part) => {
  let { Point, points, Snippet, snippets } = part.shorthand()

  points.anchor1 = new Point(20, 15)
  points.anchor2 = new Point(50, 15)
  points.anchor3 = new Point(80, 15)
  snippets.demo1 = new Snippet('button', points.anchor1)
  snippets.demo2 = new Snippet('buttonhole', points.anchor2)
  snippets.demo3 = new Snippet('logo', points.anchor3).attr('data-scale', 0.5)

  return box(part)
}
