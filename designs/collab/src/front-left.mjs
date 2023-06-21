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
  // J-Seam
  paths.jseam = new Path()
    .move(points.jseamBottom)
    .curve(points.jseamCpBottom, points.jseamCpTop, points.jseamCurveStart)
    .line(points.jseamTop)
    .addClass('note dashed stroke-sm')
    .addText('jSeam', 'text-sm center fill-note')

  // Store the J-Seam dimensions to construct the fly shield later
  store.set('jseamWidth', points.jseamCorner.x)
  store.set('jseamHeight', points.jseamCorner.y)

  paths.flyFold = new Path()
    .move(points.jseamBottom)
    .line(points.topLeft)
    .addClass('note help stroke-sm')

  macro('banner', {
    path: paths.flyFold,
    text: 'foldHere',
    className: 'text-sm fill-note',
  })

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
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - sa - 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    // macro('vd', {
    //   from: points.bottomRight,
    //   to: points.topRight,
    //   x: points.topRight.x + sa + 15,
    // })
  }

  return part
}

export const frontLeft = {
  name: 'collab:frontLeft',
  draft: draftFrontLeft,
  from: frontBase,
}
