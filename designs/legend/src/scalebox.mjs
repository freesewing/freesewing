import { box } from './shared.mjs'

function legendScalebox({ points, Point, macro, part }) {
  points.a = new Point(55, 25)
  macro('scalebox', { at: points.a })

  return box(part, 110, 55)
}

export const scalebox = {
  name: 'legend.scalebox',
  draft: legendScalebox,
}
