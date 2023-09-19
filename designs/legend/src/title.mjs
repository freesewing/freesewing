import { box } from './shared.mjs'

function legendTitle({ points, Point, macro, part }) {
  points.a = new Point(30, 30)

  macro('title', {
    at: points.a,
    nr: 1,
    title: 'Part name',
  })

  return box(part, 100, 65)
}

export const title = {
  name: 'legend.title',
  draft: legendTitle,
}
