import { dimensionPlugin } from '@freesewing/plugin-dimension'
import { base } from './base.mjs'

const pluginDimension = (part) => {
  const { points, Point, paths, Path, options, macro } = part.shorthand()

  if (['dimension', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0)
    points.b = new Point(10, 0)
    points.c = new Point(0, 10)
    points.d = new Point(100, 0)
    points.e = new Point(0, 100)
    points.f = new Point(50, 50)
    points.g = new Point(80, 80)
    paths.a = new Path().move(points.c).curve(points.e, points.g, points.d)

    const opts = {
      text: options.dimensionCustomText ? 'custom text' : false,
      d: options.dimensionD,
      noStartMarker: !options.dimensionStartMarker,
      noEndMarker: !options.dimensionEndMarker,
    }

    macro('hd', {
      from: points.a,
      to: points.b,
      ...opts,
    })
    macro('vd', {
      from: points.c,
      to: points.a,
      ...opts,
    })
    macro('hd', {
      from: points.b,
      to: points.d,
      ...opts,
    })
    macro('vd', {
      from: points.e,
      to: points.c,
      ...opts,
    })
    macro('ld', {
      from: points.b,
      to: points.f,
      ...opts,
    })
    macro('pd', {
      path: paths.a,
      ...opts,
    })

    // Prevent clipping of text
    paths.box = new Path()
      .move(new Point(-10, -10))
      .line(new Point(110, 10))
      .attr('class', 'hidden')
  }

  return part
}

export const dimension = {
  name: 'plugintest.dimension',
  after: base,
  options: {
    dimensionCustomText: { bool: false, menu: 'dimension' },
    dimensionD: { count: 10, min: -20, max: 20, menu: 'dimension' },
    dimensionEndMarker: { bool: true, menu: 'dimension' },
    dimensionStartMarker: { bool: true, menu: 'dimension' },
  },
  plugins: dimensionPlugin,
  draft: pluginDimension,
}
