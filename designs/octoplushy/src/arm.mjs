import { headSection1, headSection2 } from './head.mjs'

function octoplushyArmSection(
  partNumber,
  {
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
    part,
  }
) {
  if (partNumber > (options.type == 'squid' ? 1 : 0)) {
    part.hide()
    return part
  }

  const c = 0.55191502449351
  const w = options.sizeConstant * options.size
  const sections = options.type == 'squid' ? 10 : 8

  let sectionWidth = (w * 2) / sections
  let armWidth = (w * options.armWidth * options.bottomTopArmRatio * 3.1415) / 2
  let armAdjustedWidth = armWidth * options.bottomTopArmRatio
  let armLength = ((w * 2) / 3.1415) * options.armLength
  switch (options.type) {
    case 'octopus':
      armLength *= 2
      armLength *= 1 - (1 - options.bottomArmReduction) / 2
      break
    case 'squid':
      armLength *= 1.8
      if (partNumber == 1) {
        armLength *= 1.2
      }
      break
    case 'octoplushy':
      armLength *= options.bottomArmReductionPlushy
  }

  points.armMiddle = new Point(0, 0)

  points.skirtLeft2 = points.armMiddle.shift(
    270 - 360 / sections / 2,
    (w * options.armWidth * options.bottomTopArmRatio) /
      2 /
      Math.sin(utils.deg2rad(360 / sections / 2))
  )
  if (options.type == 'octoplushy') {
    points.skirtLeft2 = points.skirtLeft2.shift(
      90,
      points.skirtLeft2.y - points.armMiddle.y - store.get('armSkirtRadius')
    )
  }

  if (options.type == 'squid') {
    points.skirtLeft2 = points.skirtLeft2.shift(90, (points.skirtLeft2.y - points.armMiddle.y) / 2)
  }
  points.armMiddleCp1 = points.armMiddle.shiftFractionTowards(points.skirtLeft2, c)
  points.skirtLeft3 = new Point((-1 * armAdjustedWidth) / 2, points.skirtLeft2.y)
  points.skirtLeft = points.skirtLeft3.clone()
  let pHelper = points.skirtLeft.shift(store.get('armSkirtToTopAngle'), 10)
  if (Math.round(pHelper.x * 1000) <= Math.round((armAdjustedWidth / -2) * 1000)) {
    points.armTopLeft = points.skirtLeft.clone()
  } else {
    points.armTopLeft = utils.beamIntersectsX(
      points.skirtLeft,
      points.skirtLeft.shift(store.get('armSkirtToTopAngle'), 10),
      armAdjustedWidth / -2
    )
  }
  points.armTopLeftCp2 = points.armTopLeft.shift(90, (points.armTopLeft.y - points.skirtLeft.y) * c)
  points.armTopLeftCp1 = points.armTopLeft.shift(270, armLength / 10)
  points.armBottomLeft = points.armTopLeft.shift(270, armLength).shift(0, armAdjustedWidth / 4)
  points.armBottom = points.armTopLeft
    .shift(270, armLength + armAdjustedWidth / 4)
    .shift(0, armAdjustedWidth / 2)

  points.armBottomLeft = points.armBottom
    .shift(90, (armAdjustedWidth / 2) * (1 - options.armTaper))
    .shift(180, (armAdjustedWidth / 2) * (1 - options.armTaper))
  points.armBottomLeftCp2 = points.armBottomLeft.shift(90, armLength / 10)
  points.armBottomLeftCp1 = points.armBottomLeft.shift(
    270,
    (armAdjustedWidth / 2) * (1 - options.armTaper) * c
  )
  points.armBottomCp2 = points.armBottom.shift(
    180,
    (armAdjustedWidth / 2) * (1 - options.armTaper) * c
  )

  if (options.type == 'octopus') {
    let pSkirtLeft = new Path()
      .move(points.armTopLeft)
      .curve(points.armTopLeftCp2, points.armMiddleCp1, points.armMiddle)

    points.skirtLeft = points.armTopLeft.shift(
      pSkirtLeft.shiftAlong(0.1).angle(points.armTopLeft),
      armWidth
    )
    points.armTopLeft = points.armTopLeft.shift(270, armWidth * 1.6)
    points.armTopLeftCp1 = points.armTopLeft.shift(270, armWidth / 2)
    points.armTopLeftCp2 = points.armTopLeft.shift(90, armWidth / 2)
  }

  if (options.type == 'squid') {
    points.tentacleLeft = utils.beamIntersectsX(
      points.armBottomLeft,
      points.armBottomLeft.shift(180 + 70, 100),
      -1.2 * armAdjustedWidth
    )
    points.tentacleLeftCp2 = points.tentacleLeft.shift(
      90,
      points.armBottomLeft.dist(points.tentacleLeft) / 3
    )
    points.tentacleLeftCp1 = points.tentacleLeft.shift(
      270,
      points.armBottomLeft.dist(points.tentacleLeft) / 3
    )

    if (partNumber == 1) {
      points.armBottomLeftCp1 = points.armBottomLeft.shift(270, armAdjustedWidth * c)
      points.armBottom = points.armBottom.flipY(points.tentacleLeft)
      points.armBottomCp2 = points.armBottomCp2.flipY(points.tentacleLeft)
    }
  }
  points.armMiddleCp2 = points.armMiddleCp1.flipX(points.armMiddle)
  points.skirtRight = points.skirtLeft.flipX(points.armMiddle)
  points.armTopRight = points.armTopLeft.flipX(points.armMiddle)
  points.armTopRightCp1 = points.armTopLeftCp2.flipX(points.armMiddle)
  points.armTopRightCp2 = points.armTopLeftCp1.flipX(points.armMiddle)
  points.armBottomRight = points.armBottomLeft.flipX(points.armMiddle)
  points.armBottomRightCp1 = points.armBottomLeftCp2.flipX(points.armMiddle)
  points.armBottomRightCp2 = points.armBottomLeftCp1.flipX(points.armMiddle)
  points.armBottom = points.armBottom.flipX(points.armMiddle)
  points.armBottomCp1 = points.armBottomCp2.flipX(points.armMiddle)

  if (options.type == 'squid') {
    points.tentacleRight = points.tentacleLeft.flipX(points.sectionTop)
    points.tentacleRightCp1 = points.tentacleLeftCp2.flipX(points.sectionTop)
    points.tentacleRightCp2 = points.tentacleLeftCp1.flipX(points.sectionTop)
  }

  paths.armBottom = new Path()
    .move(points.armBottomLeft)
    .curve(points.armBottomLeftCp1, points.armBottomCp2, points.armBottom)
    .curve(points.armBottomCp1, points.armBottomRightCp2, points.armBottomRight)
    .hide()
  if (options.type == 'squid') {
    if (partNumber == 1) {
      paths.armBottom = new Path()
        .move(points.armBottomLeft)
        .curve(points.armBottomLeftCp1, points.tentacleLeftCp2, points.tentacleLeft)
        .curve(points.tentacleLeftCp1, points.armBottomCp2, points.armBottom)
        .curve(points.armBottomCp1, points.tentacleRightCp2, points.tentacleRight)
        .curve(points.tentacleRightCp1, points.armBottomRightCp2, points.armBottomRight)
        .hide()
    }
  }

  if (points.skirtLeft.sitsRoughlyOn(points.armTopLeft)) {
    paths.topLeft = new Path()
      .move(points.armMiddle)
      .curve(points.armMiddleCp1, points.skirtLeft, points.skirtLeft)
  } else {
    paths.topLeft = new Path()
      .move(points.armMiddle)
      .curve(points.armMiddleCp1, points.skirtLeft, points.skirtLeft)
      .curve(points.skirtLeft, points.armTopLeftCp2, points.armTopLeft)
  }
  if (points.skirtRight.sitsRoughlyOn(points.armTopRight)) {
    paths.topRight = new Path()
      .move(points.armTopRight)
      .curve(points.skirtRight, points.armMiddleCp2, points.armMiddle)
  } else {
    paths.topRight = new Path()
      .move(points.armTopRight)
      .curve(points.armTopRightCp1, points.skirtRight, points.skirtRight)
      .curve(points.skirtRight, points.armMiddleCp2, points.armMiddle)
  }
  paths.section = new Path()
    .move(points.armMiddle)
    .join(paths.topLeft)
    .curve(points.armTopLeftCp1, points.armBottomLeftCp2, points.armBottomLeft)
    .join(paths.armBottom)
    .curve(points.armBottomRightCp1, points.armTopRightCp2, points.armTopRight)
    .join(paths.topRight)
    .close()

  // If partNumber === 0, the part is "Leg"
  // If partNumber === 1, the part is "Leg (a)" for squid only
  store.cutlist.addCut({
    cut: partNumber === 0 ? 8 : 2,
    material: 'color2Bottom',
  })

  // Complete?
  if (complete) {
    points.logo = points.armMiddle.shiftFractionTowards(points.armBottom, 0.08)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.4)

    points.armMiddle.attr('data-text', 'C').attr('data-text-class', 'center')
    points.armTopLeft.attr('data-text', 'D').attr('data-text-class', 'center')
    points.armTopRight.attr('data-text', 'D').attr('data-text-class', 'center')

    points.titleAnchor = points.armMiddle
      .shiftFractionTowards(points.armBottom, 0.2)
      .shift(180, sectionWidth * 0.1)

    macro('title', {
      at: points.titleAnchor,
      nr: 2 + partNumber * 3,
      title: 'Arm' + (partNumber == 0 ? '' : ' (a)'),
      rotation: 90,
      scale: 0.3,
    })

    for (var i = 0; i < 4; i++) {
      snippets[`armLeft${i}`] = new Snippet(
        'notch',
        points.armTopLeft.shiftFractionTowards(points.armBottomLeft, i / 4)
      )
      snippets[`armRight${i}`] = new Snippet(
        'notch',
        points.armTopRight.shiftFractionTowards(points.armBottomRight, i / 4)
      )
    }
    if (options.type == 'octopus') {
      points.skirtArmLeft = utils.curveIntersectsX(
        points.skirtLeft,
        points.skirtLeft,
        points.armMiddleCp1,
        points.armMiddle,
        points.armTopLeft.x
      )
      points.skirtArmRight = points.skirtArmLeft.flipX(points.sectionTop)
      paths.armLeftLine = new Path()
        .move(points.skirtArmLeft)
        .line(points.armTopLeft)
        .attr('data-text', 'stitch line')
        .attr('data-text-class', 'center')
        .attr('class', 'hint dotted')
      paths.armRightLine = new Path()
        .move(points.armTopRight)
        .line(points.skirtArmRight)
        .attr('data-text', 'stitch line')
        .attr('data-text-class', 'center')
        .attr('class', 'hint dotted')
    }

    if (sa) {
      paths.sa = paths.section.offset(sa).attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('hd', {
        from: points.armTopLeft,
        to: points.armTopRight,
        y: points.armMiddle.y - sa,
      })
      macro('hd', {
        from: points.armBottomLeft,
        to: points.armBottomRight,
        y: points.armBottom.y + sa + 10,
      })

      macro('vd', {
        from: points.armBottom,
        to: points.armMiddle,
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
          to: points.armMiddle,
          x: points.skirtLeft.x - sa - 10,
        })
        macro('vd', {
          from: points.armTopLeft,
          to: points.skirtLeft,
          x: points.skirtLeft.x - sa - 10,
        })
      } else {
        macro('vd', {
          from: points.armTopLeft,
          to: points.armMiddle,
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
            from: points.armBottom,
            to: points.tentacleLeft,
            x: points.tentacleLeft.x - sa - 10,
          })
        }
      }
    }
  }

  return part
}

export const armSection1 = {
  name: 'octoplushy.armSection1',
  after: headSection1,
  draft: (params) => octoplushyArmSection(0, params),
}
export const armSection2 = {
  name: 'octoplushy.armSection2',
  after: headSection2,
  draft: (params) => octoplushyArmSection(1, params),
}
