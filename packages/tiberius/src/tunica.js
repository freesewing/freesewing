export default function (part) {
  const {
    Point,
    points,
    Path,
    paths,
    measurements,
    options,
    macro,
    complete,
    snippets,
    Snippet,
    sa,
    paperless,
  } = part.shorthand()

  // Handle width
  let width =
    options.width === 'toElbow'
      ? measurements.shoulderToElbow
      : options.width === 'toMidArm'
      ? measurements.shoulderToElbow / 2
      : 0
  let hwidth = (measurements.shoulderToShoulder / 2 + width) * options.widthBonus
  // Some checks, can be circumvented with forceWidth
  if (options.forceWidth === false) {
    if (hwidth < measurements.waist / 4) {
      hwidth = (measurements.waist / 4) * options.widthBonus
    }
    if (hwidth < measurements.hips / 4) {
      hwidth = (measurements.hips / 4) * options.widthBonus
    }
    if (hwidth < measurements.chest / 4) {
      hwidth = (measurements.chest / 4) * options.widthBonus
    }
    if (hwidth < measurements.seat / 4) {
      hwidth = (measurements.seat / 4) * options.widthBonus
    }
  }
  // Other variables
  const hem_pos =
    options.length === 'toKnee'
      ? measurements.waistToKnee
      : options.length === 'toMidLeg'
      ? measurements.waistToKnee / 1.3
      : measurements.waistToFloor * 0.95
  const length = (measurements.hpsToWaistBack + hem_pos) * options.lengthBonus
  const hhead = (measurements.head / 4) * options.headRatio
  const armhole = (measurements.biceps / 2) * 1.3 * options.armholeDrop
  const clavusWidth = (options.clavusWidth * hwidth) / 13 / options.widthBonus

  // Add points
  points.top = new Point(0, 0)
  points.bottom = new Point(0, length)
  points.topLeft = points.top.shift(0, -hwidth)
  points.headLeft = points.top.shift(180, hhead)
  // Don't go more narrow than head opening
  points.topLeftMin = points.top.shiftFractionTowards(points.headLeft, 1.1)
  if (points.topLeftMin.x < points.topLeft.x) points.topLeft.x = points.topLeftMin.x
  points.bottomLeft = points.bottom.shift(0, points.bottom.dx(points.topLeft))
  points.armholeLeft = points.topLeft.shift(-90, armhole)

  // draw paths
  paths.saBase = new Path()
    .move(points.top)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .setRender(false)
  paths.hem = new Path().move(points.bottomLeft).line(points.bottom).setRender(false)
  paths.fold = new Path().move(points.bottom).line(points.top).setRender(false)
  paths.seam = paths.saBase.join(paths.hem).join(paths.fold).setRender(true).attr('class', 'fabric')

  // clavi
  if (options.clavi) {
    // make points
    points.claviCenterTop = points.top.shiftFractionTowards(points.topLeft, options.clavusLocation)
    points.claviRightTop = points.claviCenterTop.shift(0, clavusWidth)
    points.claviLeftTop = points.claviRightTop.flipX(points.claviCenterTop)
    points.claviRightBottom = new Point(points.claviRightTop.x, points.bottom.y)
    points.claviLeftBottom = new Point(points.claviLeftTop.x, points.bottom.y)

    // draw paths
    paths.clavusRight = new Path()
      .move(points.claviRightBottom)
      .line(points.claviRightTop)
      .attr('class', 'various dashed')
      .attr('data-text', 'biasTape')
      .attr('data-text-class', 'center fill-various')
    paths.clavusLeft = new Path()
      .move(points.claviLeftBottom)
      .line(points.claviLeftTop)
      .attr('class', 'various dashed')
      .attr('data-text', 'biasTape')
      .attr('data-text-class', 'center fill-various')
  }

  // Complete?
  if (complete) {
    // notches
    snippets.hl = new Snippet('notch', points.headLeft)
    snippets.al = new Snippet('notch', points.armholeLeft)

    // cut on fold
    macro('cutonfold', {
      from: points.bottom,
      to: points.top,
      grainline: true,
    })

    // logo & title
    points.midTop = points.top.shiftFractionTowards(points.headLeft, 0.5)
    points.midBottom = new Point(points.midTop.x, points.bottom.y)
    points.logo = points.midTop.shiftFractionTowards(points.midBottom, 0.3)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.midTop.shiftFractionTowards(points.midBottom, 0.5)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'tunica',
    })
    points.__titleNr.attr('data-text-class', 'center')
    points.__titleName.attr('data-text-class', 'center')
    points.__titlePattern.attr('data-text-class', 'center')

    // scalebox
    points.scalebox = points.midTop.shiftFractionTowards(points.midBottom, 0.7)
    macro('scalebox', { at: points.scalebox })

    // seam allowance
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hem.offset(sa * 2.5))
        .close()
        .attr('class', 'fabric sa')
    }

    // Paperless?
    if (paperless) {
      macro('vd', {
        from: points.bottom,
        to: points.top,
        x: points.bottomLeft.x - 30 - sa,
      })
      macro('vd', {
        from: points.bottomLeft,
        to: points.armholeLeft,
        x: points.armholeLeft.x - 15 - sa,
      })
      macro('vd', {
        from: points.armholeLeft,
        to: points.topLeft,
        x: points.armholeLeft.x - 15 - sa,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.top,
        y: points.top.y - sa - (options.clavi ? 60 : 30),
      })
      macro('hd', {
        to: points.top,
        from: points.headLeft,
        y: points.top.y - 15 - sa,
      })

      // for clavi
      if (options.clavi) {
        macro('hd', {
          from: points.claviRightTop,
          to: points.top,
          y: points.top.y - 30 - sa,
        })
        macro('hd', {
          from: points.claviLeftTop,
          to: points.top,
          y: points.top.y - 45 - sa,
        })
      }
    }
  }
  return part
}
