export default (part) => {
  let {
    utils,
    sa,
    Point,
    points,
    Path,
    paths,
    snippets,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand()

  let fold = options.buttonholePlacketFoldWidth
  points.neckEdge = utils.lineIntersectsCurve(
    new Point(points.cfNeck.x + fold * 2, points.cfNeck.y + 20),
    new Point(points.cfNeck.x + fold * 2, points.cfNeck.y - 20),
    points.cfNeck,
    points.cfNeckCp1,
    points.neckCp2Front,
    points.neck
  )
  points.hemEdge = new Point(points.neckEdge.x, points.cfHem.y)

  paths.seam = paths.seam.split(points.neckEdge)[0]
  paths.seam.ops[0].to = points.hemEdge
  paths.seam.close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    // Title
    macro('title', { at: points.title, nr: '2a', title: 'frontLeft' })

    delete snippets['cfWaist-notch']
    delete snippets['cfHips-notch']
    delete snippets['cfArmhole-notch']
    points.edgeArmhole = new Point(points.neckEdge.x, points.armhole.y)
    points.edgeWaist = new Point(points.neckEdge.x, points.waist.y)
    points.edgeHips = new Point(points.neckEdge.x, points.hips.y)
    macro('sprinkle', {
      snippet: 'notch',
      on: ['edgeArmhole', 'edgeWaist', 'edgeHips']
    })
    if (sa) {
      paths.saFromArmhole.end().x = points.neckEdge.x - sa
      paths.hemSa.start().x = points.neckEdge.x - sa
      paths.saClosure = new Path()
        .move(paths.saFromArmhole.end())
        .line(paths.hemSa.start())
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.neckEdge,
      to: points.neck,
      y: points.neck.y - sa - 15
    })
    macro('hd', {
      from: points.neckEdge,
      to: points.shoulder,
      y: points.neck.y - sa - 30
    })
    macro('vd', {
      from: points.neckEdge,
      to: points.neck,
      x: points.neckEdge.x - sa - 15
    })
    macro('vd', {
      from: points.hemEdge,
      to: points.neck,
      x: points.neckEdge.x - sa - 30
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
