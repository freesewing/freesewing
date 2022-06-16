import { box } from './shared'

export default (part) => {
  const { points, Point, snippets, Snippet } = part.shorthand()

  points.a = new Point(30, 10)
  points.atxt = new Point(30, 20).attr('data-text', 'notch').attr('data-text-class', 'center')
  snippets.a = new Snippet('notch', points.a)

  points.b = new Point(80, 10)
  points.btxt = new Point(80, 20).attr('data-text', 'bnotch').attr('data-text-class', 'center')
  snippets.b = new Snippet('bnotch', points.b)

  return box(part, 120, 30)
}
