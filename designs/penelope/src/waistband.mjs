import { pctBasedOn } from '@freesewing/core'
import { options } from './shape.mjs'

const { waistEase } = options

export const waistband = {
  name: 'penelope.waistband',
  measurements: ['waist', 'waistToKnee'],
  options: {
    waistEase,
    waistband: { bool: true, menu: 'style' },
    waistbandWidth: {
      pct: 10,
      min: 5,
      max: 20,
      ...pctBasedOn('waistToKnee'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (settings?.options?.waistband === false ? false : 'style'),
    },
    waistbandOverlap: {
      pct: 3.5,
      min: 0,
      max: 10,
      ...pctBasedOn('waist'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (settings?.options?.waistband === false ? false : 'style'),
    },
  },
  draft: ({
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    sa,
    macro,
    store,
    expand,
    units,
    part,
  }) => {
    if (!options.waistband) return part.hide()

    let waist = measurements.waist
    waist += measurements.waist * options.waistEase
    const waistbandWidth = options.waistbandWidth * measurements.waistToKnee
    const waistbandLength = waist / 2 + measurements.waist * options.waistbandOverlap
    store.set('waistbandWidth', waistbandWidth)

    if (!expand) {
      // Expand is on, do not draw the part but flag this to the user
      store.flag.note({
        msg: `penelope:cutWaistband`,
        replace: {
          width: units(waistbandLength),
          length: units(waistbandWidth),
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

    points.TL = new Point(0, 0)
    points.BL = new Point(0, waist / 2 + options.waistbandOverlap)
    points.TR = new Point(waistbandWidth, 0)
    points.BR = new Point(waistbandWidth, waist / 2 + options.waistbandOverlap)

    points.titleAnchor = new Point(waistbandWidth / 2, waist / 6)
    points.logoAnchor = new Point(waistbandWidth / 2, waist / 3)
    points.gridAnchor = points.logoAnchor.clone()

    paths.outline = new Path()
      .move(points.TL)
      .line(points.BL)
      .line(points.BR)
      .line(points.TR)
      .line(points.TL)
      .close()
      .attr('class', 'fabric')

    macro('cutonfold', {
      from: points.TR,
      to: points.TL,
      grainline: true,
      reverse: true,
    })

    snippets.logo = new Snippet('logo', points.logoAnchor)

    store.cutlist.addCut({ cut: 1, from: 'fabric' })

    macro('title', {
      nr: 3,
      at: points.titleAnchor,
      title: 'waistband',
      rotation: 90,
      scale: 0.75,
    })

    if (sa) {
      paths.sa = new Path()
        .move(points.TL)
        .join(new Path().move(points.TL).line(points.BL).line(points.BR).line(points.TR).offset(sa))
        .line(points.TR)
        .attr('class', 'fabric sa')
    }

    macro('vd', {
      from: points.TL,
      to: points.BL,
      x: points.TL.x + options.paperlessOffset,
      id: 'height',
    })
    macro('hd', {
      from: points.BL,
      to: points.BR,
      y: points.BR.y - options.paperlessOffset,
      id: 'width',
    })

    return part
  },
}
