import { sprinklePlugin } from '@freesewing/plugin-sprinkle'
import { base } from './base.mjs'

const pluginSprinkle = ({ Point, points, options, macro, part, store }) => {
  if (['sprinkle', 'all'].indexOf(options.plugin) !== -1) {
    points.center = new Point(0, 0)
    points.top = new Point(0, 20)
    const on = []
    for (let i = 0; i < 360; i += 45) {
      points[`s${i}`] = points.top.rotate(i, points.center)
      on.push(`s${i}`)
    }

    macro('sprinkle', {
      on,
      snippet: options.sprinkleSnippet,
      scale: options.sprinkleScale,
      rotate: options.sprinkleRotate,
    })
    macro('bannerbox', {
      topLeft: new Point(-20, -20),
      bottomRight: new Point(20, 20),
      text: 'macro = sprinkle',
      ...store.get('bannerbox.plugin'),
    })
  }

  return part
}

export const sprinkle = {
  name: 'plugintest.sprinkle',
  after: base,
  options: {
    sprinkleScale: { pct: 100, min: 10, max: 200, menu: 'sprinkle' },
    sprinkleRotate: { deg: 0, min: -360, max: 360, menu: 'sprinkle' },
    sprinkleSnippet: {
      dflt: 'bnotch',
      list: [
        'notch',
        'bnotch',
        'button',
        'buttonhole',
        'buttonhole-start',
        'buttonhole-end',
        'snap-stud',
        'snap-socket',
        'logo',
      ],
      menu: 'sprinkle',
    },
  },
  plugins: sprinklePlugin,
  draft: pluginSprinkle,
}
