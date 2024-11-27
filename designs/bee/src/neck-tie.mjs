import { pctBasedOn } from '@freesewing/core'

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
      menu: 'style',
      ...pctBasedOn('bustSpan'),
    },
    pointedNeckTieEnds: { bool: false, menu: 'style' },
    duoNeckTieColours: { bool: false, menu: 'style' },
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
    paperless,
    macro,
    measurements,
    expand,
    absoluteOptions,
    part,
  }) => {
    //lock option
    if (options.reversible) options.duoNeckTieColours = true
    //measures
    const neckTieLength = options.crossBackTies
      ? Math.sqrt(
          Math.pow(measurements.hpsToWaistFront, 2) +
            Math.pow(
              (measurements.underbust * options.bandLength - measurements.underbust * 0.5) * 0.5,
              2
            )
        ) *
        (1 + options.neckTieLength)
      : measurements.hpsToBust * (1 + options.neckTieLength)
    const neckTieWidth = options.duoNeckTieColours
      ? absoluteOptions.neckTieWidth
      : absoluteOptions.neckTieWidth * 2
    store.set('neckTieLength', neckTieLength)
    /*
     * Don't bother unless expand is set
     */
    if ((!expand && !options.pointedNeckTieEnds) || !options.ties) {
      const extraSa = sa ? 2 * sa : 0
      store.flag.note({
        msg: `bee:cutNeckTie`,
        notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded'],
        replace: {
          width: units(neckTieWidth + extraSa),
          length: units(neckTieLength),
        },
      })

      return part.hide()
    }
    //let's begin
    points.topLeft = new Point(0, 0)
    points.topRight = new Point(neckTieWidth, points.topLeft.y)
    points.bottomLeft = new Point(points.topLeft.x, neckTieLength)
    points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
    points.topMid = new Point(neckTieWidth / 2, points.topLeft.y)
    points.bottomMid = new Point(points.topMid.x, points.bottomLeft.y)

    points.topPeak = options.pointedNeckTieEnds
      ? options.duoNeckTieColours
        ? points.topRight.shift(90, neckTieWidth)
        : points.topMid.shift(90, neckTieWidth / 2)
      : points.topMid

    //paths
    paths.seam = new Path()
      .move(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topPeak)
      .line(points.topLeft)
      .line(points.bottomLeft)
      .close()
      .addClass('fabric')

    if (sa) paths.sa = paths.seam.offset(sa).close().addClass('fabric sa')

    //details
    //grainline
    points.grainlineFrom = points.topLeft.shift(0, absoluteOptions.neckTieWidth / 2)
    points.grainlineTo = new Point(points.grainlineFrom.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })
    //cutlist
    store.cutlist.addCut({ cut: 2, from: 'fabric', identical: 'true' })
    if (options.duoNeckTieColours)
      store.cutlist.addCut({ cut: 2, from: 'constrast', identical: 'true' })
    //title
    points.title = points.topLeft.translate(
      absoluteOptions.neckTieWidth / 8,
      points.bottomLeft.y / 4
    )
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'neckTie',
      scale: 0.2,
    })
    //fold line
    if (!options.duoNeckTieColours) {
      paths.foldline = new Path()
        .move(points.topPeak)
        .line(points.bottomMid)
        .addText('foldLine', 'center fill-note text-sm')
        .attr('class', 'note help')
    }
    //paperless
    if (paperless) {
      macro('vd', {
        from: points.topLeft,
        to: points.bottomLeft,
        x: points.topLeft.x - sa - 15,
        id: 'vd0',
      })
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
        id: 'hd0',
      })
      if (options.pointedNeckTieEnds) {
        macro('vd', {
          from: points.topPeak,
          to: points.topLeft,
          x: points.topLeft.x - sa - 15,
          id: 'vdP0',
        })
        macro('vd', {
          from: points.topPeak,
          to: points.bottomLeft,
          x: points.topLeft.x - sa - 30,
          id: 'vdP1',
        })
        if (!options.duoNeckTieColours) {
          macro('hd', {
            from: points.topLeft,
            to: points.topPeak,
            y: points.topPeak.y - sa - 15,
            id: 'hdP0',
          })
        }
      }
    }

    return part
  },
}
