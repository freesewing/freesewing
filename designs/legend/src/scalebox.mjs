import { box } from './shared.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'

function legendScalebox(part) {
  const { points, Point, macro } = part.shorthand()

  points.a = new Point(55, 25)
  macro('scalebox', { at: points.a })

  return box(part, 110, 55)
}

export const scalebox = {
  name: 'legend.scalebox',
  plugins: pluginBundle,
  draft: legendScalebox,
}
