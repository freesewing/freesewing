import { inset } from './inset.mjs'
import { init } from './init.mjs'

function tuskDelta(Path, points, store) {
  const len = new Path()
    .move(points.midRight)
    .curve(points.curveRightCpTop, points.curveRightCpBottom, points.rightTuskRight)
    .length()

  return len - store.get('curve')
}

function tweakTusk(delta, points) {
  let factor
  if (Math.abs(delta) > 2) factor = 3
  else factor = 5

  points.rightTuskRight = points.rightTuskRight.shift(90, delta / factor)
  points.rightTuskLeft = points.rightTuskLeft.shift(90, delta / factor)
  points.curveRightCpBottom = points.curveRightCpBottom.shift(90, delta / factor)
}

function draftBruceFront({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  options,
  complete,
  paperless,
  macro,
  snippets,
  Snippet,
  log,
  part,
}) {
  let adjustment_warning = false

  // Initialize
  init(part)

  points.topRight = new Point(store.get('hipsFront') / 2, 0)
  points.topLeft = points.topRight.flipX()
  points.midMid = new Point(0, store.get('heightFront'))
  points.midRight = new Point(points.topRight.x + store.get('heightFront') * 0.05, points.midMid.y)
  points.midLeft = points.midRight.flipX()

  // Store this length for a notch on the side part
  store.set('frontNotch', points.topRight.dist(points.midRight))

  points.bottomMid = new Point(0, store.get('riseLength'))
  points.rightTuskRight = new Point(
    store.get('gusset') * store.get('xScale') * (1 - store.get('gussetInsetRatio')),
    points.bottomMid.y
  )
  points.rightTuskLeft = points.bottomMid.clone()
  points.curveRightCpTop = new Point(
    points.midRight.x - store.get('gusset') * 1.3,
    points.midRight.y
  )
  points.curveRightCpBottom = new Point(
    points.rightTuskRight.x,
    points.rightTuskRight.y - store.get('gusset') * 1.3
  )

  // Adjust tusk length to fit inset curve
  let delta = tuskDelta(Path, points, store)
  let previous_delta
  const points_to_save = ['rightTuskRight', 'rightTuskLeft', 'curveRightCpBottom']
  let saved = []
  let stop = false
  if (Math.abs(delta) <= 1) {
    // We started below the 1mm threshold. No adjustment needed.
    stop = true
  }
  let count = 0
  while (!stop) {
    for (const i of points_to_save) {
      saved[i] = points[i]
    }
    previous_delta = delta
    tweakTusk(delta, points)
    delta = tuskDelta(Path, points, store)
    count++
    if (Math.abs(delta) <= 1) {
      // Below 1mm threshold is good enough.
      stop = true
    } else if (Math.abs(delta) > Math.abs(previous_delta) || count >= 150) {
      // The adjustments have failed, either starting to produce
      // worse results or exceeding the maximum number of runs.
      // Stop the adjustment process, print a warning message,
      // and revert back to the last good set of points if appropriate.
      stop = true
      log.warning(
        'Unable to adjust the front tusk length to fit the given measurements, after ' +
          count +
          ' iterations.'
      )
      adjustment_warning = true
      if (Math.abs(delta) > Math.abs(previous_delta))
        for (const i of points_to_save) points[i] = saved[i]
    }
  }

  // Adjust midMid to new length
  points.bottomMid = new Point(0, points.rightTuskLeft.y)

  // Front dart only if bulge > 0
  if (options.bulge > 0) {
    // Rotate tusk according to bulge option
    for (let pid of ['curveRightCpTop', 'curveRightCpBottom', 'rightTuskRight', 'rightTuskLeft']) {
      points[pid] = points[pid].rotate(options.bulge, points.midRight)
    }

    // Dart join point
    points.dartJoin = new Point(0, points.midMid.y + 0.65 * points.midMid.dist(points.bottomMid))

    // Dart control point
    points.dartCpRight = new Point(
      0,
      points.dartJoin.y + points.dartJoin.dist(points.bottomMid) * (options.bulge / 30)
    )
    points.dartCpRight = points.dartCpRight.rotate(options.bulge, points.dartJoin)

    // Flip control point to left side
    points.dartCpLeft = points.dartCpRight.flipX()
  } else {
    points.dartJoin = points.rightTuskLeft
  }

  // Flip points to left side
  points.leftTuskRight = points.rightTuskLeft.flipX()
  points.leftTuskLeft = points.rightTuskRight.flipX()
  points.curveLeftCpBottom = points.curveRightCpBottom.flipX()
  points.curveLeftCpTop = points.curveRightCpTop.flipX()

  // Handle back rise
  points.topMid = new Point(0, points.topLeft.y)
  points.topLeft = points.topLeft.shift(90, store.get('frontRise'))
  points.topRight = points.topRight.shift(90, store.get('frontRise'))
  points.topMidCpRight = new Point(points.topRight.x / 2, points.topMid.y)
  points.topMidCpLeft = points.topMidCpRight.flipX()

  if (options.bulge > 0) {
    paths.trimBase = new Path()
      .move(points.rightTuskLeft)
      .curve(points.rightTuskLeft, points.dartCpRight, points.dartJoin)
      .curve(points.dartCpLeft, points.leftTuskRight, points.leftTuskRight)
    paths.seamStart = new Path()
      .move(points.midLeft)
      .line(points.topLeft)
      .curve(points.topLeft, points.topMidCpLeft, points.topMid)
      .curve(points.topMidCpRight, points.topRight, points.topRight)
      .line(points.midRight)
      .curve(points.curveRightCpTop, points.curveRightCpBottom, points.rightTuskRight)
      .line(points.rightTuskLeft)
    paths.seamEnd = new Path()
      .move(points.leftTuskRight)
      .line(points.leftTuskLeft)
      .curve(points.curveLeftCpBottom, points.curveLeftCpTop, points.midLeft)
    paths.seamStart.hide()
    paths.trimBase.hide()
    paths.seamEnd.hide()
    paths.seam = paths.seamStart.join(paths.trimBase).join(paths.seamEnd)
  } else {
    paths.seam = new Path()
      .move(points.midLeft)
      .line(points.topLeft)
      .curve(points.topLeft, points.topMidCpLeft, points.topMid)
      .curve(points.topMidCpRight, points.topRight, points.topRight)
      .line(points.midRight)
      .curve(points.curveRightCpTop, points.curveRightCpBottom, points.rightTuskRight)
      .line(points.leftTuskLeft)
      .curve(points.curveLeftCpBottom, points.curveLeftCpTop, points.midLeft)
  }
  paths.seam.close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    if (sa) {
      if (options.bulge > 0) {
        let saStart = paths.seamStart.offset(sa * -1)
        let saTrim = paths.trimBase.offset(sa * -1).trim()
        let saEnd = paths.seamEnd.offset(sa * -1)
        paths.sa = saStart.join(saTrim).join(saEnd).close().attr('class', 'fabric sa')
      } else {
        paths.sa = paths.seam
          .offset(sa * -1)
          .trim()
          .close()
          .attr('class', 'fabric sa')
      }
    }
    macro('title', {
      at: points.midMid,
      nr: 2,
      title: 'front',
    })
    macro('grainline', {
      from: points.dartJoin,
      to: points.topMid,
    })
    snippets.sideNotch = new Snippet('notch', points.midRight)
    points.curveNotch = new Path()
      .move(points.midRight)
      .curve(points.curveRightCpTop, points.curveRightCpBottom, points.rightTuskRight)
      .shiftFractionAlong(0.5)
    snippets.curveNotch1 = new Snippet('notch', points.curveNotch)
    snippets.curveNotch2 = new Snippet('notch', points.curveNotch.flipX())
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - 15 - sa,
    })
    macro('hd', {
      from: points.midLeft,
      to: points.midRight,
      y: points.topLeft.y - 30 - sa,
    })
    macro('vd', {
      from: points.midLeft,
      to: points.topMid,
      x: points.midLeft.x - 15 - sa,
    })
    macro('vd', {
      from: points.midLeft,
      to: points.topLeft,
      x: points.midLeft.x - 30 - sa,
    })
    if (options.bulge === 0) {
      macro('hd', {
        from: points.leftTuskLeft,
        to: points.rightTuskRight,
        y: points.leftTuskLeft.y + 15 + sa,
      })
      macro('vd', {
        from: points.leftTuskLeft,
        to: points.topLeft,
        x: points.midLeft.x - 45 - sa,
      })
    } else {
      macro('vd', {
        from: points.leftTuskLeft,
        to: points.topLeft,
        x: points.midLeft.x - 45 - sa,
      })
      macro('vd', {
        from: points.leftTuskRight,
        to: points.topLeft,
        x: points.midLeft.x - 60 - sa,
      })
      points.narrowRight = new Path()
        .move(points.midRight)
        .curve(points.curveRightCpTop, points.curveRightCpBottom, points.rightTuskRight)
        .edge('left')
      points.narrowLeft = new Path()
        .move(points.midLeft)
        .curve(points.curveLeftCpTop, points.curveLeftCpBottom, points.leftTuskLeft)
        .attr('class', 'various stroke-xl lashed')
        .edge('right')
      macro('hd', {
        from: points.narrowLeft,
        to: points.narrowRight,
        y: points.narrowLeft.y,
      })
      macro('hd', {
        from: points.leftTuskRight,
        to: points.rightTuskLeft,
        y: points.rightTuskLeft.y + 15 + sa,
      })
      macro('hd', {
        from: points.leftTuskLeft,
        to: points.rightTuskRight,
        y: points.rightTuskLeft.y + 30 + sa,
      })
      macro('ld', {
        from: points.rightTuskLeft,
        to: points.rightTuskRight,
        d: -15 - sa,
      })
      macro('vd', {
        from: points.narrowRight,
        to: points.topRight,
        x: points.topRight.x + 15 + sa,
      })
      macro('vd', {
        from: points.dartJoin,
        to: points.topRight,
        x: points.topRight.x + 30 + sa,
      })
    }
  }

  if (adjustment_warning) {
    log.warning(
      'We were not able to generate the Front pattern piece correctly. ' +
        'Manual fitting and alteration of this and other pattern pieces ' +
        'are likely to be needed. ' +
        'First, please retake your measurements and generate a new pattern ' +
        'using the new measurements. ' +
        'If you still see this warning with the new pattern, then please ' +
        'make a test garment, check fit, and make alterations as necessary ' +
        'before trying to make the final garment.'
    )
  }

  return part
}

export const front = {
  name: 'bruce.front',
  after: inset,
  draft: draftBruceFront,
}
