import { box } from './shared'

export default (part) => {
  let { Point, points, Snippet, snippets } = part.shorthand()

  box(part)

  let s
  for (let i = 0; i < 10; i++) {
    points[`a${i}`] = new Point(i * 10, 40)
    points[`b${i}`] = new Point(i * 10, i * 8)
    if (points[`a${i}`].sitsRoughlyOn(points[`b${i}`])) s = 'notch'
    else s = 'bnotch'
    snippets[`b${i}`] = new Snippet(s, points[`b${i}`])
    snippets[`a${i}`] = new Snippet(s, points[`a${i}`])
  }

  return part
}
