import { annotationPlugin } from '@freesewing/plugin-annotations'
import { base } from './base.mjs'

const pluginPleat = ({ points, Point, paths, Path, options, macro, part }) => {
  if (['pleat', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0)
    points.b = new Point(20, 0)
    macro('pleat', {
      from: points.a,
      to: points.b,
      margin: options.pleatMargin,
      reverse: options.pleatReverse,
    })

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -10)).line(new Point(30, 10)).attr('class', 'hidden')
  }

  return part
}

export const pleat = {
  name: 'plugintest.pleat',
  after: base,
  options: {
    pleatMargin: { count: 35, min: 0, max: 50, menu: 'pleat' },
    pleatReverse: { bool: false, menu: 'pleat' },
  },
  plugins: annotationPlugin,
  draft: pluginPleat,
}
