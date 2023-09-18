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
    bandTieLength: { pct: 35, min: 30, max: 50, menu: 'style' },
    bandTieEnds: { dflt: 'straight', list: ['straight', 'pointed'], menu: 'style' },
    bandTieColours: { dflt: 'one', list: ['one', 'two'], menu: 'style' },
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
    paperless,
    macro,
    measurements,
    absoluteOptions,
    part,
  }) => {
    //set Render
    if (!options.ties && !options.crossBackTies) {
      return part.hide()
    }
    //measures
    let bandTieLength
    if (options.crossBackTies) {
      bandTieLength = (measurements.underbust * options.bandLength) / 2 + options.bandTieWidth * 2
    } else {
      bandTieLength = (measurements.underbust + measurements.underbust * options.bandTieLength) / 2
    }

    let bandTieWidth
    if (options.crossBackTies || options.bandTieColours == 'one') {
      bandTieWidth = absoluteOptions.bandTieWidth * 2
    } else {
      bandTieWidth = absoluteOptions.bandTieWidth
    }
    //let's begin
    points.topLeft = new Point(0, 0)
    points.topRight = new Point(bandTieWidth, points.topLeft.y)
    points.bottomLeft = new Point(points.topLeft.x, bandTieLength)
    points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
    points.topMid = new Point(points.topRight.x / 2, points.topLeft.y)
    points.bottomMid = new Point(points.topMid.x, points.bottomLeft.y)

    if (options.bandTieEnds == 'straight' || options.crossBackTies) {
      points.topPeak = points.topMid
    } else {
      if (options.bandTieColours == 'one') {
        points.topPeak = points.topMid.shift(90, bandTieWidth / 2)
      } else {
        points.topPeak = points.topRight.shift(90, bandTieWidth)
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
      //notches
      if (options.crossBackTies) {
        points.sideNotch = points.bottomRight.shift(90, store.get('cupWidth'))
        macro('sprinkle', {
          snippet: 'notch',
          on: ['bottomRight', 'sideNotch'],
        })
      }
      //title
      let titleName = 'band'
      if (!options.crossBackTies) {
        titleName = titleName + 'Tie'
      }
      points.title = points.topLeft.translate(bandTieWidth * (1 / 8), bandTieLength * (1 / 4))
      macro('title', {
        at: points.title,
        nr: 3,
        title: titleName,
        scale: 0.2,
      })
      //fold line
      if (options.crossBackTies || options.bandTieColours == 'one') {
        paths.foldline = new Path()
          .move(points.topPeak)
          .line(points.bottomMid)
          .attr('class', 'various')
          .attr('data-text', 'Fold-line')
          .attr('data-text-class', 'center')
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

      if (options.bandTieEnds == 'pointed' && !options.crossBackTies) {
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
