import { scaleboxPlugin } from '@freesewing/plugin-scalebox'
import { base } from './base.mjs'

const pluginScalebox = ({ Point, points, macro, options, part }) => {
  if (['scalebox', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0)

    macro(options.scaleboxType, {
      at: points.a,
      rotate: options.scaleboxRotation,
    })
  }

  return part
}

export const scalebox = {
  name: 'plugintest.scalebox',
  plugins: scaleboxPlugin,
  after: base,
  options: {
    scaleboxType: { dflt: 'scalebox', list: ['scalebox', 'miniscale'], menu: 'scalebox' },
    scaleboxRotation: { deg: 0, min: 0, max: 360, menu: 'scalebox' },
  },
  draft: pluginScalebox,
}
