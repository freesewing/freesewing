import { box } from './shared.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'

function legendBartack({ points, Point, macro, part }) {
  points.bartack = new Point(40, 20).attr('data-text', 'bartack').attr('data-text-dy', -2)
  macro('bartack', {
    anchor: points.bartack,
    prefix: 'a',
    angle: 0,
    length: 23,
  })

  return box(part, 100, 65)
}

export const bartack = {
  name: 'legend.bartack',
  plugins: pluginBundle,
  draft: legendBartack,
}
