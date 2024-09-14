import { front } from './front.mjs'

function draftPocketSlash({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  sa,
  macro,
  part,
  store,
  scale,
  utils,
}) {
  if (!options.pocketSlash) return part.hide()

  const waistDist = store.get('waistDist')

  // Draft the points for the pocket outline.
  points.centerTop = new Point(0, 0)
  points.centerBottom = new Point(0, waistDist * options.pocketSlashHeight)
  points.topRight = new Point(waistDist * options.pocketSlashWidth, 0)
  points.topLeft = new Point(-waistDist * options.pocketSlashWidth, 0)
  points.bottomLeft = new Point(
    -waistDist * options.pocketSlashWidth,
    waistDist * options.pocketSlashHeight
  )
  points.bottomRight = new Point(
    waistDist * options.pocketSlashWidth,
    waistDist * options.pocketSlashHeight
  )
  points.slashTop = points.topRight.translate(-waistDist * options.pocketSlashOpeningWidth, 0)
  points.slashSide = points.topRight.translate(0, waistDist * options.pocketSlashOpeningHeight)

  const shieldHorizontal = options.pocketSlashOpeningWidth
  const shieldVertical = options.pocketSlashOpeningHeight
  const shieldHypotenuse = Math.hypot(shieldHorizontal, shieldVertical)
  points.shieldTop = points.topLeft.translate(
    waistDist *
      (options.pocketSlashOpeningWidth +
        (shieldHorizontal / shieldHypotenuse) * options.pocketSlashShieldOverlap),
    0
  )
  points.shieldSide = points.topLeft.translate(
    0,
    waistDist *
      (options.pocketSlashOpeningHeight +
        (shieldVertical / shieldHypotenuse) * options.pocketSlashShieldOverlap)
  )

  // Clip the shield if it extends past the ends of the pocket.
  if (points.shieldSide.y > points.bottomLeft.y) {
    points.shieldSideTrim = utils.beamIntersectsY(
      points.shieldSide,
      points.shieldTop,
      points.bottomLeft.y
    )
    points.shieldSide = points.bottomLeft
  } else {
    points.shieldSideTrim = points.shieldSide
  }
  if (points.shieldTop.x > points.centerTop.x) {
    points.shieldTopTrim = utils.beamIntersectsX(
      points.shieldSide,
      points.shieldTop,
      points.centerTop.x
    )
    points.shieldTop = points.centerTop
  } else {
    points.shieldTopTrim = points.shieldTop
  }

  points.slashMax = new Point(points.slashTop.x, points.slashSide.y)
  points.slashSideCp2 = points.slashSide.shiftFractionTowards(
    points.slashMax,
    options.pocketSlashOpeningCurve
  )
  points.slashTopCp1 = points.slashTop.shiftFractionTowards(
    points.slashMax,
    options.pocketSlashOpeningCurve
  )

  points.shieldMax = new Point(points.shieldTop.x, points.shieldSideTrim.y)
  points.shieldSideCp2 = points.shieldSideTrim.shiftFractionTowards(
    points.shieldMax,
    options.pocketSlashOpeningCurve
  )
  points.shieldTopCp1 = points.shieldTopTrim.shiftFractionTowards(
    points.shieldMax,
    options.pocketSlashOpeningCurve
  )

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.slashSide)
    .curve(points.slashSideCp2, points.slashTopCp1, points.slashTop)
    .line(points.topLeft)
    .close()
    .addClass('lining')

  paths.fold = new Path()
    .move(points.centerTop)
    .line(points.centerBottom)
    .addText('opal:fold')
    .addClass('various dashed')

  paths.shield = new Path()
    .move(points.shieldTop)
    .line(points.topLeft)
    .line(points.shieldSide)
    .line(points.shieldSideTrim)
    .curve(points.shieldSideCp2, points.shieldTopCp1, points.shieldTopTrim)
    .line(points.shieldTop)
    .close()
    .addClass('fabric dashed')

  points.shieldText = points.shieldTop
    .shiftFractionTowards(points.shieldSide, 1 / 2)
    .shiftFractionTowards(points.topLeft, 3 / 4)
    .addText('opal:pocketShield')
  points.shieldCenter = points.shieldTop
    .shiftFractionTowards(points.shieldSide, 1 / 2)
    .shiftFractionTowards(points.topLeft, 1 / 2)

  if (sa) {
    paths.sa = paths.seam.offset(sa).addClass('sa lining')

    points.saShieldTopRight = points.shieldTop.translate(0, -sa)
    points.saShieldTopLeft = points.topLeft.translate(-sa, -sa)
    points.saShieldBottomLeft = points.shieldSide.translate(
      -sa,
      points.bottomLeft.y === points.shieldSide.y ? sa : 0
    )
    points.saShieldBottomRight = points.shieldSideTrim.translate(
      0,
      points.bottomLeft.y === points.shieldSide.y ? sa : 0
    )
    paths.saShield = new Path()
      .move(points.shieldTop)
      .line(points.saShieldTopRight)
      .line(points.saShieldTopLeft)
      .line(points.saShieldBottomLeft)
      .line(points.saShieldBottomRight)
      .line(points.shieldSideTrim)
      .addClass('sa fabric')
      .hide()
  }

  macro('hd', {
    id: 'wTopLeft',
    from: points.topLeft,
    to: points.centerTop,
    y: points.topLeft.y - (sa + 15),
  })
  macro('hd', {
    id: 'wTop',
    from: points.topLeft,
    to: points.slashTop,
    y: points.topLeft.y - (sa + 30),
  })
  macro('hd', {
    id: 'wSlash',
    from: points.slashTop,
    to: points.slashSide,
    y: points.topLeft.y - (sa + 15),
  })
  macro('hd', {
    id: 'wBottom',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + (sa + 15),
  })
  macro('vd', {
    id: 'hSlash',
    from: points.slashTop,
    to: points.slashSide,
    x: points.bottomRight.x + (sa + 15),
  })
  macro('vd', {
    id: 'hSide',
    from: points.slashTop,
    to: points.bottomRight,
    x: points.bottomRight.x + (sa + 30),
  })

  store.cutlist.addCut({ cut: 2, from: 'lining' })

  points.title = points.centerTop
    .shiftFractionTowards(points.centerBottom, 1 / 2)
    .translate(scale * 10, scale * 25)
  macro('title', { at: points.title, nr: 5, title: 'opal:pocketSlash' })
  points.logo = points.title.translate(-scale * 20, scale * 35)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}

export const pocketSlash = {
  name: 'pocketSlash',
  draft: draftPocketSlash,
  after: front,
}
