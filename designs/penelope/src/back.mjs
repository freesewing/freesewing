import { pluginBundle } from '@freesewing/plugin-bundle'
import { measurements, optionalMeasurements, options, BuildMainShape } from './shape.mjs'

function penelopeBack(params) {
  const {
    options,
    measurements,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    store,
    complete,
    sa,
    paperless,
    macro,
    part,
  } = params

  BuildMainShape(params, false)

  if (options.backVent == true) {
    // I don't care what you're trying to create, the vent will not go higher than your hips.
    let backVentLength = Math.min(
      store.get('skirtLength') - measurements.waistToHips,
      options.backVentLength * store.get('skirtLength')
    )

    points.vLeg = points.rLeg.shiftFractionTowards(points.lLeg, 1 + options.backVentWidth)
    points.vHem = points.rHem.shiftFractionTowards(points.lHem, 1 + options.backVentWidth)
    points.vTop = points.vLeg.shift(90, backVentLength)
    points.lVent = points.vTop
      .shift(0, points.lLeg.dx(points.rLeg) * options.backVentWidth)
      .shift(90, points.lLeg.dx(points.rLeg) * options.backVentWidth)

    paths.vent = new Path()
      .move(points.lVent)
      .line(points.vTop)
      .line(points.vLeg)
      .line(points.vHem)
      .hide()

    paths.leftSide = new Path().move(points.lWaist).line(points.lVent).join(paths.vent).hide()

    paths.hem = paths.hem.line(points.vLeg)
  }

  paths.seam = paths.leftSide
    .clone()
    .join(paths.bottom)
    .join(paths.sideSeam)
    .join(paths.waist)
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })

    snippets.logo = new Snippet('logo', points.logoAnchor)

    if (options.backVent == false && options.zipperLocation != 'backSeam') {
      macro('cutonfold', {
        from: points.lWaist,
        to: points.lLeg,
        margin: 5,
        offset: 10,
      })
    }
    macro('title', {
      nr: 2,
      at: points.titleAnchor,
      title: 'back',
    })

    if (sa) {
      if (options.backVent || options.zipperLocation == 'backSeam') {
        paths.sa = paths.leftSide
          .clone()
          .join(paths.bottom)
          .join(paths.sideSeam)
          .join(paths.waistSA)
          .line(points.lWaist)
          .close()
          .offset(sa)
          .attr('class', 'fabric sa')
      } else {
        paths.sa = new Path()
          .move(points.lHem)
          .join(paths.bottom.join(paths.sideSeam).join(paths.waistSA).offset(sa))
          .line(points.lWaist)
          .attr('class', 'fabric sa')
      }
    }
  }

  if (paperless) {
    if (options.backVent) {
      macro('hd', {
        from: points.vHem,
        to: points.rHem,
        y: points.rHem.y - options.paperlessOffset - sa,
      })
      macro('hd', {
        from: points.vTop,
        to: points.lVent,
        y: points.vTop.y,
      })

      macro('vd', {
        from: points.lSeat,
        to: points.lVent,
        x: points.lWaist.x - options.paperlessOffset - sa,
      })
      macro('vd', {
        from: points.lVent,
        to: points.vTop,
        x: points.lVent.x,
      })
    } else {
      macro('hd', {
        from: points.lHem,
        to: points.rHem,
        y: points.rHem.y - options.paperlessOffset - sa,
      })
    }
  }

  return part
}

export const back = {
  name: 'penelope.back',
  measurements,
  optionalMeasurements,
  options,
  plugins: [pluginBundle],
  draft: penelopeBack,
}
