import { ringsectorPlugin } from '@freesewing/plugin-ringsector'
import { base } from './base.mjs'

const pluginRingsector = ({ paths, options, macro, part, store }) => {
  if (['ringsector', 'all'].indexOf(options.plugin) !== -1) {
    const pathId = macro('ringsector', {
      angle: options.ringsectorAngle,
      insideRadius: options.ringsectorInsideRadius,
      outsideRadius: options.ringsectorOutsideRadius,
    }).paths.path

    macro('bannerbox', {
      topLeft: paths[pathId].edge('topLeft'),
      bottomRight: paths[pathId].edge('bottomRight'),
      text: 'macro = ringsector',
      ...store.get('bannerbox.macro'),
    })
  }

  return part
}

export const ringsector = {
  name: 'plugintest.ringsector',
  plugins: ringsectorPlugin,
  after: base,
  options: {
    ringsectorInsideRadius: { count: 30, min: 10, max: 50, menu: 'ringsector' },
    ringsectorOutsideRadius: { count: 60, min: 60, max: 120, menu: 'ringsector' },
    ringsectorAngle: { deg: 75, min: 30, max: 120, menu: 'ringsector' },
  },
  draft: pluginRingsector,
}
