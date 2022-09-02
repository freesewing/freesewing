export default function (part) {
  let { Path, Point, points, paths, Snippet, snippets, complete, sa, store, paperless, macro } =
    part.shorthand()

  let halfInch = store.get('halfInch')
  let waist = store.get('waist')

  paths.waistSeam = paths.waistSeam.split(points.pocketFacingTL)[0].setRender(false)

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
      .setRender(false)
  else paths.sideSeam = paths.sideSeam.split(points.pocketFacingBR)[1].setRender(false)

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
    .setRender(false)

  paths.seam = paths.waistSeam
    .join(paths.facingInside)
    .join(paths.sideSeam)
    .close()
    .setRender(true)
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
    // points.__titleNr.attr('data-text-class', 'center')
    // points.__titleName.attr('data-text-class', 'center')
    // points.__titlePattern.attr('data-text-class', 'center')
    macro('grainline', {
      from: points.pU,
      to: new Point(points.pU.x, points.__titleNr.y),
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
