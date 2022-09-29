import { scaleboxPlugin } from '@freesewing/plugin-scalebox'
import { base } from './base.mjs'

const pluginScalebox = ({ Point, points, macro, options, part }) => {
  if (['scalebox', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0)

    macro(options.scaleboxType, {
      at: points.a,
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
  },
  draft: pluginScalebox,
}
