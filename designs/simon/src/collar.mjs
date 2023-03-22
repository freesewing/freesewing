import { back } from './back.mjs'
import {
  collarEase,
  collarAngle,
  collarBend,
  collarFlare,
  collarGap,
  collarRoll,
} from './options.mjs'

function simonCollar({
  store,
  measurements,
  utils,
  sa,
  Point,
  points,
  Path,
  paths,
  complete,
  paperless,
  macro,
  options,
  part,
}) {
  const draft = function (tweak = 1) {
    const length = measurements.neck * (1 + options.collarEase - options.collarGap) * tweak
    const width = store.get('collarStandWidth') * 1.2 * (1 + options.collarRoll)

    // Draft right side
    points.topMid = new Point(0, 0)
    points.bottomMid = new Point(0, width)
    points.bottomMidCp1 = points.bottomMid.shift(0, length * 0.35)
    points.rightBottomEdge = new Point(length / 2, width + length * options.collarBend)
    points.rightTopHinge = points.topMid.shift(0, length * 0.25)
    points.rightTopEdgeDirection = points.rightTopHinge.shift(options.collarFlare, 10)
    points.rightBottomEdgeDirection = points.rightBottomEdge.shift(options.collarAngle, 10)
    points.rightTopEdge = utils.beamsIntersect(
      points.rightTopHinge,
      points.rightTopEdgeDirection,
      points.rightBottomEdge,
      points.rightBottomEdgeDirection
    )
    points.rightTopHingeCp1 = points.rightTopHinge.shift(0, length * 0.1)

    // Draft left side
    points.leftTopHinge = points.rightTopHinge.flipX()
    points.bottomMidCp2 = points.bottomMidCp1.flipX()
    points.leftTopHingeCp2 = points.rightTopHingeCp1.flipX()
    points.leftTopEdge = points.rightTopEdge.flipX()
    points.leftBottomEdge = points.rightBottomEdge.flipX()

    let len = new Path()
      .move(points.leftBottomEdge)
      ._curve(points.bottomMidCp2, points.bottomMid)
      .length()

    return len * 2 - measurements.neck * (1 + options.collarEase - options.collarGap)
  }

  let delta, tweak, run
  tweak = 1
  run = 1
  do {
    delta = draft(tweak)
    tweak = tweak * (1 - delta / 1000)
    run++
  } while (Math.abs(delta) > 1 && run < 20)

  paths.seam = new Path()
    .move(points.bottomMid)
    .curve_(points.bottomMidCp1, points.rightBottomEdge)
    .line(points.rightTopEdge)
    ._curve(points.rightTopHingeCp1, points.rightTopHinge)
    .line(points.topMid)
    .line(points.leftTopHinge)
    .curve_(points.leftTopHingeCp2, points.leftTopEdge)
    .line(points.leftBottomEdge)
    ._curve(points.bottomMidCp2, points.bottomMid)
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    // Draw undercollar line
    const uc = points.topMid.dist(points.bottomMid) * 0.05
    points.ucTopMid = points.topMid.shift(-90, uc)
    points.ucRightTopHinge = points.rightTopHinge.shift(-90, uc)
    points.ucRightTopHingeCp1 = points.rightTopHingeCp1.shift(-90, uc)
    points.ucLeftTopHinge = points.ucRightTopHinge.flipX()
    points.ucLeftTopHingeCp2 = points.ucRightTopHingeCp1.flipX()
    paths.underCollar = new Path()
      .move(points.rightTopEdge)
      ._curve(points.ucRightTopHingeCp1, points.ucRightTopHinge)
      .line(points.ucLeftTopHinge)
      .curve_(points.ucLeftTopHingeCp2, points.leftTopEdge)
      .attr('class', 'dotted')
      .attr('data-text', 'cutUndercollarSlightlySmaller')
      .attr('data-text-class', 'center')

    // Helplines
    paths.help = new Path().move(points.topMid).line(points.bottomMid).attr('class', 'dotted')

    // Grainline
    const grainlineY = (points.bottomMid.y - points.ucTopMid.y) / 2
    macro('grainline', {
      from: new Point(points.bottomMidCp2.x, grainlineY),
      to: new Point(points.bottomMidCp1.x, grainlineY),
    })

    // Title
    points.title = new Point(20, points.bottomMid.y / 2)
    macro('title', {
      at: points.title,
      nr: '7 + 8',
      title: 'collarAndUndercollar',
      scale: 0.6,
      append: true,
    })

    // Indicate collar stand side
    paths.collarStandLeft = new Path()
      .move(points.leftBottomEdge)
      ._curve(points.bottomMidCp2, points.bottomMid)
      .attr('data-text', 'sideOfTheCollarStand')
      .attr('data-text-class', 'center')
    paths.collarStandRight = new Path()
      .move(points.bottomMid)
      .curve_(points.bottomMidCp1, points.rightBottomEdge)
      .attr('data-text', 'sideOfTheCollarStand')
      .attr('data-text-class', 'center')
    // Notches
    macro('sprinkle', {
      snippet: 'notch',
      on: ['bottomMid', 'rightBottomEdge', 'leftBottomEdge', 'rightTopEdge', 'leftTopEdge'],
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      paths.saUndercollar = paths.underCollar.offset(sa).attr('class', 'dotted')
    }
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.bottomMid,
      to: points.topMid,
      x: points.rightTopEdge.x + 15 + sa,
    })
    macro('vd', {
      from: points.bottomMid,
      to: points.rightTopEdge,
      x: points.rightTopEdge.x + 30 + sa,
    })
    macro('vd', {
      from: points.rightBottomEdge,
      to: points.topMid,
      x: points.rightTopEdge.x + 45 + sa,
    })
    macro('vd', {
      from: points.rightBottomEdge,
      to: points.rightTopEdge,
      x: points.rightTopEdge.x + 60 + sa,
    })
    macro('hd', {
      from: points.leftTopHinge,
      to: points.rightTopHinge,
      y: points.leftTopEdge.y - 15 - sa,
    })
    macro('hd', {
      from: points.leftTopEdge,
      to: points.rightTopEdge,
      y: points.leftTopEdge.y - 30 - sa,
    })
    macro('hd', {
      from: points.leftBottomEdge,
      to: points.rightBottomEdge,
      y: points.leftBottomEdge.y + 15 + sa,
    })
  }

  return part
}

export const collar = {
  name: 'simon.collar',
  after: back,
  options: {
    collarEase,
    collarAngle,
    collarBend,
    collarFlare,
    collarGap,
    collarRoll,
  },
  draft: simonCollar,
}
