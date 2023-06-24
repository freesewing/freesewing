import { frontBase, xOnWaist } from './front-base.mjs'

function draftFrontLeft({
  Point,
  points,
  Path,
  paths,
  store,
  part,
  measurements,
  options,
  complete,
  sa,
  paperless,
  snippets,
  Snippet,
  macro,
  absoluteOptions,
  utils,
}) {
  /*
   * Basic outline was drafted in frontBase
   * Now we adapt it for the left panel
   * Left/Right is always from the vantage point the wearer
   */
  // Store the J-Seam dimensions to construct the fly shield later
  store.set('jseamWidth', points.jseamCorner.x)
  store.set('jseamHeight', points.jseamCorner.y)

  // Seamline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.jseamTopFe)
    .line(points.jseamCurveStartFe)
    .curve(points.jseamCpTopFe, points.jseamCpBottomFe, points.jseamBottomFe)
    .line(points.bottomLeft)
    .line(points.trueBottomRight)
    .line(points.frontPocketSide)
    .line(points.frontPocketCurveStart)
    .curve(points.frontPocketCpSide, points.frontPocketCpTop, points.frontPocketStart)
    .join(paths.frontWaistCenter)
    .close()
    .addClass('fabric')

  // Complete?
  if (complete) {
    // J-Seam
    paths.jseam = new Path()
      .move(points.jseamBottom)
      .curve(points.jseamCpBottom, points.jseamCpTop, points.jseamCurveStart)
      .line(points.jseamTop)
      .addClass('note dashed stroke-sm')
      .addText('jSeam', 'text-sm center fill-note')

    // Fly fold line
    paths.flyFold = new Path()
      .move(points.jseamBottom)
      .line(points.topLeft)
      .addClass('note help stroke-sm')

    macro('banner', {
      path: paths.flyFold,
      text: 'foldHere',
      className: 'text-sm fill-note',
    })

    points.grainlineTop = points.jseamTop.shiftFractionTowards(points.topLeft, 0.5)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })

    // Overwrite title from frontBase
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'frontLeft',
    })

    // Overwrite logo from frontBase
    points.logo = points.frontPocketCurveStart.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    /*
     * Add notches
     */
    macro('sprinkle', {
      snippet: 'notch',
      on: ['jseamTop', 'frontPocketBagStart', 'topLeft', 'jseamBottomFe'],
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.jseamTopFe,
      to: points.topLeft,
      y: points.jseamTopFe.y - sa - 15,
    })
    macro('hd', {
      from: points.topLeft,
      to: points.jseamTop,
      y: points.jseamTopFe.y - sa - 15,
    })
    macro('hd', {
      from: points.topLeft,
      to: points.frontPocketStart,
      y: points.jseamTopFe.y - sa - 30,
    })
    macro('hd', {
      from: points.jseamCurveStartFe,
      to: points.topLeft,
      y: points.jseamTopFe.y - sa - 30,
    })
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.jseamTopFe.y - sa - 45,
    })
    macro('hd', {
      from: points.topLeft,
      to: points.frontPocketSide,
      y: points.jseamTopFe.y - sa - 60,
    })
    macro('hd', {
      from: points.topLeft,
      to: points.trueBottomRight,
      y: points.jseamTopFe.y - sa - 75,
    })

    macro('hd', {
      from: points.bottomLeft,
      to: points.frontPocketSide,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.trueBottomRight,
      y: points.bottomLeft.y + sa + 30,
    })
    macro('hd', {
      from: points.jseamCurveStartFe,
      to: points.trueBottomRight,
      y: points.bottomLeft.y + sa + 45,
    })

    macro('vd', {
      from: points.trueBottomRight,
      to: points.frontPocketSide,
      x: points.trueBottomRight.x + sa + 15,
    })
    macro('vd', {
      from: points.trueBottomRight,
      to: points.frontPocketStart,
      x: points.trueBottomRight.x + sa + 30,
    })
    if (options.waistSlant) {
      macro('vd', {
        from: points.trueBottomRight,
        to: points.topRight,
        x: points.trueBottomRight.x + sa + 45,
      })
    }
  }

  return part
}

export const frontLeft = {
  name: 'collab:frontLeft',
  draft: draftFrontLeft,
  from: frontBase,
}
