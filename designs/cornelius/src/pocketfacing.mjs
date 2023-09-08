import { frontpoints } from './frontpoints.mjs'

function draftCorneliusPocketFacing({
  Path,
  Point,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  store,
  paperless,
  macro,
  part,
}) {
  let halfInch = store.get('halfInch')
  let waist = store.get('waist')

  paths.waistSeam = paths.waistSeam.split(points.pocketFacingTL)[0].hide()

  // Adding sa to this point so it allows for the pocket seam to be finished without the facing being included
  points.pocketFacingBR = paths.sideSeam.shiftAlong(
    paths.sideSeam.length() - (waist / 2 / 4.5) * 3.5 - halfInch * 3 + sa
  )
  // If we split at the exact point where the curves join, things fall apart
  // So let's work around that until this is handled in core
  if (points.pocketFacingBR.sitsOn(points.pAextra))
    paths.sideSeam = new Path()
      .move(points.pAextra)
      .curve(points.pAextraCPu, points.pUcpA, points.pU)
      .hide()
  else paths.sideSeam = paths.sideSeam.split(points.pocketFacingBR)[1].hide()

  points.brCPtl = points.pocketFacingBR.shift(
    points.pocketFacingBR.angle(points.pocketSide) + 90,
    halfInch * 3
  )
  points.tlCPbr = points.pocketFacingTL.shift(
    points.pocketFacingTL.angle(points.pocketWaist) - 90,
    halfInch * 6
  )

  paths.facingInside = new Path()
    .move(points.pocketFacingTL)
    .curve(points.tlCPbr, points.brCPtl, points.pocketFacingBR)
    .hide()

  paths.seam = paths.waistSeam
    .join(paths.facingInside)
    .join(paths.sideSeam)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    snippets.n1 = new Snippet('notch', points.pocketWaist)
    snippets.n2 = new Snippet('notch', points.pocketSide)

    points.logo = points.pUcpA.shiftFractionTowards(points.pocketFacingTL, 0.5).shift(270, 30)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(270, 50)
    macro('title', {
      nr: 3,
      at: points.title,
      title: 'PocketFacing',
    })

    macro('grainline', {
      from: points.pU,
      to: new Point(points.pU.x, points.title.y),
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.pU,
      to: points.pocketSide,
      y: points.pU.y - sa - 15,
    })
    macro('hd', {
      from: points.pU,
      to: points.pocketWaist,
      y: points.pU.y - sa - 15,
    })
    macro('hd', {
      from: points.pocketWaist,
      to: points.pocketFacingTL,
      y: points.pU.y - sa - 15,
    })
    macro('vd', {
      from: points.pU,
      to: points.pocketSide,
      x: points.pocketSide.x + sa + 15,
    })
    macro('vd', {
      from: points.pocketSide,
      to: points.pocketFacingBR,
      x: points.pocketSide.x + sa + 15,
    })
  }

  return part
}

export const pocketFacing = {
  name: 'cornelius.pocketFacing',
  from: frontpoints,
  draft: draftCorneliusPocketFacing,
}
