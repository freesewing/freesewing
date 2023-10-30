import { backPoints } from './backpoints.mjs'
import { cbqc } from '@freesewing/core'

export const peplum = {
  name: 'tristan.peplum',
  after: backPoints,
  options: {
    // Options
    peplum: { bool: false, menu: 'style' },
    peplumSize: { pct: 10, min: 5, max: 50, menu: 'peplum' },
    peplumFullness: { deg: 180, min: 180, max: 360, menu: 'peplum' },
  },

  draft: ({
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    measurements,
    options,
    macro,
    store,
    part,
  }) => {
    if (false == options.peplum) {
      return part.hide()
    }

    console.log({ measurements: JSON.parse(JSON.stringify(measurements)) })
    console.log({ options: JSON.parse(JSON.stringify(options)) })

    const backInsideWaistLength = store.get('backInsideWaistLength')
    const backOutsideWaistLength = store.get('backOutsideWaistLength')
    const frontInsideWaistLength = store.get('frontInsideWaistLength')
    const frontOutsideWaistLength = store.get('frontOutsideWaistLength')

    const radius =
      (((backInsideWaistLength +
        backOutsideWaistLength +
        frontInsideWaistLength +
        frontOutsideWaistLength) /
        Math.PI) *
        (360 / options.peplumFullness)) /
      2
    const length = options.peplumSize * store.get('frontLength')

    ;['top', 'bottom'].forEach((prefix) => {
      const offset = prefix == 'top' ? 0 : length
      points[prefix + 'Middle'] = new Point(0, offset)
      points[prefix + 'MiddleCp1'] = points[prefix + 'Middle'].shift(0, (offset + radius) * cbqc)
      points[prefix + 'MiddleCp2'] = points[prefix + 'Middle'].shift(180, (offset + radius) * cbqc)
      points[prefix + 'Left'] = new Point(-1 * radius + -1 * offset, -1 * radius)
      points[prefix + 'LeftCp1'] = points[prefix + 'Left'].shift(270, (offset + radius) * cbqc)
      points[prefix + 'LeftCp2'] = points[prefix + 'Left'].shift(90, (offset + radius) * cbqc)
      points[prefix + 'Right'] = new Point(radius - -1 * offset, -1 * radius)
      points[prefix + 'RightCp1'] = points[prefix + 'Right'].shift(90, (offset + radius) * cbqc)
      points[prefix + 'RightCp2'] = points[prefix + 'Right'].shift(270, (offset + radius) * cbqc)

      paths[prefix] = new Path()
        .move(points[prefix + 'Left'])
        .curve(points[prefix + 'LeftCp1'], points[prefix + 'MiddleCp2'], points[prefix + 'Middle'])
        .curve(points[prefix + 'MiddleCp1'], points[prefix + 'RightCp2'], points[prefix + 'Right'])
    })

    console.log({ points: JSON.parse(JSON.stringify(points)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    return part
  },
}
