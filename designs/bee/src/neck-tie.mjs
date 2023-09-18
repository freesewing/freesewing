import { pctBasedOn } from '@freesewing/core'
import { pluginBundle } from '@freesewing/plugin-bundle'

export const neckTie = {
  name: 'bee.neckTie',
  measurements: ['underbust', 'hpsToBust', 'hpsToWaistFront'],
  options: {
    //Style
    ties: { bool: true, menu: 'style' },
    crossBackTies: { bool: false, menu: 'style' },
    bandLength: { pct: 85, min: 75, max: 90, menu: 'style' },
    neckTieLength: { pct: 80, min: 70, max: 100, menu: 'style' },
    neckTieWidth: {
      pct: 6,
      min: 2,
      max: 18,
      snap: 6.35,
      ...pctBasedOn('bustSpan'),
      menu: 'style',
    },
    neckTieEnds: { dflt: 'straight', list: ['straight', 'pointed'], menu: 'style' },
    neckTieColours: { dflt: 'one', list: ['one', 'two'], menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    paperless,
    macro,
    measurements,
    absoluteOptions,
    part,
  }) => {
    // measures need for other parts
    let neckTieLength
    if (options.crossBackTies) {
      neckTieLength =
        (Math.sqrt(
          Math.pow(measurements.hpsToWaistFront, 2) +
            Math.pow(measurements.underbust - measurements.underbust * options.neckTieLength, 2)
        ) +
          measurements.underbust -
          measurements.underbust * options.bandLength +
          measurements.underbust -
          measurements.underbust * options.bandLength * options.neckTieLength) /
        2
    } else {
      neckTieLength = (measurements.hpsToBust + measurements.hpsToBust * options.neckTieLength) / 2
    }
    store.set('neckTieLength', neckTieLength * 2)
    //set render
    if (!options.ties) {
      return part.hide()
    }
    //measures
    let neckTieWidth = absoluteOptions.neckTieWidth * 2
    if (options.neckTieColours == 'two') {
      neckTieWidth = absoluteOptions.neckTieWidth
    }
    //let's begin
    points.topLeft = new Point(0, 0)
    points.topRight = new Point(neckTieWidth, points.topLeft.y)
    points.bottomLeft = new Point(points.topLeft.x, neckTieLength)
    points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
    points.topMid = new Point(neckTieWidth / 2, points.topLeft.y)
    points.bottomMid = new Point(points.topMid.x, points.bottomLeft.y)
    if (options.neckTieEnds == 'straight') {
      points.topPeak = points.topMid
    } else {
      if (options.neckTieColours == 'one') {
        points.topPeak = points.topMid.shift(90, neckTieWidth / 2)
      } else {
        points.topPeak = points.topRight.shift(90, neckTieWidth)
      }
    }
    //paths
    paths.seam = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topPeak)
      .line(points.topLeft)
      .line(points.bottomLeft)
      .close()

    if (complete) {
      //grainline
      points.cutOnFoldFrom = points.bottomLeft
      points.cutOnFoldTo = points.bottomRight

      macro('cutonfold', {
        from: points.cutOnFoldFrom,
        to: points.cutOnFoldTo,
        grainline: true,
      })
      //title
      points.title = points.topLeft.translate(neckTieWidth * (1 / 8), neckTieLength * (1 / 4))
      macro('title', {
        at: points.title,
        nr: 2,
        title: 'neckTie',
        scale: 0.2,
      })
      //fold line
      if (options.neckTieColours == 'one') {
        paths.foldline = new Path()
          .move(points.topPeak)
          .line(points.bottomMid)
          .attr('data-text', 'Fold-line')
          .attr('data-text-class', 'center')
          .attr('class', 'various')
      }
      if (sa) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }
    if (paperless) {
      macro('vd', {
        from: points.topLeft,
        to: points.bottomLeft,
        x: points.topLeft.x - sa - 15,
      })
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
      })

      if (options.neckTieEnds == 'pointed') {
        macro('vd', {
          from: points.topPeak,
          to: points.topLeft,
          x: points.topLeft.x - sa - 15,
        })
        macro('vd', {
          from: points.topPeak,
          to: points.bottomLeft,
          x: points.topLeft.x - sa - 30,
        })
      }
    }

    return part
  },
}
