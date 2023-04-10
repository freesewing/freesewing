import { annotationsPlugin } from '@freesewing/plugin-annotations'
import { base } from './base.mjs'

const pluginSewtogether = ({ points, Point, paths, Path, options, macro, part }) => {
  if (['sewtogether', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0)
    points.b = new Point(50, 10)
    points.c = new Point(100, 0)
    macro('sewtogether', {
      from: points.a,
      to: points.c,
      hinge: options.sewtogetherHinge,
      middle: options.sewtogetherMiddle ? points.b : null,
    })

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -10)).line(new Point(30, 15)).attr('class', 'hidden')
  }

  return part
}

export const sewtogether = {
  name: 'plugintest.sewtogether',
  after: base,
  options: {
    sewtogetherHinge: { bool: true, menu: 'sewtogether' },
    sewtogetherMiddle: { bool: false, menu: 'sewtogether' },
  },
  plugins: annotationsPlugin,
  draft: pluginSewtogether,
}
