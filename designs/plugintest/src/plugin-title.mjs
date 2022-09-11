import { titlePlugin } from '@freesewing/plugin-title'
import { base } from './base.mjs'

const pluginTitle = ({ points, Point, paths, Path, macro, options, part }) => {
  if (['title', 'all'].indexOf(options.plugin) !== -1) {
    if (options.titleMeta) part.context.settings.metadata = { for: 'Some user' }
    points.a = new Point(20, 0)
    macro('title', {
      at: points.a,
      nr: options.titleNr,
      title: options.titleTitle ? 'Title here' : false,
      prefix: 'prefix',
      rotation: options.titleRotate,
      scale: options.titleScale,
    })
    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -20)).line(new Point(120, 20)).attr('class', 'hidden')
  }

  return part
}

export const title = {
  name: 'plugintest.title',
  after: base,
  options: {
    titleNr: { count: 1, min: 0, max: 100, menu: 'title' },
    titleTitle: { bool: true, menu: 'title' },
    titleMeta: { bool: true, menu: 'title' },
    titleScale: { pct: 100, min: 10, max: 200, menu: 'title' },
    titleRotate: { deg: 0, min: -360, max: 360, menu: 'title' },
  },
  plugins: titlePlugin,
  draft: pluginTitle,
}
