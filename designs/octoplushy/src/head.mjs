function octoplushyHeadSection(
  partNumber,
  {
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    sa,
    macro,
    utils,
    store,
    complete,
    part,
  }
) {
  if (partNumber > (options.type == 'squid' ? 1 : 0)) {
    part.hide()
    return part
  }

  const c = 0.55191502449351
  const w = options.sizeConstant * options.size
  const h = options.sizeConstant * options.size * 0.5
  const sections = options.type == 'squid' ? 10 : 8

  const sectionWidth = (w * 2) / sections
  const neckWidth = sectionWidth * options.neckWidth
  const armWidth = w * options.armWidth * options.bottomTopArmRatio * 3.1415
  const armAdjustedWidth = armWidth * options.bottomTopArmRatio
  let armLength = ((w * 2) / 3.1415) * options.armLength
  if (options.type == 'octopus') {
    armLength *= 2
  }
  if (options.type == 'squid') {
    armLength *= 1.8
    if (partNumber == 1) {
      armLength *= 1.2
    }
  }

  points.topLeft = new Point(-1 * w, -1 * h)
  points.topRight = new Point(w, -1 * h)
  points.bottomLeft = new Point(-1 * w, h)
  points.bottomRight = new Point(w, h)
  points.left = new Point(-1 * w, 0)
  points.right = new Point(w, 0)

  points.sectionTop = new Point(0, -1 * h)
  points.sectionBottom = new Point(0, h)
  points.sectionLeft = new Point((-1 * sectionWidth) / 2, 0)

  const sectionMid = points.sectionLeft.shiftFractionTowards(points.sectionTop, 0.5)
  const sectionAngle = sectionMid.angle(points.sectionTop)
  const lineEnd = sectionMid.shift(sectionAngle - 90, 1000)
  points.circleCenter = utils.beamIntersectsY(sectionMid, lineEnd, 0)

  const circleRadius = points.circleCenter.dist(points.sectionTop)

  points.sectionLeftCp2 = points.sectionLeft.shift(90, circleRadius * c)
  points.sectionLeftCp1 = points.sectionLeft.shift(270, circleRadius * c)
  points.circleTop = points.circleCenter.shift(90, circleRadius)
  points.sectionTopCp1 = points.circleTop.shift(180, circleRadius * c)
  points.circleBottom = points.circleCenter.shift(270, circleRadius)
  points.sectionBottomCp2 = points.circleBottom.shift(180, circleRadius * c)

  paths.circle = new Path()
    .move(points.circleTop)
    .curve(points.sectionTopCp1, points.sectionLeftCp2, points.sectionLeft)
    .curve(points.sectionLeftCp1, points.sectionBottomCp2, points.circleBottom)
    .unhide()

  let iteration = 0
  let diff = 0
  let div = 4
  do {
    points.lowerLeft = points.bottomLeft.shift(90, h / div)
    points.lowerRight = points.bottomRight.clone()

    points.sectionBottomLeft = utils.curveIntersectsY(
      points.sectionLeft,
      points.sectionLeftCp1,
      points.sectionBottomCp2,
      points.circleBottom,
      points.lowerLeft.y
    )

    const currentNeckWidth = (points.sectionTop.x - points.sectionBottomLeft.x) * 2

    diff = neckWidth - currentNeckWidth
    div = div * (currentNeckWidth / neckWidth)
    iteration++
  } while ((diff < -1 || diff > 1) && iteration < 100)

  paths.circle = new Path()
    .move(points.circleTop)
    .curve(points.sectionTopCp1, points.sectionLeftCp2, points.sectionLeft)
    .curve(points.sectionLeftCp1, points.sectionBottomCp2, points.circleBottom)
    .hide()

  points.sectionBottomLeft = utils.curveIntersectsY(
    points.sectionLeft,
    points.sectionLeftCp1,
    points.sectionBottomCp2,
    points.circleBottom,
    points.lowerLeft.y
  )

  const sectionLeft = paths.circle.split(points.sectionTop)[1].split(points.sectionBottomLeft)[0]

  points.sectionTop = sectionLeft.ops[0].to.clone()
  points.sectionTopCp1 = sectionLeft.ops[1].cp1.clone()
  points.sectionLeftCp2 = sectionLeft.ops[1].cp2.clone()
  points.sectionLeft = sectionLeft.ops[1].to.clone()
  points.sectionLeftCp1 = sectionLeft.ops[2].cp1.clone()
  points.sectionBottomLeftCp2 = sectionLeft.ops[2].cp2.clone()
  points.sectionBottomLeft = sectionLeft.ops[2].to.clone()

  points.sectionBottomLeftCp1 = points.sectionBottomLeft.shiftFractionTowards(
    points.sectionBottomLeftCp2,
    -0.5
  )

  points.skirtTopMiddle = points.sectionBottomLeft.shift(0, neckWidth / 2).shift(270, neckWidth / 3)
  points.skirtBottomLeft2 = points.skirtTopMiddle.shift(
    270 - 360 / sections / 2,
    (w * options.armWidth * options.bottomTopArmRatio) /
      2 /
      Math.sin(utils.deg2rad(360 / sections / 2))
  )
  points.skirtBottomLeft3 = new Point(
    points.sectionTop.x - armAdjustedWidth / 2,
    points.skirtBottomLeft2.y
  )
  if (options.type == 'octoplushy') {
    points.skirtBottomLeft3 = points.skirtBottomLeft3.shift(
      270,
      (points.skirtTopMiddle.y - points.skirtBottomLeft3.y) / 2
    )
  }
  points.skirtBottomLeft = points.skirtBottomLeft3.clone()
  points.armTopLeft = utils.beamIntersectsX(
    points.skirtBottomLeft,
    points.skirtBottomLeft.shift(270 + 30, 100),
    points.sectionTop.x - armAdjustedWidth / 2
  )
  points.armTopLeftCp2 = points.armTopLeft.shift(
    90,
    points.skirtBottomLeft.dist(points.armTopLeft) / 2
  )
  points.armTopLeftCp1 = points.armTopLeft.shift(270, armLength / 10)

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
    const octopusHeadFactor = 0.7
    const sectionHeight = points.sectionBottom.dist(points.sectionTop)
    points.sectionTop = points.sectionTop.shift(90, sectionHeight * octopusHeadFactor)
    points.sectionTopCp1 = points.sectionTopCp1.shift(90, sectionHeight * octopusHeadFactor)
    points.sectionLeft = points.sectionLeft.shift(90, (sectionHeight * octopusHeadFactor) / 1.1)
    points.sectionLeftCp1 = points.sectionLeftCp1.shift(
      90,
      (sectionHeight * octopusHeadFactor) / 1.1
    )
    points.sectionLeftCp2 = points.sectionLeftCp2.shift(
      90,
      (sectionHeight * octopusHeadFactor) / 1.1
    )

    const pSkirtLeft = new Path()
      .move(points.skirtBottomLeft)
      .curve(points.skirtBottomLeft, points.sectionBottomLeftCp1, points.sectionBottomLeft)

    points.skirtBottomLeft = points.skirtBottomLeft.shift(
      pSkirtLeft.shiftAlong(0.1).angle(points.skirtBottomLeft),
      armWidth
    )
    points.armTopLeft = points.armTopLeft.shift(270, armWidth * 1.6)
    points.armTopLeftCp1 = points.armTopLeft.shift(270, armWidth / 2)
    points.armTopLeftCp2 = points.armTopLeft.shift(90, armWidth / 2)
  }
  if (options.type == 'squid') {
    points.skirtBottomLeft = points.armTopLeft.clone()
    points.armTopLeftCp2 = points.armTopLeft.clone()
    let sectionHeight = points.sectionBottom.dist(points.sectionTop)
    points.sectionTop = points.sectionTop.shift(90, sectionHeight)
    points.sectionTopCp1 = points.sectionTopCp1.shift(90, sectionHeight)
    points.sectionLeft = points.sectionLeft.shift(90, sectionHeight / 3)
    points.sectionLeftCp1 = points.sectionLeftCp1.shift(90, sectionHeight / 3)
    points.sectionLeftCp2 = points.sectionLeftCp2.shift(90, sectionHeight / 3)

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

      const pLeftSection = new Path()
        .move(points.sectionLeft)
        .curve(points.sectionLeftCp2, points.sectionTopCp1, points.sectionTop)
      points.finSection = pLeftSection.shiftFractionAlong(0.45)
      const pLeftCurves = pLeftSection.split(points.finSection)

      points.sectionLeftCp2 = pLeftCurves[0].ops[1].cp1.clone()
      points.finSectionCp1 = pLeftCurves[0].ops[1].cp2.clone()
      points.finFold = points.finSection.rotate(-20, points.sectionTop)
      points.finSeam = points.finSection.rotate(-40, points.sectionTop)
      const foldAngle = points.sectionTop.angle(points.finFold)
      const aCp1 = points.sectionTop.angle(pLeftCurves[1].ops[1].cp1) - foldAngle
      const aCp2 = points.sectionTop.angle(pLeftCurves[1].ops[1].cp2) - foldAngle
      points.finSeamCp2 = points.sectionTop.shift(
        foldAngle - aCp1,
        points.sectionTop.dist(pLeftCurves[1].ops[1].cp1)
      )
      points.finTopCp1 = points.sectionTop.shift(
        foldAngle - aCp2,
        points.sectionTop.dist(pLeftCurves[1].ops[1].cp2)
      )
    }
    points.sectionMidLeft = points.sectionBottomLeft.shift(90, sectionHeight / 3)
    points.sectionMidLeftCp2 = points.sectionMidLeft.shift(
      points.sectionBottomLeft.angle(points.sectionBottomLeftCp2),
      points.sectionBottomLeft.dist(points.sectionBottomLeftCp2)
    )
    points.sectionMidLeftCp1 = points.sectionMidLeftCp2.flipY(points.sectionMidLeft)
  }

  points.sectionTopCp2 = points.sectionTopCp1.flipX(points.sectionTop)
  points.sectionRightCp1 = points.sectionLeftCp2.flipX(points.sectionTop)
  points.sectionRight = points.sectionLeft.flipX(points.sectionTop)
  points.sectionRightCp2 = points.sectionLeftCp1.flipX(points.sectionTop)
  points.sectionBottomRightCp1 = points.sectionBottomLeftCp2.flipX(points.sectionTop)
  points.sectionBottomRight = points.sectionBottomLeft.flipX(points.sectionTop)
  points.sectionBottomRightCp2 = points.sectionBottomLeftCp1.flipX(points.sectionTop)
  points.skirtBottomRight = points.skirtBottomLeft.flipX(points.sectionTop)
  points.armTopRightCp1 = points.armTopLeftCp2.flipX(points.sectionTop)
  points.armTopRight = points.armTopLeft.flipX(points.sectionTop)
  points.armTopRightCp2 = points.armTopLeftCp1.flipX(points.sectionTop)
  points.armBottomRightCp1 = points.armBottomLeftCp2.flipX(points.sectionTop)
  points.armBottomRight = points.armBottomLeft.flipX(points.sectionTop)
  points.armBottomRightCp2 = points.armBottomLeftCp1.flipX(points.sectionTop)
  points.armBottomCp1 = points.armBottomCp2.flipX(points.sectionTop)

  if (options.type == 'squid') {
    points.sectionMidRightCp1 = points.sectionMidLeftCp2.flipX(points.sectionTop)
    points.sectionMidRight = points.sectionMidLeft.flipX(points.sectionTop)
    points.sectionMidRightCp2 = points.sectionMidLeftCp1.flipX(points.sectionTop)
    points.tentacleRight = points.tentacleLeft.flipX(points.sectionTop)
    points.tentacleRightCp1 = points.tentacleLeftCp2.flipX(points.sectionTop)
    points.tentacleRightCp2 = points.tentacleLeftCp1.flipX(points.sectionTop)
  }

  if (partNumber == 0) {
    store.set('sectionWidth', sectionWidth)
    store.set('armSkirtWidth', points.skirtBottomLeft.dist(points.skirtBottomRight))
    store.set('armSkirtRadius', points.skirtBottomLeft.y - points.skirtTopMiddle.y)
    store.set('armSkirtToTopAngle', points.skirtBottomLeft.angle(points.armTopLeft))
  }

  paths.armBottom = new Path()
    .move(points.armBottomLeft)
    .curve(points.armBottomLeftCp1, points.armBottomCp2, points.armBottom)
    .curve(points.armBottomCp1, points.armBottomRightCp2, points.armBottomRight)
    .hide()

  if (options.type == 'squid') {
    paths.sectionLeft = new Path()
      .move(points.sectionTop)
      .curve(points.sectionTopCp1, points.sectionLeftCp2, points.sectionLeft)
      .curve(points.sectionLeftCp1, points.sectionMidLeftCp2, points.sectionMidLeft)
      .curve(points.sectionMidLeftCp1, points.sectionBottomLeftCp2, points.sectionBottomLeft)
      .hide()
    paths.sectionRight = new Path()
      .move(points.sectionBottomRight)
      .curve(points.sectionBottomRightCp1, points.sectionMidRightCp2, points.sectionMidRight)
      .curve(points.sectionMidRightCp1, points.sectionRightCp2, points.sectionRight)
      .hide()
    paths.skirtLeft = new Path()
      .move(points.sectionBottomLeft)
      .curve(points.sectionBottomLeftCp1, points.armTopLeftCp2, points.armTopLeft)
      .hide()
    paths.skirtRight = new Path()
      .move(points.armTopRight)
      .curve(points.armTopRightCp1, points.sectionBottomRightCp2, points.sectionBottomRight)
      .hide()
    if (partNumber == 1) {
      paths.sectionLeft = new Path()
        .move(points.sectionTop)
        .curve(points.finTopCp1, points.finSeamCp2, points.finSeam)
        .line(points.finFold)
        .line(points.finSection)
        .curve(points.finSectionCp1, points.sectionLeftCp2, points.sectionLeft)
        .curve(points.sectionLeftCp1, points.sectionMidLeftCp2, points.sectionMidLeft)
        .curve(points.sectionMidLeftCp1, points.sectionBottomLeftCp2, points.sectionBottomLeft)
        .hide()
      paths.armBottom = new Path()
        .move(points.armBottomLeft)
        .curve(points.armBottomLeftCp1, points.tentacleLeftCp2, points.tentacleLeft)
        .curve(points.tentacleLeftCp1, points.armBottomCp2, points.armBottom)
        .curve(points.armBottomCp1, points.tentacleRightCp2, points.tentacleRight)
        .curve(points.tentacleRightCp1, points.armBottomRightCp2, points.armBottomRight)
        .hide()
    }
  } else {
    paths.sectionLeft = new Path()
      .move(points.sectionTop)
      .curve(points.sectionTopCp1, points.sectionLeftCp2, points.sectionLeft)
      .curve(points.sectionLeftCp1, points.sectionBottomLeftCp2, points.sectionBottomLeft)
      .hide()
    paths.sectionRight = new Path()
      .move(points.sectionBottomRight)
      .curve(points.sectionBottomRightCp1, points.sectionRightCp2, points.sectionRight)
      .hide()
    if (points.skirtBottomLeft.sitsRoughlyOn(points.armTopLeft)) {
      paths.skirtLeft = new Path()
        .move(points.sectionBottomLeft)
        .curve(points.sectionBottomLeftCp1, points.skirtBottomLeft, points.skirtBottomLeft)
        .hide()
      paths.skirtRight = new Path()
        .move(points.armTopRight)
        .curve(points.skirtBottomRight, points.sectionBottomRightCp2, points.sectionBottomRight)
        .hide()
    } else {
      paths.skirtLeft = new Path()
        .move(points.sectionBottomLeft)
        .curve(points.sectionBottomLeftCp1, points.skirtBottomLeft, points.skirtBottomLeft)
        .curve(points.skirtBottomLeft, points.armTopLeftCp2, points.armTopLeft)
        .hide()
      paths.skirtRight = new Path()
        .move(points.armTopRight)
        .curve(points.armTopRightCp1, points.skirtBottomRight, points.skirtBottomRight)
        .curve(points.skirtBottomRight, points.sectionBottomRightCp2, points.sectionBottomRight)
        .hide()
    }
  }

  paths.section = new Path()
    .move(points.sectionTop)
    .join(paths.sectionLeft)
    .join(paths.skirtLeft)
    .curve(points.armTopLeftCp1, points.armBottomLeftCp2, points.armBottomLeft)
    .join(paths.armBottom)
    .curve(points.armBottomRightCp1, points.armTopRightCp2, points.armTopRight)
    .join(paths.skirtRight)
    .join(paths.sectionRight)
    .curve(points.sectionRightCp1, points.sectionTopCp2, points.sectionTop)
    .close()
    .attr('class', 'fabric')

  points.logo = points.sectionTop.shiftFractionTowards(
    points.sectionBottom,
    options.type == 'octoplushy' ? 0.3 : 0.5
  )
  snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.4)
  points.gridAnchor = points.skirtTopMiddle.clone()

  if (partNumber == 1) {
    store.cutlist.addCut({ cut: 2, from: 'fabric', identical: true })
  } else {
    store.cutlist.addCut({ cut: 8, from: 'fabric', identical: true })
  }

  points.titleAnchor = points.sectionBottom
    .shiftFractionTowards(points.sectionTop, options.type == 'octoplushy' ? 0.3 : 0.4)
    .shift(180, sectionWidth * 0.2)
  macro('title', {
    at: points.titleAnchor,
    nr: 1 + partNumber * 3,
    title: 'head' + (partNumber == 0 ? '' : ' (a)'),
    rotation: 90,
    scale: options.type == 'octoplushy' ? 0.35 : 0.5,
  })

  if (options.type == 'octoplushy') {
    points.eyeLeft = paths.sectionLeft.shiftFractionAlong(0.465)
    points.eyeRight = points.eyeLeft.flipX(points.sectionTop)
    if (complete) {
      points.eyeLeft.addText('eye', 'center')
      points.eyeRight.addText('eye', 'center')
    }
    snippets.eyeLeft = new Snippet('button', points.eyeLeft)
    snippets.eyeRight = new Snippet('button', points.eyeRight)

    points.mouthMiddle = points.sectionBottom.shiftFractionTowards(points.sectionTop, 0.45)
    points.mouthLeft = points.mouthMiddle.shift(180, sectionWidth / 4)
    points.mouthRight = points.mouthMiddle.shift(0, sectionWidth / 4)
    points.mouthBottom = points.mouthMiddle.shift(270, sectionWidth / 4)
    points.mouthLeftCp1 = points.mouthLeft.shift(270, (sectionWidth / 4) * c)
    points.mouthRightCp2 = points.mouthRight.shift(270, (sectionWidth / 4) * c)
    points.mouthBottomCp2 = points.mouthBottom.shift(180, (sectionWidth / 4) * c)
    points.mouthBottomCp1 = points.mouthBottom.shift(0, (sectionWidth / 4) * c)
    paths.mouth = new Path()
      .move(points.mouthLeft)
      .curve(points.mouthLeftCp1, points.mouthBottomCp2, points.mouthBottom)
      .curve(points.mouthBottomCp1, points.mouthRightCp2, points.mouthRight)
      .attr('class', 'stroke-lg')
    if (complete) paths.mouth.addText('mouth', 'text-xs center')
  }

  if (options.type == 'squid' && partNumber == 1 && complete) {
    paths.fold = new Path()
      .move(points.sectionTop)
      .line(points.finFold)
      .addClass('hint dotted')
      .addText('foldLine', 'center')
  }
  if (options.type == 'octopus') {
    points.skirtArmLeft = utils.curveIntersectsX(
      points.sectionBottomLeft,
      points.sectionBottomLeftCp1,
      points.skirtBottomLeft,
      points.skirtBottomLeft,
      points.armTopLeft.x
    )
    points.skirtArmRight = points.skirtArmLeft.flipX(points.sectionTop)
    if (complete) {
      paths.armLeftLine = new Path()
        .move(points.skirtArmLeft)
        .line(points.armTopLeft)
        .addClass('class', 'hint dotted')
        .addText('stitchLine', 'center')
      paths.armRightLine = new Path()
        .move(points.armTopRight)
        .line(points.skirtArmRight)
        .addClass('class', 'hint dotted')
        .addText('stitchLine', 'center')
    }
  }
  if (complete) {
    points.sectionTop.addText('A', 'center')
    points.armTopLeft.addText('B', 'center')
    points.armTopRight.addText('B', 'center')
  }

  snippets.left = new Snippet('notch', points.sectionLeft)
  snippets.right = new Snippet('notch', points.sectionRight)
  snippets.bottomLeft = new Snippet('notch', points.sectionBottomLeft)
  snippets.bottomRight = new Snippet('notch', points.sectionBottomRight)
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

  if (sa) {
    paths.sa = paths.section.offset(sa).attr('class', 'fabric sa')
  }

  macro('hd', {
    from: points.sectionLeft,
    to: points.sectionRight,
    y: points.sectionTop.y - sa,
    id: 'headWidth',
  })
  macro('hd', {
    from: points.armTopLeft,
    to: points.armTopRight,
    y: points.armTopRight.y,
    id: 'topArmWidth',
  })
  macro('hd', {
    from: points.armBottomLeft,
    to: points.armBottomRight,
    y: points.armBottom.y + sa + 10,
    id: 'bottomArmWidth',
  })

  macro('vd', {
    from: points.sectionTop,
    to: points.sectionRight,
    x: points.skirtBottomRight.x + sa + 10,
    id: 'headMidHeight',
  })
  macro('vd', {
    from: points.sectionTop,
    to: points.sectionBottomRight,
    x: points.skirtBottomRight.x + sa + 20,
    id: 'topToNeckHeight',
  })
  macro('vd', {
    from: points.sectionTop,
    to: points.skirtBottomRight,
    x: points.skirtBottomRight.x + sa + 30,
    id: 'topToArmHeight',
  })
  macro('vd', {
    from: points.sectionTop,
    to: points.armBottom,
    x: points.skirtBottomRight.x + sa + 40,
    id: 'totalHeight',
  })

  if (options.type == 'octopus') {
    macro('hd', {
      from: points.skirtBottomLeft,
      to: points.skirtBottomRight,
      y: points.skirtBottomRight.y,
      id: 'skirtWidth',
    })
    macro('vd', {
      from: points.skirtBottomRight,
      to: points.armTopRight,
      x: points.skirtBottomRight.x + sa + 30,
      id: 'skirtHeight',
    })
  }
  if (options.type == 'squid') {
    macro('vd', {
      from: points.armTopLeft,
      to: points.sectionBottomLeft,
      x: points.armTopLeft.x - sa - 10,
      id: 'neckToArm',
    })
    macro('vd', {
      from: points.sectionBottomLeft,
      to: points.sectionMidLeft,
      x: points.armTopLeft.x - sa - 10,
      id: 'sectionHeight',
    })
    if (partNumber == 1) {
      macro('hd', {
        from: points.tentacleLeft,
        to: points.tentacleRight,
        y: points.tentacleRight.y,
        id: 'tentacleWidth',
      })
      macro('hd', {
        from: points.finSeam,
        to: points.sectionTop,
        y: points.sectionTop.y,
        id: 'finWidth',
      })
      macro('hd', {
        from: points.finSeam,
        to: points.finSection,
        y: points.finSection.y,
        id: 'finToHead',
      })
      macro('hd', {
        from: points.finFold,
        to: points.finSection,
        y: points.finFold.y,
        id: 'foldToHead',
      })
      macro('vd', {
        from: points.armBottom,
        to: points.tentacleLeft,
        x: points.tentacleLeft.x - sa - 10,
        id: 'tentacleHeight',
      })
      macro('vd', {
        from: points.finSeam,
        to: points.sectionTop,
        x: points.finSeam.x - sa,
        id: 'finHeight',
      })
      macro('vd', {
        from: points.finFold,
        to: points.sectionTop,
        x: points.finSeam.x - sa - 10,
        id: 'finFoldHeight',
      })
      macro('vd', {
        from: points.finSection,
        to: points.sectionTop,
        x: points.finSeam.x - sa - 20,
        id: 'finToHeadHeight',
      })
    }
  }
  return part
}

const options = {
  sizeConstant: 200,
  size: {
    pct: 100,
    min: 5,
    max: 500,
    menu: 'style',
    toAbs: (val, { options }, mergedOptions) =>
      ((mergedOptions.sizeConstant * val * 2) / 3.1415) *
      (options.type === undefined
        ? 1
        : options.type == 'octopus'
        ? 1.7
        : options.type == 'squid'
        ? 2
        : 1),
  },
  type: { dflt: 'octoplushy', list: ['octoplushy', 'octopus', 'squid'], menu: 'style' },
  armWidth: { pct: 15, min: 10, max: 30, menu: 'style' },
  armLength: {
    pct: 200,
    min: 100,
    max: 500,
    menu: 'style',
    toAbs: (val, { options }, mergedOptions) =>
      ((mergedOptions.sizeConstant *
        (options.size === undefined ? mergedOptions.size : options.size) *
        2) /
        3.1415) *
      val *
      (options.type === undefined
        ? 1
        : options.type == 'octopus'
        ? 2
        : options.type == 'squid'
        ? 1.8
        : 1),
  },
  neckWidth: { pct: 25, min: 25, max: 45, menu: 'style' },
  armTaper: { pct: 25, min: 0, max: 50, menu: 'style' },
  bottomTopArmRatio: { pct: 57, min: 25, max: 75, menu: 'style' },
  bottomArmReduction: {
    pct: 90,
    min: 75,
    max: 125,
    // eslint-disable-next-line no-unused-vars
    menu: (settings, mergedOptions) => (mergedOptions?.type === 'octoplushy' ? 'style' : false),
  },
  bottomArmReductionPlushy: {
    pct: 80,
    min: 75,
    max: 125,
    // eslint-disable-next-line no-unused-vars
    menu: (settings, mergedOptions) => (mergedOptions?.type !== 'octoplushy' ? 'style' : false),
  },
}

export const headSection1 = {
  name: 'octoplushy.headSection1',
  options,
  draft: (params) => octoplushyHeadSection(0, params),
}
export const headSection2 = {
  name: 'octoplushy.headSection2',
  options,
  draft: (params) => octoplushyHeadSection(1, params),
}
