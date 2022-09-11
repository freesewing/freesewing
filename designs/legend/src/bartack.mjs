import { box } from './shared.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'

const bartackOptions = (options) => ({
  angle: options.bartackAngle,
  length: options.bartackLength,
  density: options.bartackDensity,
  width: options.bartackWidth,
  start: options.bartackStart,
  end: options.bartackEnd,
})

function legendBartack({ points, Point, paths, Path, macro, options, part }) {
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
  options: {
    bartackLength: { count: 15, min: 2, max: 100, menu: 'bartack' },
    bartackAngle: { count: 0, min: -360, max: 360, menu: 'bartack' },
    bartackDensity: { count: 3, min: 1, max: 5, menu: 'bartack' },
    bartackWidth: { count: 3, min: 1, max: 5, menu: 'bartack' },
    bartackStart: { pct: 25, min: 0, max: 100, menu: 'bartack' },
    bartackEnd: { pct: 75, min: 0, max: 100, menu: 'bartack' },
  },
  plugins: pluginBundle,
  draft: legendBartack,
}
