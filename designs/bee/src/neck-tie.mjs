import { pctBasedOn } from '@freesewing/core'

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
    reversible: { bool: false, menu: 'style' },
  },
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    units,
    complete,
    macro,
    measurements,
    expand,
    absoluteOptions,
    part,
  }) => {
    if (!options.ties) part.hide()

    const neckTieLength = options.crossBackTies
      ? (Math.sqrt(
          Math.pow(measurements.hpsToWaistFront, 2) +
            Math.pow(measurements.underbust - measurements.underbust * options.neckTieLength, 2)
        ) +
          measurements.underbust -
          measurements.underbust * options.bandLength +
          measurements.underbust -
          measurements.underbust * options.bandLength * options.neckTieLength) /
        2
      : (measurements.hpsToBust + measurements.hpsToBust * options.neckTieLength) / 2
    store.set('neckTieLength', neckTieLength * 2)

    /*
     * Don't bother unless expand is set
     */
    if (!expand) {
      store.flag.note({
        title: `bee:cutNeckTie.t`,
        desc: `bee:cutNeckTie.d`,
        replace: {
          width: units(absoluteOptions.neckTieWidth * 2 + 2 * sa),
          length: units(neckTieLength * 2),
        },
        suggest: {
          text: 'flag:show',
          icon: 'expand',
          update: {
            settings: ['expand', 1],
          },
        },
      })
      // Also hint about expand
      store.flag.preset('expand')

      return part.hide()
    }

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(absoluteOptions.neckTieWidth * 2, points.topLeft.y)
    points.bottomLeft = new Point(points.topLeft.x, neckTieLength)
    points.bottomRight = new Point(points.topRight.x, neckTieLength)

    points.topMiddle = options.pointedTieEnds
      ? new Point(absoluteOptions.neckTieWidth, points.topLeft.y - absoluteOptions.neckTieWidth)
      : new Point(absoluteOptions.neckTieWidth, points.topLeft.y)

    points.bottomMiddle = new Point(points.topMiddle.x, neckTieLength)

    paths.seam = options.duoColorTies
      ? new Path()
          .move(points.bottomMiddle)
          .line(points.topMiddle)
          .line(points.topLeft)
          .line(points.bottomLeft)
          .close()
          .addClass('fabric')
      : new Path()
          .move(points.bottomRight)
          .line(points.topRight)
          .line(points.topMiddle)
          .line(points.topLeft)
          .line(points.bottomLeft)
          .close()
          .addClass('fabric')

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    /*
     * Annotations
     */
    points.cofLeft = points.bottomLeft.shift(0, absoluteOptions.neckTieWidth * (1 / 8))
    points.grainlineLeft = points.topLeft.translate(
      absoluteOptions.neckTieWidth * (1 / 8),
      neckTieLength * (3 / 4)
    )

    // Cut list
    if (options.reversible) {
      store.cutlist.addCut({ cut: 2, from: 'fabric' })
      store.cutlist.addCut({ cut: 2, from: 'altFabric1' })
    } else {
      store.cutlist.addCut({ cut: 4, from: 'fabric' })
    }

    // Title
    points.title = points.topLeft.translate(
      absoluteOptions.neckTieWidth * (1 / 8),
      neckTieLength * (1 / 4)
    )
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'neck tie',
      scale: 0.5,
    })

    if (options.duoColorTies) {
      points.cofRight = points.bottomLeft.shift(0, absoluteOptions.neckTieWidth * (7 / 8))
      points.grainlineRight = points.grainlineLeft.shift(0, absoluteOptions.neckTieWidth * (7 / 8))
    } else {
      points.cofRight = points.bottomLeft.shift(0, absoluteOptions.neckTieWidth * (15 / 8))
      points.grainlineRight = points.grainlineLeft.shift(0, absoluteOptions.neckTieWidth * (14 / 8))
      if (complete)
        paths.foldline = new Path()
          .move(points.bottomMiddle)
          .line(points.topMiddle)
          .addText('foldLine', 'center fill-note text-sm')
          .addClass('note help')
    }

    // Grainline
    macro('grainline', {
      from: points.grainlineLeft,
      to: points.grainlineRight,
      classes: {
        text: 'text-sm fill-note',
        line: 'stroke-sm',
      },
    })

    // Cut on fold
    macro('cutonfold', {
      from: points.cofLeft,
      to: points.cofRight,
      offset: 10,
      classes: {
        text: 'text-sm center fill-note',
        line: 'stroke-sm note',
      },
    })

    // Dimensions
    macro('vd', {
      id: 'hLeft',
      from: points.bottomLeft,
      to: points.topMiddle,
      x: points.topLeft.x - sa - 20,
    })
    macro('hd', {
      id: 'wTop',
      from: points.topLeft,
      to: options.duoColorTies ? points.topMiddle : points.topRight,
      y: points.topLeft.x - sa - 20,
    })

    return part
  },
}
