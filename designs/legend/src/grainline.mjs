import { box } from './shared.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'

function legendGrainline(part) {
  const { points, Point, macro } = part.shorthand()

  points.a = new Point(10, 20)
  points.b = new Point(90, 20)

  macro('grainline', {
    from: points.a,
    to: points.b,
  })

  return box(part, 100, 25)
}

export const grainline = {
  name: 'legend.grainline',
  plugins: pluginBundle,
  draft: legendGrainline,
}
