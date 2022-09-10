import { pctBasedOn } from '@freesewing/core'
import { pluginBundle } from '@freesewing/plugin-bundle'

export const neckTie = {
  name: 'bee.neckTie',
  measurements: ['underbust', 'hpsToBust', 'hpsToWaistFront'],
  options: {
    ties: { bool: true, menu: 'style' },
    crossBackTies: { bool: false, menu: 'style' },
    bandLength: { pct: 85, min: 75, max: 90, menu: 'style' },
    neckTieLength: { pct: 80, min: 70, max: 100, menu: 'style' },
    neckTieWidth: {
      pct: 6,
      min: 2,
      max: 18,
      snap: {
        metric: [6, 13, 19, 25, 32, 38],
        imperial: [6.35, 12.7, 19.05, 25.4, 31.75, 38.1],
      },
      menu: 'style',
      ...pctBasedOn('bustSpan'),
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
    // neck tie
    if (!options.ties) {
      part.render = false
    }
    let neckTieLength
    if (options.crossBackTies)
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
    else
      neckTieLength = (measurements.hpsToBust + measurements.hpsToBust * options.neckTieLength) / 2
    store.set('neckTieLength', neckTieLength * 2)
    points.topLeft = new Point(0, 0)
    points.topRight = new Point(absoluteOptions.neckTieWidth * 2, points.topLeft.y)
    points.bottomLeft = new Point(points.topLeft.x, neckTieLength)
    points.bottomRight = new Point(points.topRight.x, neckTieLength)
    switch (options.neckTieEnds) {
      case 'straight':
        points.topMiddle = new Point(absoluteOptions.neckTieWidth, points.topLeft.y)
        break
      case 'pointed':
        points.topMiddle = new Point(
          absoluteOptions.neckTieWidth,
          points.topLeft.y - absoluteOptions.neckTieWidth
        )
    }

    points.bottomMiddle = new Point(points.topMiddle.x, neckTieLength)

    switch (options.neckTieColours) {
      case 'one':
        paths.seam = new Path()
          .move(points.bottomRight)
          .line(points.topRight)
          .line(points.topMiddle)
          .line(points.topLeft)
          .line(points.bottomLeft)
          .close()
        break
      case 'two':
        paths.seam = new Path()
          .move(points.bottomMiddle)
          .line(points.topMiddle)
          .line(points.topLeft)
          .line(points.bottomLeft)
          .close()
    }

    if (complete) {
      points.cofLeft = points.bottomLeft.shift(0, absoluteOptions.neckTieWidth * (1 / 8))
      points.grainlineLeft = points.topLeft.translate(
        absoluteOptions.neckTieWidth * (1 / 8),
        neckTieLength * (3 / 4)
      )
      points.title = points.topLeft.translate(
        absoluteOptions.neckTieWidth * (1 / 8),
        neckTieLength * (1 / 4)
      )
      macro('title', {
        at: points.title,
        nr: 2,
        title: 'neck tie',
        scale: 0.2,
      })
      switch (options.neckTieColours) {
        case 'one':
          points.cofRight = points.bottomLeft.shift(0, absoluteOptions.neckTieWidth * (15 / 8))
          points.grainlineRight = points.grainlineLeft.shift(
            0,
            absoluteOptions.neckTieWidth * (14 / 8)
          )
          paths.foldline = new Path()
            .move(points.topMiddle)
            .line(points.bottomMiddle)
            .attr('data-text', 'Fold-line')
            .attr('data-text-class', 'center')
            .attr('class', 'various')
          break
        case 'two':
          points.cofRight = points.bottomLeft.shift(0, absoluteOptions.neckTieWidth * (7 / 8))
          points.grainlineRight = points.grainlineLeft.shift(
            0,
            absoluteOptions.neckTieWidth * (7 / 8)
          )
      }
      macro('grainline', {
        from: points.grainlineLeft,
        to: points.grainlineRight,
      })
      macro('cutonfold', {
        from: points.cofLeft,
        to: points.cofRight,
        grainline: true,
      })
      if (sa) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
      if (paperless) {
        macro('vd', {
          from: points.bottomLeft,
          to: points.topLeft,
          x: points.topLeft.x - sa - 20,
        })
        macro('hd', {
          from: points.topLeft,
          to: points.topMiddle,
          y: points.topLeft.x - sa - 20,
        })
        switch (options.neckTieColours) {
          case 'one':
            macro('hd', {
              from: points.topLeft,
              to: points.topRight,
              y: points.topLeft.x - sa - 30,
            })
            break
          case 'two':
        }
        switch (options.neckTieEnds) {
          case 'straight':
            macro('hd', {
              from: points.topLeft,
              to: points.topMiddle,
              y: points.topLeft.x - sa - 20,
            })
            break
          case 'pointed':
            macro('vd', {
              from: points.topLeft,
              to: points.topMiddle,
              x: points.topLeft.x - sa - 20,
            })
            macro('vd', {
              from: points.bottomLeft,
              to: points.topMiddle,
              x: points.topLeft.x - sa - 30,
            })
        }
      }
    }

    return part
  },
}
