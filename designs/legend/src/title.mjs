import { box } from './shared.mjs'

function legendTitle({ points, Point, macro, part }) {
  points.a = new Point(80, 50)

  macro('title', {
    at: points.a,
    nr: 1,
    title: 'Part name',
  })

  return box(part, 200, 95)
}

export const title = {
  name: 'legend.title',
  draft: legendTitle,
}
