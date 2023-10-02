import { gorePlugin } from '@freesewing/plugin-gore'
import { base } from './base.mjs'

const pluginGore = ({ points, Point, options, macro, part, store }) => {
  if (['gore', 'all'].indexOf(options.plugin) !== -1) {
    points.start = new Point(10, 10)
    macro('gore', {
      from: points.start,
      radius: options.goreRadius,
      gores: options.goreGoreNumber,
      extraLength: options.goreExtraLength,
    })
    macro('bannerbox', {
      topLeft: new Point(15, 5),
      bottomRight: new Point(45, 5),
      text: 'macro = gore',
      ...store.get('bannerbox.macro'),
    })
  }
  return part
}

export const gore = {
  name: 'plugintest.gore',
  plugins: gorePlugin,
  after: base,
  options: {
    goreRadius: { count: 20, min: 10, max: 30, menu: 'gore' },
    goreGoreNumber: { count: 6, min: 4, max: 8, menu: 'gore' },
    goreExtraLength: { count: 10, min: 0, max: 20, menu: 'gore' },
  },
  draft: pluginGore,
}
