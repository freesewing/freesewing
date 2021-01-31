export default (part) => {
  let {
    snippets,
    utils,
    sa,
    Point,
    points,
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
  points.placketBottomIn = points.cfHem.shift(180, width / 2)
  paths.seam = paths.seam.split(points.placketTopIn)[0]
  paths.seam.ops[0].to = points.placketBottomIn
  paths.seam.close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    // Title
    macro('title', { at: points.title, nr: '1a', title: 'rightFront' })
    delete snippets['cfWaist-notch']
    delete snippets['cfHips-notch']
    delete snippets['cfArmhole-notch']
    points.edgeArmhole = new Point(points.placketTopIn.x, points.armhole.y)
    points.edgeWaist = new Point(points.placketTopIn.x, points.waist.y)
    points.edgeHips = new Point(points.placketTopIn.x, points.hips.y)

    if (sa) paths.saFromArmhole.line(paths.hemSa.start())
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.neck,
      to: points.placketTopIn,
      y: points.neck.y - sa - 15
    })
    macro('hd', {
      from: points.shoulder,
      to: points.placketTopIn,
      y: points.neck.y - sa - 30
    })
    macro('vd', {
      from: points.placketTopIn,
      to: points.neck,
      x: points.placketTopIn.x + sa + 15
    })
    macro('vd', {
      from: points.placketBottomIn,
      to: points.placketTopIn,
      x: points.placketTopIn.x + sa + 15
    })
    for (let pid of ['Armhole', 'Waist', 'Hips']) {
      macro('hd', {
        from: points['edge' + pid],
        to: points[pid.toLowerCase()]
      })
    }
  }

  return part
}
