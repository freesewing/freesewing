import * as shared from './shared.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { pluginCutlist } from '@freesewing/plugin-cutlist'

function draftNeckband({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  part,
  store,
  paperless,
  complete,
  sa,
  macro,
  snippets,
  Snippet,
}) {
  let adjustedNeckCircumference = measurements.neck * (1 + options.neckEase)
  let neckbandLength = options.neckbandLength * adjustedNeckCircumference
  let neckbandWidth = 2 * (options.neckbandWidth * adjustedNeckCircumference)

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, neckbandWidth)
  points.bottomRightCorner = new Point(neckbandLength / 2, neckbandWidth)
  points.topRightCorner = new Point(neckbandLength / 2, 0)

  paths.neckband = new Path()
    .move(points.topLeftCorner)
    .line(points.bottomLeftCorner)
    .line(points.bottomRightCorner)
    .line(points.topRightCorner)
    .line(points.topLeftCorner)
    .attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      from: points.topLeftCorner,
      to: points.bottomLeftCorner,
      x: -(15 + sa),
    })
    macro('hd', {
      from: points.topLeftCorner,
      to: points.topRightCorner,
      y: -(sa + 15),
    })
  }

  if (complete) {
    macro('cutonfold', {
      from: points.topLeftCorner,
      to: points.bottomLeftCorner,
      grainline: true,
    })

    points.title = new Point(neckbandLength / 4, neckbandWidth / 2)
    macro('title', { at: points.title, nr: 4, title: 'neckband' })

    if (sa) {
      paths.sa = paths.neckband.offset(sa).close().attr('class', 'fabric sa')
    }
  }

  return part
}

export const neckband = {
  name: 'swimshirt.neckband',
  plugins: [pluginBundle, pluginCutlist],
  draft: draftNeckband,
  measurements: ['neck', 'chest', 'biceps', 'wrist'],
  options: {
    // How long the neckband should be, as a percentage of the length of the neck hole.
    neckbandLength: { pct: 85, min: 60, max: 100, menu: 'fit' },
    // How wide the neckband should be, as a percentage of the neckband length.
    neckbandWidth: { pct: 7.5, min: 0, max: 30, menu: 'fit' },
  },
}
