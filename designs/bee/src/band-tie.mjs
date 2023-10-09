import { cup } from './cup.mjs'

export const bandTie = {
  name: 'bee.bandTie',
  after: cup,
  options: {
    bandTieWidth: {
      pct: 3,
      min: 1,
      max: 9,
      snap: {
        metric: [6, 13, 19, 25, 32, 38],
        imperial: [6.35, 12.7, 19.05, 25.4, 31.75, 38.1],
      },
      toAbs: (pct, { measurements }) => measurements.hpsToWaistFront * pct,
      menu: 'style',
    },
    bandTieLength: { pct: 35, min: 30, max: 50, menu: 'style' },
  },
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    macro,
    measurements,
    snippets,
    expand,
    Snippet,
    utils,
    absoluteOptions,
    part,
  }) => {
    if (!options.ties && !options.crossBackTies) part.hide()

    const bandTieLength = options.crossBackTies
      ? (measurements.underbust * options.bandLength) / 2 + options.neckTieWidth * 2
      : (measurements.underbust + measurements.underbust * options.bandTieLength) / 2
    const bandTieWidth = options.crossBackTies
      ? absoluteOptions.bandTieWidth * 2
      : absoluteOptions.bandTieWidth

    /*
     * Don't bother unless expand is set
     */
    if (!expand) {
      points.text = new Point(10, 10)
        .addText('bee:cutBandTie', 'fill-note')
        .addText(':')
        .addText(utils.units((bandTieWidth + sa) * 2))
        .addText(' x ')
        .addText(utils.units(bandTieLength))
      paths.diag = new Path().move(new Point(0, 0)).line(new Point(100, 15)).addClass('hidden')

      return part
    }

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(bandTieWidth * 2, points.topLeft.y)
    points.bottomLeft = new Point(points.topLeft.x, bandTieLength)
    points.bottomRight = new Point(points.topRight.x, bandTieLength)

    points.topMiddle = new Point(bandTieWidth, points.topLeft.y)
    if (!options.crossBackTies && options.pointedTieEnds) points.topMiddle.y -= bandTieWidth

    points.bottomMiddle = new Point(points.topMiddle.x, bandTieLength)

    paths.seam = options.duoColorTies
      ? new Path().move(points.bottomMiddle)
      : new Path().move(points.bottomRight).line(points.topRight)
    paths.seam.line(points.topMiddle).line(points.topLeft).line(points.bottomLeft).close()

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    /*
     * Annotations
     */

    // Cut list
    if (options.crossBackTies) store.cutlist.addCut({ cut: 1, from: 'fabric' })
    else store.cutlist.addCut({ cut: 2, from: 'fabric' })

    points.cofLeft = points.bottomLeft.shift(0, bandTieWidth * (1 / 8))
    points.grainlineLeft = points.topLeft.translate(bandTieWidth * (1 / 8), bandTieLength * (3 / 4))
    // Title
    points.title = points.topLeft.translate(bandTieWidth * (1 / 8), bandTieLength * (1 / 4))
    macro('title', {
      at: points.title,
      nr: 3,
      title: options.crossBackTies ? 'band' : 'bandTie',
      scale: 0.7,
    })

    // Foldline
    if (options.duoColorTies) {
      points.cofRight = points.bottomLeft.shift(0, bandTieWidth * (7 / 8))
      points.grainlineRight = points.grainlineLeft.shift(0, bandTieWidth * (7 / 8))
    } else {
      points.cofRight = points.bottomLeft.shift(0, bandTieWidth * (15 / 8))
      points.grainlineRight = points.grainlineLeft.shift(0, bandTieWidth * (14 / 8))
      if (complete)
        paths.foldline = new Path()
          .move(points.bottomMiddle)
          .line(points.topMiddle)
          .addText('foldLine', 'center fill-note text-sm')
          .attr('class', 'note help')
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

    if (complete && options.crossBackTies) {
      let gatherLength = store.get('gatherLength')
      snippets.centreNotch = new Snippet('notch', points.bottomRight)
      points.sideNotch = points.bottomRight.shift(90, gatherLength)
      snippets.sideNotch = new Snippet('notch', points.sideNotch)
    }

    macro('vd', {
      id: 'hLeft',
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - sa - 20,
    })
    macro('hd', {
      id: 'wTop',
      from: points.topLeft,
      to: options.duoColorties ? points.middleRight : points.topRight,
      y: points.topLeft.x - sa - 20,
    })

    return part
  },
}
