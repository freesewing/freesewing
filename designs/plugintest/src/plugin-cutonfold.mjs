import { cutonfoldPlugin } from '@freesewing/plugin-cutonfold'
import { base } from './base.mjs'

const pluginCutonfold = (part) => {
  const { points, Point, paths, Path, options, macro } = part.shorthand()

  if (['cutonfold', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0)
    points.b = new Point(200, 0)
    macro('cutonfold', {
      from: points.a,
      to: points.b,
      margin: options.cutonfoldMargin,
      offset: options.cutonfoldOffset,
      grainline: options.cutonfoldGrainline,
    })

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -30)).line(new Point(210, 10)).attr('class', 'hidden')
  }

  return part
}

export const cutonfold = {
  name: 'plugintest.cutonfold',
  after: base,
  options: {
    cutonfoldMargin: { count: 5, min: 0, max: 25, menu: 'cutonfold' },
    cutonfoldOffset: { count: 15, min: 0, max: 100, menu: 'cutonfold' },
    cutonfoldGrainline: { bool: false, menu: 'cutonfold' },
  },
  plugins: cutonfoldPlugin,
  draft: pluginCutonfold,
}
