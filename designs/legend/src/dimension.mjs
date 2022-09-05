import { box } from './shared.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'

function legendDimension(part) {
  const { points, Point, macro } = part.shorthand()

  points.a = new Point(10, 20)
  points.b = new Point(90, 20)

  macro('ld', {
    from: points.a,
    to: points.b,
  })

  return box(part, 100, 25)
}

export const dimension = {
  name: 'legend.dimension',
  plugins: pluginBundle,
  draft: legendDimension,
}
