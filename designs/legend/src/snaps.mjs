import { box } from './shared.mjs'

function legendSnaps({ points, Point, snippets, Snippet, part }) {
  points.a = new Point(30, 10)
  points.atxt = new Point(30, 20).attr('data-text', 'snap-stud').attr('data-text-class', 'center')
  snippets.a = new Snippet('snap-stud', points.a)

  points.b = new Point(80, 10)
  points.btxt = new Point(80, 20).attr('data-text', 'snap-socket').attr('data-text-class', 'center')
  snippets.b = new Snippet('snap-socket', points.b).attr('data-rotate', 90)

  return box(part, 120, 30)
}

export const snaps = {
  name: 'legend.snaps',
  draft: legendSnaps,
}
