import { annotationsPlugin } from '@freesewing/plugin-annotations'
import { base } from './base.mjs'

const pluginCrossbox = ({ points, Point, paths, Path, options, macro, part }) => {
  if (['crossbox', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0)
    points.b = new Point(50, 35)
    macro('crossbox', {
      from: points.a,
      to: points.b,
      text: options.crossboxText ? 'crossBox' : null,
    })

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -10)).line(new Point(60, 45)).attr('class', 'hidden')
  }

  return part
}

export const crossbox = {
  name: 'plugintest.crossbox',
  after: base,
  options: {
    crossboxText: { bool: false, menu: 'crossbox' },
  },
  plugins: annotationsPlugin,
  draft: pluginCrossbox,
}
