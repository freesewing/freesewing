import { pctBasedOn } from '@freesewing/core'
import { cup } from './cup.mjs'

export const bandTie = {
  name: 'bee.bandTie',
  after: cup,
  options: {
    //Style
    bandTieWidth: {
      pct: 3,
      min: 1,
      max: 9,
      snap: 6.35,
      ...pctBasedOn('hpsToWaistFront'),
      menu: 'style',
    },
    pointedBandTieEnds: { bool: false, menu: 'style' },
    duoBandTieColours: { bool: false, menu: 'style' },
  },
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    macro,
    measurements,
    snippets,
    expand,
    Snippet,
    paperless,
    utils,
    absoluteOptions,
    part,
  }) => {
    //lock option
    if (options.reversible) options.duoBandTieColours = true
    //measures
    const bandTieLength = options.crossBackTies
      ? (measurements.underbust * options.bandLength) / 2 + options.neckTieWidth * 2
      : (measurements.underbust * (1 + options.bandTieLength)) / 2
    const bandTieWidth =
      options.crossBackTies || !options.duoBandTieColours
        ? absoluteOptions.bandTieWidth * 2
        : absoluteOptions.bandTieWidth

    /*
     * Don't bother unless expand is set
     */
    if (((!expand && !options.pointedBandTieEnds) || !options.ties) && !options.crossBackTies) {
      const extraSa = sa ? 2 * sa : 0
      store.flag.note({
        msg: `bee:cutBandTie`,
        notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded'],
        replace: {
          width: utils.units(bandTieWidth + extraSa),
          length: utils.units(bandTieLength * 2),
        },
      })

      return part
    }
    //let's begin
    points.topLeft = new Point(0, 0)
    points.topRight = new Point(bandTieWidth, points.topLeft.y)
    points.bottomLeft = new Point(points.topLeft.x, bandTieLength)
    points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
    points.topMid = new Point(points.topRight.x / 2, points.topLeft.y)
    points.bottomMid = new Point(points.topMid.x, points.bottomLeft.y)

    points.topPeak =
      options.crossBackTies || !options.pointedBandTieEnds
        ? points.topMid
        : options.duoBandTieColours
          ? points.topRight.shift(90, bandTieWidth)
          : points.topMid.shift(90, bandTieWidth / 2)
    //paths
    paths.seam = new Path()
      .move(points.bottomRight)
      .line(points.topRight)
      .line(points.topPeak)
      .line(points.topLeft)
      .line(points.bottomLeft)
      .close()
      .addClass('fabric')

    if (sa) paths.sa = paths.seam.offset(sa).close().addClass('fabric sa')

    //detail
    //grainline
    points.cutOnFoldFrom = points.bottomLeft
    points.cutOnFoldTo = points.bottomRight
    macro('cutonfold', {
      from: points.cutOnFoldFrom,
      to: points.cutOnFoldTo,
      grainline: true,
    })
    //cutlist
    store.cutlist.addCut({ cut: 1, from: 'fabric', onfold: 'true' })
    if (options.duoBandTieColours && !options.crossBackTies)
      store.cutlist.addCut({ cut: 1, from: 'constrast', onfold: 'true' })
    //notches
    if (options.crossBackTies) {
      points.sideNotchLeft = points.bottomLeft.shift(90, store.get('cupWidth'))
      points.sideNotchRight = points.sideNotchLeft.flipX(points.topMid)
      macro('sprinkle', {
        snippet: 'notch',
        on: ['bottomRight', 'sideNotchLeft', 'sideNotchRight'],
      })
    }
    //title
    points.title = points.topLeft.translate(bandTieWidth / 8, bandTieLength / 4)
    macro('title', {
      at: points.title,
      nr: 3,
      title: options.crossBackTies ? 'band' : 'bandTie',
      scale: 0.7,
    })
    //fold-line
    if (options.crossBackTies || !options.duoBandTieColours) {
      paths.foldline = new Path()
        .move(points.topPeak)
        .line(points.bottomMid)
        .addText('foldLine', 'center fill-note text-sm')
        .addClass('note help')
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

      if (options.pointedBandTieEnds && !options.crossBackTies) {
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
        if (!options.duoBandTieColours) {
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
