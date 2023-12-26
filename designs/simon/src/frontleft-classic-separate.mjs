export const draftFrontLeftClassicSeparate = ({
  utils,
  sa,
  Point,
  points,
  Path,
  paths,
  store,
  snippets,
  macro,
  part,
}) => {
  const fold = store.get('buttonholePlacketFoldWidth')
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

  if (sa) {
    paths.saFromArmhole.end().x = points.neckEdge.x - sa
    paths.hemSa.start().x = points.neckEdge.x - sa
    paths.saClosure = new Path()
      .move(paths.saFromArmhole.end())
      .line(paths.hemSa.start())
      .attr('class', 'fabric sa')
  }

  /*
   * Annotations
   */
  // Title
  macro('title', { at: points.title, nr: '2a', title: 'frontLeft' })

  // Notches
  delete snippets['cfWaist-notch']
  delete snippets['cfHips-notch']
  delete snippets['cfArmhole-notch']
  delete snippets['cfBust-notch']
  points.edgeArmhole = new Point(points.neckEdge.x, points.armhole.y)
  points.edgeWaist = new Point(points.neckEdge.x, points.waist.y)
  points.edgeHips = new Point(points.neckEdge.x, points.hips.y)
  macro('sprinkle', {
    snippet: 'notch',
    on: ['edgeArmhole', 'edgeWaist', 'edgeHips'],
  })

  // Dimensions
  macro('hd', {
    id: 'wEdgeToHps',
    from: points.neckEdge,
    to: points.s3CollarSplit,
    y: points.s3CollarSplit.y - sa - 15,
  })
  macro('hd', {
    id: 'wEdgeToShoulder',
    from: points.neckEdge,
    to: points.s3ArmholeSplit,
    y: points.s3CollarSplit.y - sa - 30,
  })
  macro('hd', {
    id: 'wEdgeToArmhole',
    from: points.neckEdge,
    to: points.armhole,
    y: points.s3CollarSplit.y - sa - 45,
  })
  macro('vd', {
    id: 'hPlacketTopToHps',
    from: points.neckEdge,
    to: points.s3CollarSplit,
    x: points.neckEdge.x - sa - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.hemEdge,
    to: points.s3CollarSplit,
    x: points.neckEdge.x - sa - 30,
  })

  return part
}
