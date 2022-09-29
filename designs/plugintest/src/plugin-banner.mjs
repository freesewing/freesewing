import { bannerPlugin } from '@freesewing/plugin-banner'
import { base } from './base.mjs'

const pluginBanner = ({ points, Point, paths, Path, macro, options, part }) => {
  if (['banner', 'all'].indexOf(options.plugin) !== -1) {
    points.from = new Point(0, 0)
    points.to = new Point(320, 0)

    paths.banner = new Path().move(points.from).line(points.to)

    macro('banner', {
      path: 'banner',
      text: 'banner plugin',
      dy: options.bannerDy,
      spaces: options.bannerSpaces,
      repeat: options.bannerRepeat,
    })

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -20)).line(new Point(0, 20)).attr('class', 'hidden')
  }

  return part
}

export const banner = {
  name: 'plugintest.banner',
  plugins: bannerPlugin,
  after: base,
  options: {
    bannerDy: { count: -1, min: -15, max: 15, menu: 'banner' },
    bannerSpaces: { count: 10, min: 0, max: 20, menu: 'banner' },
    bannerRepeat: { count: 10, min: 1, max: 20, menu: 'banner' },
  },
  draft: pluginBanner,
}
