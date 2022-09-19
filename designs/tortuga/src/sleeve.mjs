function draftTortugaSleeve{(
  measurements,
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
  log,
  part,
}) {
  const DEBUG = true
  const DEBUG_POINTS = false

  const RIGHT = 0
  const LEFT = 180
  const UP = 90
  const DOWN = -90

  points.topCenter = new Point(0, 0)

  //------------------------------------------------
  // Sleeve width

  const width = measurements.biceps * options.sleeveWidth
  logMeasurement(part, 'width', width)

  // Set our top left and top right points.
  const halfWidth = width / 2
  points.topLeft = points.topCenter.shift(LEFT, halfWidth)
  points.topRight = points.topCenter.shift(RIGHT, halfWidth)

  //------------------------------------------------
  // Sleeve length

  // Garment length is between hips and knees.
  const length = measurements.shoulderToWrist + 
    measurements.shoulderToWrist * options.sleeveLength
  logMeasurement(part, "length", length)

  // Set our bottom left and bottom right points.
  points.bottomLeft = points.topLeft.shift(DOWN, length)
  points.bottomRight = points.topRight.shift(DOWN, length)

  //------------------------------------------------
  // Other Paths

  paths.totalPartOutline = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .hide()

  // Complete?
  if (complete) {
    let scale = Math.min(1, width / 200)
    points.title = points.topCenter
      .shiftFractionTowards(points.bottomCenter, 0.4)
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'Sleeve',
      scale: scale,
    })

    points.logo = points.title
      .shiftFractionTowards(points.bottomCenter, 0.1)
    snippets.logo = new Snippet('logo', points.logo)
      .attr('data-scale', scale)

    points.grainlineTop = points.topRight
      .shift(DOWN, length / 10).shift(LEFT, width / 10)
    points.grainlineBottom = points.grainlineTop
      .shift(DOWN, length * 0.6)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
      scale: scale,
    })

    //----------------------------------------
    // Notches

//    snippets.neckSlitLeftNotch = new Snippet('notch', points.neckSlitLeft)

    if (DEBUG_POINTS) {
      for (const p in points) {
        if (p.indexOf('_') > -1) continue
        if (p.indexOf('title') > -1) continue
        if (p.indexOf('logo') > -1) continue
        points[p]
          .attr('data-circle', 2)
          .attr('data-circle-class', 'fill-note')
        points[p + 'label'] = points[p]
          .shiftTowards(points.center, 15)
          .attr('data-text', '(' + p + ')')
          .attr('data-text-class', 'text-lg center fill-note')
      }
    }
  }

  // Paperless?
  if (paperless) {
    // Dimensions
    let topSeamY = points.topRight.y
    let bottomSeamY = points.bottomLeftBack.y
    let rightSeamX = points.topRight.x
    let leftSeamX = points.topLeft.x

    // Garment width
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: bottomSeamY + (sa + (15 * 2)),
    })
    // Half garment width
    macro('hd', {
      from: points.bottomLeftBack,
      to: new Point(0, points.bottomLeftBack.y),
      y: bottomSeamY + (sa + 15),
    })
    // Garment length
    if (options.singleFrontBack) {
      // Full length
      macro('vd', {
        from: points.topRightSingle,
        to: points.bottomRight,
        x: rightSeamX + (sa + 15 * 2),
      })
      macro('vd', {
        from: points.topRightSingle,
        to: points.topRight,
        x: rightSeamX + (sa + 15),
      })
      macro('vd', {
        from: points.topRight,
        to: points.bottomRight,
        x: rightSeamX + (sa + 15),
      })
    } else {
      macro('vd', {
        from: points.topRight,
        to: points.bottomRight,
        x: rightSeamX + (sa + 15),
      })
      if (frontLength != backLength) {
        macro('vd', {
          from: points.topRight,
          to: points.bottomRightBack,
          x: rightSeamX + (sa + (15 * 2)),
        })
      }
    }
    // Shoulder right
    macro('hd', {
      from: points.neckSlitRight,
      to: points.topRight,
      y: topSeamY - (sa + 15),
    })
    // Neck slit right
    macro('hd', {
      from: points.chestSlitTop,
      to: points.neckSlitRight,
      y: topSeamY - (sa + 15),
    })
    // Chest slit
    macro('vd', {
      from: points.chestSlitTop,
      to: points.chestSlitBottom,
      x: points.chestSlitTop.x - (sa + 15),
    })
    // Armscye
    macro('vd', {
      from: points.topLeft,
      to: points.armscyeBottomLeft,
      x: leftSeamX - (sa + 15),
    })
    // Side slit
    macro('vd', {
      from: points.sideVentTopLeft,
      to: points.bottomLeft,
      x: leftSeamX - (sa + 15),
    })
    if (frontLength != backLength) {
      macro('vd', {
        from: points.sideVentTopLeftBack,
        to: points.bottomLeftBack,
        x: leftSeamX - (sa + (15 * 2)),
      })
    }
  }

  return part
}

export const sleeve = {
  name: 'tortuga.sleeve',
  after: front,
  draft: draftTortugaSleeve,
}
