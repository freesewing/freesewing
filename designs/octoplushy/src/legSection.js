export default function (partNumber, part) {
  const {
    options,
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
    utils,
    store,
  } = part.shorthand()

  if (partNumber > (options.type == 'squid' ? 1 : 0)) {
    return part
  }

  const c = 0.55191502449351
  const w = options.sizeConstant * options.size
  const sections = options.type == 'squid' ? 10 : 8

  let sectionWidth = (w * 2) / sections
  let legWidth = (w * options.legWidth * options.bottomTopLegRatio * 3.1415) / 2
  let legAdjustedWidth = legWidth * options.bottomTopLegRatio
  let legLength = ((w * 2) / 3.1415) * options.legLength
  switch (options.type) {
    case 'octopus':
      legLength *= 2
      legLength *= 1 - (1 - options.bottomLegReduction) / 2
      break
    case 'squid':
      legLength *= 1.8
      if (partNumber == 1) {
        legLength *= 1.2
      }
      break
    case 'octoplushy':
      legLength *= options.bottomLegReductionPlushy
  }

  points.legMiddle = new Point(0, 0)

  points.skirtLeft2 = points.legMiddle.shift(
    270 - 360 / sections / 2,
    (w * options.legWidth * options.bottomTopLegRatio) /
      2 /
      Math.sin(utils.deg2rad(360 / sections / 2))
  )
  if (options.type == 'octoplushy') {
    points.skirtLeft2 = points.skirtLeft2.shift(
      90,
      points.skirtLeft2.y - points.legMiddle.y - store.get('legSkirtRadius')
    )
  }

  if (options.type == 'squid') {
    points.skirtLeft2 = points.skirtLeft2.shift(90, (points.skirtLeft2.y - points.legMiddle.y) / 2)
  }
  points.legMiddleCp1 = points.legMiddle.shiftFractionTowards(points.skirtLeft2, c)
  points.skirtLeft3 = new Point((-1 * legAdjustedWidth) / 2, points.skirtLeft2.y)
  points.skirtLeft = points.skirtLeft3.clone()
  let pHelper = points.skirtLeft.shift(store.get('legSkirtToTopAngle'), 10)
  if (Math.round(pHelper.x * 1000) <= Math.round((legAdjustedWidth / -2) * 1000)) {
    points.legTopLeft = points.skirtLeft.clone()
  } else {
    points.legTopLeft = utils.beamIntersectsX(
      points.skirtLeft,
      points.skirtLeft.shift(store.get('legSkirtToTopAngle'), 10),
      legAdjustedWidth / -2
    )
  }
  points.legTopLeftCp2 = points.legTopLeft.shift(90, (points.legTopLeft.y - points.skirtLeft.y) * c)
  points.legTopLeftCp1 = points.legTopLeft.shift(270, legLength / 10)
  points.legBottomLeft = points.legTopLeft.shift(270, legLength).shift(0, legAdjustedWidth / 4)
  points.legBottom = points.legTopLeft
    .shift(270, legLength + legAdjustedWidth / 4)
    .shift(0, legAdjustedWidth / 2)

  points.legBottomLeft = points.legBottom
    .shift(90, (legAdjustedWidth / 2) * (1 - options.legTaper))
    .shift(180, (legAdjustedWidth / 2) * (1 - options.legTaper))
  points.legBottomLeftCp2 = points.legBottomLeft.shift(90, legLength / 10)
  points.legBottomLeftCp1 = points.legBottomLeft.shift(
    270,
    (legAdjustedWidth / 2) * (1 - options.legTaper) * c
  )
  points.legBottomCp2 = points.legBottom.shift(
    180,
    (legAdjustedWidth / 2) * (1 - options.legTaper) * c
  )

  if (options.type == 'octopus') {
    let pSkirtLeft = new Path()
      .move(points.legTopLeft)
      .curve(points.legTopLeftCp2, points.legMiddleCp1, points.legMiddle)

    points.skirtLeft = points.legTopLeft.shift(
      pSkirtLeft.shiftAlong(0.1).angle(points.legTopLeft),
      legWidth
    )
    points.legTopLeft = points.legTopLeft.shift(270, legWidth * 1.6)
    points.legTopLeftCp1 = points.legTopLeft.shift(270, legWidth / 2)
    points.legTopLeftCp2 = points.legTopLeft.shift(90, legWidth / 2)
  }

  if (options.type == 'squid') {
    points.tentacleLeft = utils.beamIntersectsX(
      points.legBottomLeft,
      points.legBottomLeft.shift(180 + 70, 100),
      -1.2 * legAdjustedWidth
    )
    points.tentacleLeftCp2 = points.tentacleLeft.shift(
      90,
      points.legBottomLeft.dist(points.tentacleLeft) / 3
    )
    points.tentacleLeftCp1 = points.tentacleLeft.shift(
      270,
      points.legBottomLeft.dist(points.tentacleLeft) / 3
    )

    if (partNumber == 1) {
      points.legBottomLeftCp1 = points.legBottomLeft.shift(270, legAdjustedWidth * c)
      points.legBottom = points.legBottom.flipY(points.tentacleLeft)
      points.legBottomCp2 = points.legBottomCp2.flipY(points.tentacleLeft)
    }
  }
  points.legMiddleCp2 = points.legMiddleCp1.flipX(points.legMiddle)
  points.skirtRight = points.skirtLeft.flipX(points.legMiddle)
  points.legTopRight = points.legTopLeft.flipX(points.legMiddle)
  points.legTopRightCp1 = points.legTopLeftCp2.flipX(points.legMiddle)
  points.legTopRightCp2 = points.legTopLeftCp1.flipX(points.legMiddle)
  points.legBottomRight = points.legBottomLeft.flipX(points.legMiddle)
  points.legBottomRightCp1 = points.legBottomLeftCp2.flipX(points.legMiddle)
  points.legBottomRightCp2 = points.legBottomLeftCp1.flipX(points.legMiddle)
  points.legBottom = points.legBottom.flipX(points.legMiddle)
  points.legBottomCp1 = points.legBottomCp2.flipX(points.legMiddle)

  if (options.type == 'squid') {
    points.tentacleRight = points.tentacleLeft.flipX(points.sectionTop)
    points.tentacleRightCp1 = points.tentacleLeftCp2.flipX(points.sectionTop)
    points.tentacleRightCp2 = points.tentacleLeftCp1.flipX(points.sectionTop)
  }

  paths.legBottom = new Path()
    .move(points.legBottomLeft)
    .curve(points.legBottomLeftCp1, points.legBottomCp2, points.legBottom)
    .curve(points.legBottomCp1, points.legBottomRightCp2, points.legBottomRight)
    .setRender(false)
  if (options.type == 'squid') {
    if (partNumber == 1) {
      paths.legBottom = new Path()
        .move(points.legBottomLeft)
        .curve(points.legBottomLeftCp1, points.tentacleLeftCp2, points.tentacleLeft)
        .curve(points.tentacleLeftCp1, points.legBottomCp2, points.legBottom)
        .curve(points.legBottomCp1, points.tentacleRightCp2, points.tentacleRight)
        .curve(points.tentacleRightCp1, points.legBottomRightCp2, points.legBottomRight)
        .setRender(false)
    }
  }

  if (points.skirtLeft.sitsRoughlyOn(points.legTopLeft)) {
    paths.topLeft = new Path()
      .move(points.legMiddle)
      .curve(points.legMiddleCp1, points.skirtLeft, points.skirtLeft)
  } else {
    paths.topLeft = new Path()
      .move(points.legMiddle)
      .curve(points.legMiddleCp1, points.skirtLeft, points.skirtLeft)
      .curve(points.skirtLeft, points.legTopLeftCp2, points.legTopLeft)
  }
  if (points.skirtRight.sitsRoughlyOn(points.legTopRight)) {
    paths.topRight = new Path()
      .move(points.legTopRight)
      .curve(points.skirtRight, points.legMiddleCp2, points.legMiddle)
  } else {
    paths.topRight = new Path()
      .move(points.legTopRight)
      .curve(points.legTopRightCp1, points.skirtRight, points.skirtRight)
      .curve(points.skirtRight, points.legMiddleCp2, points.legMiddle)
  }
  paths.section = new Path()
    .move(points.legMiddle)
    .join(paths.topLeft)
    .curve(points.legTopLeftCp1, points.legBottomLeftCp2, points.legBottomLeft)
    .join(paths.legBottom)
    .curve(points.legBottomRightCp1, points.legTopRightCp2, points.legTopRight)
    .join(paths.topRight)
    .close()

  // Complete?
  if (complete) {
    points.logo = points.legMiddle.shiftFractionTowards(points.legBottom, 0.08)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.4)

    points.legMiddle.attr('data-text', 'C').attr('data-text-class', 'center')
    points.legTopLeft.attr('data-text', 'D').attr('data-text-class', 'center')
    points.legTopRight.attr('data-text', 'D').attr('data-text-class', 'center')

    points.titleAnchor = points.legMiddle
      .shiftFractionTowards(points.legBottom, 0.2)
      .shift(180, sectionWidth * 0.1)

    macro('title', {
      at: points.titleAnchor,
      nr: 2 + partNumber * 3,
      title: 'Leg' + (partNumber == 0 ? '' : ' (a)'),
      rotation: 90,
      scale: 0.3,
    })

    for (var i = 0; i < 4; i++) {
      snippets[`legLeft${i}`] = new Snippet(
        'notch',
        points.legTopLeft.shiftFractionTowards(points.legBottomLeft, i / 4)
      )
      snippets[`legRight${i}`] = new Snippet(
        'notch',
        points.legTopRight.shiftFractionTowards(points.legBottomRight, i / 4)
      )
    }
    if (options.type == 'octopus') {
      points.skirtLegLeft = utils.curveIntersectsX(
        points.skirtLeft,
        points.skirtLeft,
        points.legMiddleCp1,
        points.legMiddle,
        points.legTopLeft.x
      )
      points.skirtLegRight = points.skirtLegLeft.flipX(points.sectionTop)
      paths.legLeftLine = new Path()
        .move(points.skirtLegLeft)
        .line(points.legTopLeft)
        .attr('data-text', 'stitch line')
        .attr('data-text-class', 'center')
        .attr('class', 'hint dotted')
      paths.legRightLine = new Path()
        .move(points.legTopRight)
        .line(points.skirtLegRight)
        .attr('data-text', 'stitch line')
        .attr('data-text-class', 'center')
        .attr('class', 'hint dotted')
    }

    if (sa) {
      paths.sa = paths.section.offset(sa).attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('hd', {
        from: points.legTopLeft,
        to: points.legTopRight,
        y: points.legMiddle.y - sa,
      })
      macro('hd', {
        from: points.legBottomLeft,
        to: points.legBottomRight,
        y: points.legBottom.y + sa + 10,
      })

      macro('vd', {
        from: points.legBottom,
        to: points.legMiddle,
        x: points.skirtLeft.x - sa - 20,
      })

      if (options.type == 'octopus') {
        macro('hd', {
          from: points.skirtLeft,
          to: points.skirtRight,
          y: points.skirtRight.y,
        })
        macro('vd', {
          from: points.skirtLeft,
          to: points.legMiddle,
          x: points.skirtLeft.x - sa - 10,
        })
        macro('vd', {
          from: points.legTopLeft,
          to: points.skirtLeft,
          x: points.skirtLeft.x - sa - 10,
        })
      } else {
        macro('vd', {
          from: points.legTopLeft,
          to: points.legMiddle,
          x: points.skirtLeft.x - sa - 10,
        })
      }
      if (options.type == 'squid') {
        if (partNumber == 1) {
          macro('hd', {
            from: points.tentacleLeft,
            to: points.tentacleRight,
            y: points.tentacleRight.y,
          })
          macro('vd', {
            from: points.legBottom,
            to: points.tentacleLeft,
            x: points.tentacleLeft.x - sa - 10,
          })
        }
      }
    }
  }

  return part
}
