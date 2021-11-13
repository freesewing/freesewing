export default (part) => {
  const { store, snippets, utils, sa, Point, points, paths, complete, paperless, macro } =
    part.shorthand()

  const width = store.get('buttonPlacketWidth')
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
      from: points.s3CollarSplit,
      to: points.placketTopIn,
      y: points.s3CollarSplit.y - sa - 15,
    })
    macro('hd', {
      from: points.s3ArmholeSplit,
      to: points.placketTopIn,
      y: points.s3CollarSplit.y - sa - 30,
    })
    macro('hd', {
      from: points.armhole,
      to: points.placketTopIn,
      y: points.s3CollarSplit.y - sa - 45,
    })
    macro('vd', {
      from: points.placketTopIn,
      to: points.s3CollarSplit,
      x: points.placketTopIn.x + sa + 15,
    })
    macro('vd', {
      from: points.placketBottomIn,
      to: points.placketTopIn,
      x: points.placketTopIn.x + sa + 15,
    })
    for (const pid of ['Armhole', 'Waist', 'Hips']) {
      macro('hd', {
        from: points['edge' + pid],
        to: points[pid.toLowerCase()],
      })
    }
  }

  return part
}
