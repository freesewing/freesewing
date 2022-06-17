export const calculateReduction = function (part) {
  const { store, measurements, options } = part.shorthand()
  const chest = measurements.chest * (1 + options.chestEase)
  const waist = measurements.waist * (1 + options.waistEase)
  const hips = measurements.hips * (1 + options.hipsEase)
  let waistReduction = chest - waist
  let hipsReduction = chest - hips

  // If your waist > chest, this pattern is not going to work for you as-is.
  if (waistReduction < 0) waistReduction = 0
  // Never make the hips smaller than the waist. That just looks silly
  if (waistReduction < hipsReduction) hipsReduction = waistReduction
  store.set('waistReduction', waistReduction)
  store.set('hipsReduction', hipsReduction)
  store.set('reduction', true)
  store.set('chest', chest)
  store.set('waist', waist)
  store.set('hips', hips)
  // Figure out whether to include back darts or not
  if (
    (options.backDarts === 'never' || waistReduction <= hipsReduction) &&
    options.backDarts !== 'always'
  )
    store.set('backDarts', false)
  else store.set('backDarts', true)
}

export const addButtons = function (part, origin = 'cfNeck', snippet = 'button') {
  const { points, options, snippets, Snippet } = part.shorthand()
  const len = points.cfNeck.dist(points.cfHips) * (1 - options.buttonFreeLength)
  for (let i = 1; i <= options.buttons; i++) {
    points['button' + i] = points[origin].shift(-90, (len / options.buttons) * i)
    snippets[snippet + i] = new Snippet(snippet, points['button' + i])
  }
  if (options.extraTopButton)
    snippets['top' + snippet] = new Snippet(
      snippet,
      points[origin].shift(-90, len / options.buttons / 2)
    )
}

export const addButtonHoles = (part, origin) => addButtons(part, origin, 'buttonhole')

export const draftBarrelCuff = (part) => {
  const { store, points, measurements, options, Point } = part.shorthand()
  const height = measurements.shoulderToWrist * options.cuffLength
  const width = measurements.wrist * (1 + options.cuffEase + options.cuffOverlap)
  store.set('cuffHeight', height)
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(width, 0)
  points.bottomLeft = new Point(0, height)
  points.bottomRight = new Point(width, height)

  return part
}

export const decorateBarrelCuff = (part) => {
  const { macro, snippets, Snippet, points, measurements, options, Point } = part.shorthand()
  // Title
  points.title = new Point(points.bottomRight.x / 2, points.bottomRight.y / 2)
  macro('title', {
    nr: 11,
    title: 'cuff',
    at: points.title,
    scale: 0.8,
  })

  // Button and buttonhole
  const margin = measurements.wrist * options.cuffOverlap
  points.buttonLineTop = points.topRight.shift(180, margin / 2)
  points.buttonLineBottom = points.bottomRight.shift(180, margin / 2)
  points.buttonholeLineTop = points.topLeft.shift(0, margin / 2)
  points.buttonholeLineBottom = points.bottomLeft.shift(0, margin / 2)

  for (let i = 1; i <= options.cuffButtonRows; i++) {
    points['button' + i] = points.buttonLineTop.shiftFractionTowards(
      points.buttonLineBottom,
      (1 / (options.cuffButtonRows + 1)) * i
    )
    snippets['button' + i] = new Snippet('button', points['button' + i])
    points['buttonhole' + i] = new Point(points.buttonholeLineTop.x, points['button' + i].y)
    snippets['buttonhole' + i] = new Snippet('buttonhole', points['buttonhole' + i]).attr(
      'data-rotate',
      90
    )
    if (options.barrelCuffNarrowButton) {
      points['narrowButton' + i] = points['button' + i].shift(180, margin)
      snippets['narrowButton' + i] = new Snippet('button', points['narrowButton' + i])
    }
  }

  return part
}

export const draftFrenchCuff = (part) => {
  const { store, points, measurements, options, Point } = part.shorthand()
  const margin = measurements.wrist * options.cuffOverlap
  const height = measurements.shoulderToWrist * options.cuffLength
  const width =
    measurements.wrist * (1 + options.cuffEase + options.cuffOverlap + options.cuffDrape) +
    margin / 2
  store.set('cuffHeight', height)
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(width, 0)
  points.midLeft = new Point(0, height)
  points.midRight = new Point(width, height)
  points.bottomLeft = new Point(0, height * 2)
  points.bottomRight = new Point(width, height * 2)

  return part
}

export const decorateFrenchCuff = (part) => {
  const { macro, snippets, Snippet, points, measurements, options, Point } = part.shorthand()
  // Title
  points.title = new Point(points.bottomRight.x / 2, points.bottomRight.y / 2)
  macro('title', {
    nr: 11,
    title: 'cuff',
    at: points.title,
    scale: 0.8,
  })

  // Buttonholes
  const margin = measurements.wrist * options.cuffOverlap
  points.buttonLineTop = points.topRight.shift(180, margin * 0.75)
  points.buttonLineBottom = points.bottomRight.shift(180, margin * 0.75)
  points.buttonholeLineTop = points.topLeft.shift(0, margin * 0.75)
  points.buttonholeLineBottom = points.bottomLeft.shift(0, margin * 0.75)

  points.button1 = points.buttonLineTop.shiftFractionTowards(points.buttonLineBottom, 0.2)
  points.button2 = points.buttonLineTop.shiftFractionTowards(points.buttonLineBottom, 0.8)
  points.button3 = points.buttonholeLineTop.shiftFractionTowards(points.buttonholeLineBottom, 0.2)
  points.button4 = points.buttonholeLineTop.shiftFractionTowards(points.buttonholeLineBottom, 0.8)
  snippets.buttonhole1 = new Snippet('buttonhole', points.button1).attr('data-rotate', 90)
  snippets.buttonhole2 = new Snippet('buttonhole', points.button2).attr('data-rotate', 90)
  snippets.buttonhole3 = new Snippet('buttonhole', points.button3).attr('data-rotate', 90)
  snippets.buttonhole4 = new Snippet('buttonhole', points.button4).attr('data-rotate', 90)

  return part
}

export const paperlessBarrelCuff = (part) => {
  const { sa, macro, points, options, complete } = part.shorthand()
  if (complete) {
    macro('hd', {
      from: points.buttonhole1,
      to: points.button1,
      y: points.bottomLeft.y + 15 + sa,
    })
  }
  macro('hd', {
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + 30 + sa,
  })
  macro('vd', {
    from: points.bottomLeft,
    to: points.topLeft.shift(0, 40),
    x: points.bottomLeft.x - 15 - sa,
  })
  if (complete && options.barrelCuffNarrowButton) {
    macro('hd', {
      from: points.narrowButton1,
      to: points.button1,
      y: points.topRight.y - 15 - sa,
    })
  }
  if (complete && options.cuffButtonRows === 2) {
    macro('vd', {
      from: points.button2,
      to: points.button1,
      x: points.topRight.x + 15 + sa,
    })
  }

  return part
}

export const paperlessFrenchCuff = (part) => {
  const { sa, macro, points, complete } = part.shorthand()
  if (complete) {
    macro('hd', {
      from: points.button4,
      to: points.button2,
      y: points.bottomLeft.y + 15 + sa,
    })
    macro('vd', {
      from: points.button2,
      to: points.button1,
      x: points.topRight.x + 15 + sa,
    })
  }
  macro('hd', {
    from: points.midLeft,
    to: points.midRight,
    y: points.bottomLeft.y + 30 + sa,
  })
  macro('vd', {
    from: points.bottomRight.shift(180, 40),
    to: points.topRight.shift(180, 40),
    x: points.topRight.x + 30 + sa,
  })

  return part
}

export const frontDimensions = (part, side = 'left') => {
  const { sa, options, paperless, points, macro } = part.shorthand()
  const factor = side === 'right' ? -1 : 1
  if (sa) {
    macro('banner', {
      path: 'hemSa',
      text: ['hem', ': 3x', 'seamAllowance'],
    })
    macro('banner', {
      path: 'saFrench',
      text: ['frenchSeam', ': 2x', 'seamAllowance'],
    })
  }
  if (paperless) {
    macro('vd', {
      from: points.armhole,
      to: points.armholePitch,
      x: points.armhole.x + (15 + sa * options.ffsa) * factor,
    })
    macro('vd', {
      from: points.armhole,
      to: points.s3ArmholeSplit,
      x: points.armhole.x + (30 + sa * options.ffsa) * factor,
    })
    macro('vd', {
      from: points.armhole,
      to: points.s3CollarSplit,
      x: points.armhole.x + (45 + sa * options.ffsa) * factor,
    })
    macro('vd', {
      from: points.waist,
      to: points.armhole,
      x: points.armhole.x + (15 + sa * options.ffsa) * factor,
    })
    macro('vd', {
      from: points.hips,
      to: points.armhole,
      x: points.armhole.x + (30 + sa * options.ffsa) * factor,
    })
    macro('ld', {
      from: points.cfWaist,
      to: points.waist,
    })
    if (options.hemStyle === 'baseball') {
      macro('vd', {
        from: points.bballStart,
        to: points.bballEnd,
        x: points.hips.x + (15 + options.ffsa * sa) * factor,
      })
      macro('vd', {
        from: points.bballStart,
        to: points.hips,
        x: points.hips.x + (30 + options.ffsa * sa) * factor,
      })
      macro('vd', {
        from: points.bballStart,
        to: points.armhole,
        x: points.hips.x + (45 + options.ffsa * sa) * factor,
      })
      macro('vd', {
        from: points.bballStart,
        to: points.s3CollarSplit,
        x: points.hips.x + (60 + options.ffsa * sa) * factor,
      })
      macro('hd', {
        from: points.bballStart,
        to: points.bballEnd,
        y: points.bballStart.y + 15 + 3 * sa,
      })
    } else if (options.hemStyle === 'slashed') {
      macro('vd', {
        from: points.slashEnd,
        to: points.slashStart,
        x: points.hips.x + (15 + 3 * sa) * factor,
      })
      macro('vd', {
        from: points.slashEnd,
        to: points.hips,
        x: points.hips.x + (30 + 3 * sa) * factor,
      })
      macro('vd', {
        from: points.slashEnd,
        to: points.armhole,
        x: points.hips.x + (45 + 3 * sa) * factor,
      })
      macro('vd', {
        from: points.slashEnd,
        to: points.s3CollarSplit,
        x: points.hips.x + (60 + 3 * sa) * factor,
      })
    } else {
      macro('vd', {
        from: points.hem,
        to: points.armhole,
        x: points.armhole.x + (45 + options.ffsa * sa) * factor,
      })
      macro('vd', {
        from: points.hem,
        to: points.s3CollarSplit,
        x: points.armhole.x + (60 + options.ffsa * sa) * factor,
      })
    }
  }

  return part
}
