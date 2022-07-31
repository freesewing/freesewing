// import mirror from '@freesewing/plugin-mirror'
// import { PostAddSharp } from '@material-ui/icons'
// import { Store } from "@material-ui/icons";

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
  const h = options.sizeConstant * options.size * 0.5
  const sections = options.type == 'squid' ? 10 : 8

  let sectionWidth = (w * 2) / sections
  let neckWidth = sectionWidth * options.neckWidth
  let legWidth = (w * options.legWidth * options.bottomTopLegRatio * 3.1415) / 2
  let legAdjustedWidth = legWidth * options.bottomTopLegRatio
  let legLength = ((w * 2) / 3.1415) * options.legLength
  if (options.type == 'octopus') {
    legLength *= 2
  }
  if (options.type == 'squid') {
    legLength *= 1.8
    if (partNumber == 1) {
      legLength *= 1.2
    }
  }

  // console.log({ w: w })
  // console.log({ sectionWidth: sectionWidth })
  // console.log({ neckWidth: neckWidth })
  // console.log({ legAdjustedWidth: w * options.legWidth * options.bottomTopLegRatio })
  // console.log({ toplegWidth: legAdjustedWidth })
  // console.log({ legLength: legLength })

  points.topLeft = new Point(-1 * w, -1 * h)
  points.topRight = new Point(w, -1 * h)
  points.bottomLeft = new Point(-1 * w, h)
  points.bottomRight = new Point(w, h)
  points.left = new Point(-1 * w, 0)
  points.right = new Point(w, 0)

  points.sectionTop = new Point(0, -1 * h)
  points.sectionBottom = new Point(0, h)
  points.sectionLeft = new Point((-1 * sectionWidth) / 2, 0)
  let sectionMid = points.sectionLeft.shiftFractionTowards(points.sectionTop, 0.5)

  const sectionAngle = sectionMid.angle(points.sectionTop)

  let lineEnd = sectionMid.shift(sectionAngle - 90, 1000)
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
    .setRender(true)

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

    let currentNeckWidth = (points.sectionTop.x - points.sectionBottomLeft.x) * 2

    diff = neckWidth - currentNeckWidth
    div = div * (currentNeckWidth / neckWidth)
    iteration++
  } while ((diff < -1 || diff > 1) && iteration < 100)

  paths.circle = new Path()
    .move(points.circleTop)
    .curve(points.sectionTopCp1, points.sectionLeftCp2, points.sectionLeft)
    .curve(points.sectionLeftCp1, points.sectionBottomCp2, points.circleBottom)
    .setRender(false)

  points.sectionBottomLeft = utils.curveIntersectsY(
    points.sectionLeft,
    points.sectionLeftCp1,
    points.sectionBottomCp2,
    points.circleBottom,
    points.lowerLeft.y
  )

  let sectionLeft = paths.circle.split(points.sectionTop)[1].split(points.sectionBottomLeft)[0]

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
    (w * options.legWidth * options.bottomTopLegRatio) /
      2 /
      Math.sin(utils.deg2rad(360 / sections / 2))
  )
  points.skirtBottomLeft3 = new Point(
    points.sectionTop.x - legAdjustedWidth / 2,
    points.skirtBottomLeft2.y
  )
  if (options.type == 'octoplushy') {
    points.skirtBottomLeft3 = points.skirtBottomLeft3.shift(
      270,
      (points.skirtTopMiddle.y - points.skirtBottomLeft3.y) / 2
    )
  }
  points.skirtBottomLeft = points.skirtBottomLeft3.clone()
  points.legTopLeft = utils.beamIntersectsX(
    points.skirtBottomLeft,
    points.skirtBottomLeft.shift(270 + 30, 100),
    points.sectionTop.x - legAdjustedWidth / 2
  )
  points.legTopLeftCp2 = points.legTopLeft.shift(
    90,
    points.skirtBottomLeft.dist(points.legTopLeft) / 2
  )
  points.legTopLeftCp1 = points.legTopLeft.shift(270, legLength / 10)

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
    let octopusHeadFactor = 0.7
    let sectionHeight = points.sectionBottom.dist(points.sectionTop)
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

    let pSkirtLeft = new Path()
      .move(points.skirtBottomLeft)
      .curve(points.skirtBottomLeft, points.sectionBottomLeftCp1, points.sectionBottomLeft)

    points.skirtBottomLeft = points.skirtBottomLeft.shift(
      pSkirtLeft.shiftAlong(0.1).angle(points.skirtBottomLeft),
      legWidth
    )
    points.legTopLeft = points.legTopLeft.shift(270, legWidth * 1.6)
    points.legTopLeftCp1 = points.legTopLeft.shift(270, legWidth / 2)
    points.legTopLeftCp2 = points.legTopLeft.shift(90, legWidth / 2)
  }
  if (options.type == 'squid') {
    points.skirtBottomLeft = points.legTopLeft.clone()
    points.legTopLeftCp2 = points.legTopLeft.clone()
    let sectionHeight = points.sectionBottom.dist(points.sectionTop)
    points.sectionTop = points.sectionTop.shift(90, sectionHeight)
    points.sectionTopCp1 = points.sectionTopCp1.shift(90, sectionHeight)
    points.sectionLeft = points.sectionLeft.shift(90, sectionHeight / 3)
    points.sectionLeftCp1 = points.sectionLeftCp1.shift(90, sectionHeight / 3)
    points.sectionLeftCp2 = points.sectionLeftCp2.shift(90, sectionHeight / 3)

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

      let pLeftSection = new Path()
        .move(points.sectionLeft)
        .curve(points.sectionLeftCp2, points.sectionTopCp1, points.sectionTop)
      points.finSection = pLeftSection.shiftFractionAlong(0.45)
      let pLeftCurves = pLeftSection.split(points.finSection)

      points.sectionLeftCp2 = pLeftCurves[0].ops[1].cp1.clone()
      points.finSectionCp1 = pLeftCurves[0].ops[1].cp2.clone()
      points.finFold = points.finSection.rotate(-20, points.sectionTop)
      points.finSeam = points.finSection.rotate(-40, points.sectionTop)
      let foldAngle = points.sectionTop.angle(points.finFold)
      let aCp1 = points.sectionTop.angle(pLeftCurves[1].ops[1].cp1) - foldAngle
      let aCp2 = points.sectionTop.angle(pLeftCurves[1].ops[1].cp2) - foldAngle
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
  points.legTopRightCp1 = points.legTopLeftCp2.flipX(points.sectionTop)
  points.legTopRight = points.legTopLeft.flipX(points.sectionTop)
  points.legTopRightCp2 = points.legTopLeftCp1.flipX(points.sectionTop)
  points.legBottomRightCp1 = points.legBottomLeftCp2.flipX(points.sectionTop)
  points.legBottomRight = points.legBottomLeft.flipX(points.sectionTop)
  points.legBottomRightCp2 = points.legBottomLeftCp1.flipX(points.sectionTop)
  points.legBottomCp1 = points.legBottomCp2.flipX(points.sectionTop)

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
    store.set('legSkirtWidth', points.skirtBottomLeft.dist(points.skirtBottomRight))
    store.set('legSkirtRadius', points.skirtBottomLeft.y - points.skirtTopMiddle.y)
    store.set('legSkirtToTopAngle', points.skirtBottomLeft.angle(points.legTopLeft))
  }

  paths.legBottom = new Path()
    .move(points.legBottomLeft)
    .curve(points.legBottomLeftCp1, points.legBottomCp2, points.legBottom)
    .curve(points.legBottomCp1, points.legBottomRightCp2, points.legBottomRight)
    .setRender(false)

  if (options.type == 'squid') {
    paths.sectionLeft = new Path()
      .move(points.sectionTop)
      .curve(points.sectionTopCp1, points.sectionLeftCp2, points.sectionLeft)
      .curve(points.sectionLeftCp1, points.sectionMidLeftCp2, points.sectionMidLeft)
      .curve(points.sectionMidLeftCp1, points.sectionBottomLeftCp2, points.sectionBottomLeft)
      .setRender(false)
    paths.sectionRight = new Path()
      .move(points.sectionBottomRight)
      .curve(points.sectionBottomRightCp1, points.sectionMidRightCp2, points.sectionMidRight)
      .curve(points.sectionMidRightCp1, points.sectionRightCp2, points.sectionRight)
      .setRender(false)
    paths.skirtLeft = new Path()
      .move(points.sectionBottomLeft)
      .curve(points.sectionBottomLeftCp1, points.legTopLeftCp2, points.legTopLeft)
      .setRender(false)
    paths.skirtRight = new Path()
      .move(points.legTopRight)
      .curve(points.legTopRightCp1, points.sectionBottomRightCp2, points.sectionBottomRight)
      .setRender(false)
    if (partNumber == 1) {
      paths.sectionLeft = new Path()
        .move(points.sectionTop)
        .curve(points.finTopCp1, points.finSeamCp2, points.finSeam)
        .line(points.finFold)
        .line(points.finSection)
        .curve(points.finSectionCp1, points.sectionLeftCp2, points.sectionLeft)
        .curve(points.sectionLeftCp1, points.sectionMidLeftCp2, points.sectionMidLeft)
        .curve(points.sectionMidLeftCp1, points.sectionBottomLeftCp2, points.sectionBottomLeft)
        .setRender(false)
      paths.legBottom = new Path()
        .move(points.legBottomLeft)
        .curve(points.legBottomLeftCp1, points.tentacleLeftCp2, points.tentacleLeft)
        .curve(points.tentacleLeftCp1, points.legBottomCp2, points.legBottom)
        .curve(points.legBottomCp1, points.tentacleRightCp2, points.tentacleRight)
        .curve(points.tentacleRightCp1, points.legBottomRightCp2, points.legBottomRight)
        .setRender(false)
    }
  } else {
    paths.sectionLeft = new Path()
      .move(points.sectionTop)
      .curve(points.sectionTopCp1, points.sectionLeftCp2, points.sectionLeft)
      .curve(points.sectionLeftCp1, points.sectionBottomLeftCp2, points.sectionBottomLeft)
      .setRender(false)
    paths.sectionRight = new Path()
      .move(points.sectionBottomRight)
      .curve(points.sectionBottomRightCp1, points.sectionRightCp2, points.sectionRight)
      .setRender(false)
    if (points.skirtBottomLeft.sitsRoughlyOn(points.legTopLeft)) {
      paths.skirtLeft = new Path()
        .move(points.sectionBottomLeft)
        .curve(points.sectionBottomLeftCp1, points.skirtBottomLeft, points.skirtBottomLeft)
        .setRender(false)
      paths.skirtRight = new Path()
        .move(points.legTopRight)
        .curve(points.skirtBottomRight, points.sectionBottomRightCp2, points.sectionBottomRight)
        .setRender(false)
    } else {
      paths.skirtLeft = new Path()
        .move(points.sectionBottomLeft)
        .curve(points.sectionBottomLeftCp1, points.skirtBottomLeft, points.skirtBottomLeft)
        .curve(points.skirtBottomLeft, points.legTopLeftCp2, points.legTopLeft)
        .setRender(false)
      paths.skirtRight = new Path()
        .move(points.legTopRight)
        .curve(points.legTopRightCp1, points.skirtBottomRight, points.skirtBottomRight)
        .curve(points.skirtBottomRight, points.sectionBottomRightCp2, points.sectionBottomRight)
        .setRender(false)
    }
  }

  paths.section = new Path()
    .move(points.sectionTop)
    .join(paths.sectionLeft)
    .join(paths.skirtLeft)
    .curve(points.legTopLeftCp1, points.legBottomLeftCp2, points.legBottomLeft)
    .join(paths.legBottom)
    .curve(points.legBottomRightCp1, points.legTopRightCp2, points.legTopRight)
    .join(paths.skirtRight)
    .join(paths.sectionRight)
    .curve(points.sectionRightCp1, points.sectionTopCp2, points.sectionTop)
    .close()
    .attr('class', 'fabric')

  // paths.box = new Path()
  //   .move(points.topLeft)
  //   .line(points.bottomLeft)
  //   .line(points.bottomRight)
  //   .line(points.topRight)
  //   .line(points.topLeft)
  //   .close()
  //   .attr('class', 'fabric')
  //   .setRender(false)

  // Complete?
  if (complete) {
    points.logo = points.sectionTop.shiftFractionTowards(
      points.sectionBottom,
      options.type == 'octoplushy' ? 0.3 : 0.5
    )
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.4)

    points.titleAnchor = points.sectionBottom
      .shiftFractionTowards(points.sectionTop, options.type == 'octoplushy' ? 0.3 : 0.4)
      .shift(180, sectionWidth * 0.2)
    macro('title', {
      at: points.titleAnchor,
      nr: 1 + partNumber * 3,
      title: 'Head' + (partNumber == 0 ? '' : ' (a)'),
      rotation: 90,
      scale: options.type == 'octoplushy' ? 0.35 : 0.5,
    })

    if (options.type == 'octoplushy') {
      points.eyeLeft = paths.sectionLeft
        .shiftFractionAlong(0.465)
        .attr('data-text', 'eye')
        .attr('data-text-class', 'center')
      points.eyeRight = points.eyeLeft
        .flipX(points.sectionTop)
        .attr('data-text', 'eye')
        .attr('data-text-class', 'center')
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
        .attr('data-text', 'mouth')
        .attr('data-text-class', 'text-xs center')
        .attr('class', 'stroke-lg')
    }

    if (options.type == 'squid' && partNumber == 1) {
      paths.fold = new Path()
        .move(points.sectionTop)
        .line(points.finFold)
        .attr('data-text', 'fold line')
        .attr('data-text-class', 'center')
        .attr('class', 'hint dotted')
    }
    if (options.type == 'octopus') {
      points.skirtLegLeft = utils.curveIntersectsX(
        points.sectionBottomLeft,
        points.sectionBottomLeftCp1,
        points.skirtBottomLeft,
        points.skirtBottomLeft,
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
    points.sectionTop.attr('data-text', 'A').attr('data-text-class', 'center')
    points.legTopLeft.attr('data-text', 'B').attr('data-text-class', 'center')
    points.legTopRight.attr('data-text', 'B').attr('data-text-class', 'center')

    snippets.left = new Snippet('notch', points.sectionLeft)
    snippets.right = new Snippet('notch', points.sectionRight)
    snippets.bottomLeft = new Snippet('notch', points.sectionBottomLeft)
    snippets.bottomRight = new Snippet('notch', points.sectionBottomRight)
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

    if (sa) {
      paths.sa = paths.section.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.sectionLeft,
      to: points.sectionRight,
      y: points.sectionTop.y - sa,
    })
    macro('hd', {
      from: points.legTopLeft,
      to: points.legTopRight,
      y: points.legTopRight.y,
    })
    macro('hd', {
      from: points.legBottomLeft,
      to: points.legBottomRight,
      y: points.legBottom.y + sa + 10,
    })

    macro('vd', {
      from: points.sectionTop,
      to: points.sectionRight,
      x: points.skirtBottomRight.x + sa + 10,
    })
    macro('vd', {
      from: points.sectionTop,
      to: points.sectionBottomRight,
      x: points.skirtBottomRight.x + sa + 20,
    })
    macro('vd', {
      from: points.sectionTop,
      to: points.skirtBottomRight,
      x: points.skirtBottomRight.x + sa + 30,
    })
    macro('vd', {
      from: points.sectionTop,
      to: points.legBottom,
      x: points.skirtBottomRight.x + sa + 40,
    })

    if (options.type == 'octopus') {
      macro('hd', {
        from: points.skirtBottomLeft,
        to: points.skirtBottomRight,
        y: points.skirtBottomRight.y,
      })
      macro('vd', {
        from: points.skirtBottomRight,
        to: points.legTopRight,
        x: points.skirtBottomRight.x + sa + 30,
      })
    }
    if (options.type == 'squid') {
      macro('vd', {
        from: points.legTopLeft,
        to: points.sectionBottomLeft,
        x: points.legTopLeft.x - sa - 10,
      })
      macro('vd', {
        from: points.sectionBottomLeft,
        to: points.sectionMidLeft,
        x: points.legTopLeft.x - sa - 10,
      })
      if (partNumber == 1) {
        macro('hd', {
          from: points.tentacleLeft,
          to: points.tentacleRight,
          y: points.tentacleRight.y,
        })
        macro('hd', {
          from: points.finSeam,
          to: points.sectionTop,
          y: points.sectionTop.y,
        })
        macro('hd', {
          from: points.finSeam,
          to: points.finSection,
          y: points.finSection.y,
        })
        macro('hd', {
          from: points.finFold,
          to: points.finSection,
          y: points.finFold.y,
        })
        macro('vd', {
          from: points.legBottom,
          to: points.tentacleLeft,
          x: points.tentacleLeft.x - sa - 10,
        })
        macro('vd', {
          from: points.finSeam,
          to: points.sectionTop,
          x: points.finSeam.x - sa,
        })
        macro('vd', {
          from: points.finFold,
          to: points.sectionTop,
          x: points.finSeam.x - sa - 10,
        })
        macro('vd', {
          from: points.finSection,
          to: points.sectionTop,
          x: points.finSeam.x - sa - 20,
        })
      }
    }
  }
  return part
}
