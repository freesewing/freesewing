import { waistEase } from './shape.mjs'

function penelopeWaistband({
  options,
  measurements,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  macro,
  store,
  part,
}) {
  if (!options.waistBand) return part.hide()

  let waist = measurements.waist
  waist += measurements.waist * options.waistEase
  store.set('waistBandWidth', options.waistBandWidth * measurements.waistToKnee)

  points.TL = new Point(0, 0)
  points.BL = new Point(0, waist / 2 + options.waistBandOverlap)
  points.TR = new Point(store.get('waistBandWidth'), 0)
  points.BR = new Point(store.get('waistBandWidth'), waist / 2 + options.waistBandOverlap)

  points.titleAnchor = new Point(store.get('waistBandWidth') / 2, waist / 6)
  points.logoAnchor = new Point(store.get('waistBandWidth') / 2, waist / 3)

  paths.outline = new Path()
    .move(points.TL)
    .line(points.BL)
    .line(points.BR)
    .line(points.TR)
    .line(points.TL)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.TR,
      to: points.TL,
      margin: 15,
      offset: 15,
      grainline: true,
    })

    snippets.logo = new Snippet('logo', points.logoAnchor)

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
  }

  if (paperless) {
    macro('vd', {
      from: points.TL,
      to: points.BL,
      x: points.TL.x + options.paperlessOffset,
    })
    macro('hd', {
      from: points.BL,
      to: points.BR,
      y: points.BR.y - options.paperlessOffset,
    })
  }

  return part
}

export const waistband = {
  name: 'penelope.waistband',
  measurements: ['waist', 'waistToKnee'],
  options: {
    waistEase,
    waistBandOverlap: 25,
    waistBand: { bool: true, menu: 'style' },
    waistBandWidth: { pct: 10, min: 5, max: 20, menu: 'style' },
  },
  draft: penelopeWaistband,
}
