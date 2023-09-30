import { roundPlugin } from '@freesewing/plugin-round'
import { base } from './base.mjs'

const pluginRound = ({ Point, points, Path, paths, macro, options, part, store }) => {
  if (['round', 'all'].indexOf(options.plugin) !== -1) {
    points.topLeft = new Point(0, 0)
    points.bottomLeft = new Point(0, 30)
    points.topRight = new Point(100, 0)
    points.bottomRight = new Point(100, 30)

    paths.demo = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .close()
      .attr('class', 'note dashed')

    const opts = {
      radius: Number(options.roundRadius),
      hide: options.roundHide,
    }

    macro('round', {
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      prefix: 'bl',
      ...opts,
    })
    macro('round', {
      from: points.bottomRight,
      to: points.topLeft,
      via: points.topRight,
      prefix: 'tr',
      ...opts,
    })

    macro('bannerbox', {
      topLeft: new Point(5, 5),
      bottomRight: new Point(95, 25),
      text: 'macro = round',
      ...store.get('bannerbox.plugin'),
    })
  }

  return part
}

export const round = {
  name: 'plugintest.round',
  after: base,
  options: {
    roundRadius: { count: 10, min: 0, max: 50, menu: 'round' },
    roundHide: { bool: false, menu: 'round' },
  },
  plugins: roundPlugin,
  draft: pluginRound,
}
