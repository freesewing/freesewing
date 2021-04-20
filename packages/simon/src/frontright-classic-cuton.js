import { addButtons } from './shared'

export default (part) => {
  let {
    utils,
    sa,
    Point,
    points,
    Path,
    paths,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand()

  let width = options.buttonPlacketWidth
  points.placketTopIn = utils.lineIntersectsCurve(
    new Point(width / -2, points.cfNeck.y + 20),
    new Point(width / -2, points.cfNeck.y - 20),
    points.cfNeck,
    points.cfNeckCp1,
    points.neckCp2Front,
    points.neck
  )
  points.placketTopOut = points.cfNeck.shift(0, width / 2)
  points.placketTopEdge = points.cfNeck.shift(0, width * 1.5)
  points.placketBottomIn = points.cfHem.shift(180, width / 2)
  points.placketBottomOut = points.cfHem.shift(0, width / 2)
  points.placketBottomEdge = points.cfHem.shift(0, width * 1.5)

  paths.seam.line(points.placketTopEdge).line(points.placketBottomEdge).line(points.cfHem).close()

  // Complete pattern?
  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path().move(points.cfNeck).line(points.cfHem).attr('class', 'help')
    paths.placketInnerFold = new Path()
      .move(points.placketBottomIn)
      .line(points.placketTopIn)
      .attr('class', 'dotted')
      .attr('data-text', 'matchHere')
      .attr('data-text-class', 'text-xs center')
    paths.placketOuterFold = new Path()
      .move(points.placketTopOut)
      .line(points.placketBottomOut)
      .attr('class', 'dotted')
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'placketTopIn',
        'placketTopOut',
        'cfNeck',
        'placketBottomIn',
        'placketBottomOut',
        'cfHem'
      ]
    })

    // Buttons
    addButtons(part)

    // Title
    macro('title', { at: points.title, nr: 1, title: 'frontRight' })

    if (sa) {
      paths.saFromArmhole
        .line(new Point(points.placketTopEdge.x + sa, points.placketTopEdge.y - sa))
        .line(new Point(points.placketBottomEdge.x + sa, points.placketBottomEdge.y + sa * 3))
        .line(paths.hemSa.start())
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.placketTopOut,
      to: points.placketTopEdge,
      y: points.placketTopEdge.y - 15 - sa
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.placketTopEdge,
      y: points.placketTopEdge.y - 30 - sa
    })
    macro('hd', {
      from: points.placketTopIn,
      to: points.placketTopEdge,
      y: points.placketTopEdge.y - 45 - sa
    })
    macro('hd', {
      from: points.neck,
      to: points.placketTopEdge,
      y: points.neck.y - 15 - sa
    })
    macro('hd', {
      from: points.shoulder,
      to: points.placketTopEdge,
      y: points.neck.y - 30 - sa
    })
    points.button0 = points.placketTopEdge
    let j
    for (let i = 0; i < options.buttons; i++) {
      j = i + 1
      macro('vd', {
        from: points['button' + j],
        to: points['button' + i],
        x: points.placketTopEdge.x + 15 + sa
      })
    }
    macro('vd', {
      from: points.placketBottomEdge,
      to: points.placketTopEdge,
      x: points.placketTopEdge.x + 30 + sa
    })
  }

  return part
}
