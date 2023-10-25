import { addButtonHoles } from './shared.mjs'

export const draftFrontLeftClassicCuton = ({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  complete,
  macro,
  options,
  part,
}) => {
  const fold = store.get('buttonholePlacketFoldWidth')
  const width = store.get('buttonholePlacketWidth')
  points.placketCfNeck = points.cfNeck.shift(180, fold * 2)
  points.placketTopInnerEdgeFold = points.placketCfNeck.shift(0, width / 2)
  points.placketTopInnerEdgeOver = points.placketCfNeck.shift(0, width / 2 - fold)
  points.placketTopInnerEdgeUnder = points.placketCfNeck.shift(0, width / 2 + fold)
  points.placketTopOuterEdgeFold = points.placketCfNeck.shift(180, width / 2)
  points.placketTopOuterEdgeOver = points.placketCfNeck.shift(180, width / 2 - fold)
  points.placketTopOuterEdgeUnder = points.placketCfNeck.shift(180, width / 2 + fold)
  points.placketCfHem = points.cfHem.shift(180, fold * 2)
  points.placketBottomInnerEdgeFold = points.placketCfHem.shift(0, width / 2)
  points.placketBottomInnerEdgeOver = points.placketCfHem.shift(0, width / 2 - fold)
  points.placketBottomInnerEdgeUnder = points.placketCfHem.shift(0, width / 2 + fold)
  points.placketBottomOuterEdgeFold = points.placketCfHem.shift(180, width / 2)
  points.placketBottomOuterEdgeOver = points.placketCfHem.shift(180, width / 2 - fold)
  points.placketBottomOuterEdgeUnder = points.placketCfHem.shift(180, width / 2 + fold)
  points.placketTopEdge = points.placketTopOuterEdgeFold.shift(180, width)
  points.placketBottomEdge = points.placketBottomOuterEdgeFold.shift(180, width)
  if (typeof points.cfBust !== 'undefined') points.cfBust = points.cfBust.shift(180, fold * 2)
  points.placketEdgeWaist = new Point(points.placketBottomEdge.x, points.waist.y)
  points.placketEdgeArmhole = new Point(points.placketBottomEdge.x, points.armhole.y)
  points.placketEdgeHips = new Point(points.placketBottomEdge.x, points.hips.y)

  paths.seam.line(points.placketTopEdge).line(points.placketBottomEdge).close()
  if (sa)
    paths.saFromArmhole
      .line(points.placketTopEdge.shift(90, sa))
      .line(points.placketTopEdge)
      .move(points.placketBottomEdge)
      .line(points.placketBottomEdge.shift(-90, 3 * sa))
      .line(paths.hemSa.start())

  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path()
      .move(points.placketCfNeck)
      .line(points.placketCfHem)
      .attr('class', 'help')
    if (!options.separateButtonPlacket) {
      // Match lines are only displayed on attached plackets
      paths.frontCenter.addText('simon:matchHere', 'text-xs center')
    }
    paths.placketInnerEdgeFold = new Path()
      .move(points.placketTopInnerEdgeFold)
      .line(points.placketBottomInnerEdgeFold)
      .attr('class', 'dotted')
    paths.placketInnerEdgeOver = new Path()
      .move(points.placketTopInnerEdgeOver)
      .line(points.placketBottomInnerEdgeOver)
      .attr('class', 'dotted')
    paths.placketInnerEdgeUnder = new Path()
      .move(points.placketTopInnerEdgeUnder)
      .line(points.placketBottomInnerEdgeUnder)
      .attr('class', 'dotted')
    paths.placketOuterEdgeFold = new Path()
      .move(points.placketTopOuterEdgeFold)
      .line(points.placketBottomOuterEdgeFold)
      .attr('class', 'dotted')
    paths.placketOuterEdgeOver = new Path()
      .move(points.placketBottomOuterEdgeOver)
      .line(points.placketTopOuterEdgeOver)
      .attr('class', 'dotted')
    paths.placketOuterEdgeUnder = new Path()
      .move(points.placketTopOuterEdgeUnder)
      .line(points.placketBottomOuterEdgeUnder)
      .attr('class', 'dotted')
  }

  /*
   * Annotations
   */

  // Snippets
  // Delete old cfBust location notch, so we can re-add in new location.
  delete snippets['cfBust-notch']
  macro('sprinkle', {
    snippet: 'notch',
    on: [
      'placketCfNeck',
      'placketCfHem',
      'placketEdgeArmhole',
      'placketEdgeWaist',
      'placketEdgeHips',
      'placketTopInnerEdgeFold',
      'placketTopInnerEdgeOver',
      'placketTopInnerEdgeUnder',
      'placketTopOuterEdgeFold',
      'placketTopOuterEdgeOver',
      'placketTopOuterEdgeUnder',
      'placketBottomInnerEdgeFold',
      'placketBottomInnerEdgeOver',
      'placketBottomInnerEdgeUnder',
      'placketBottomOuterEdgeFold',
      'placketBottomOuterEdgeOver',
      'placketBottomOuterEdgeUnder',
    ],
  })
  delete snippets['cfWaist-notch']
  delete snippets['cfHips-notch']
  delete snippets['cfArmhole-notch']
  if (points.cfBust) snippets['cfBust-notch'] = new Snippet('notch', points.cfBust)

  // Buttons
  addButtonHoles(part, 'placketCfNeck')

  // Title
  macro('title', { at: points.title, nr: 2, title: 'frontLeft' })

  // Dimensions
  let offset = 0
  for (const pid of [
    'placketTopOuterEdgeUnder',
    'placketTopOuterEdgeFold',
    'placketTopOuterEdgeOver',
    'placketCfNeck',
    'placketTopInnerEdgeOver',
    'placketTopInnerEdgeFold',
    'placketTopInnerEdgeUnder',
  ]) {
    offset += 15
    macro('hd', {
      id: `wAt${pid}`,
      from: points.placketTopEdge,
      to: points[pid],
      y: points.placketTopEdge.y - offset - sa,
    })
  }
  macro('hd', {
    id: 'wEdgeToHps',
    from: points.placketTopEdge,
    to: points.s3CollarSplit,
    y: points.placketTopEdge.y - offset - sa - 15,
  })
  macro('hd', {
    id: 'wEdgeToShoulder',
    from: points.placketTopEdge,
    to: points.s3ArmholeSplit,
    y: points.placketTopEdge.y - offset - sa - 30,
  })
  macro('hd', {
    id: 'wEdgeToArmhole',
    from: points.placketTopEdge,
    to: points.armhole,
    y: points.placketTopEdge.y - offset - sa - 45,
  })
  points.button0 = points.placketTopEdge
  let j
  for (let i = 0; i < options.buttons; i++) {
    j = i + 1
    macro('vd', {
      id: `hBetweenButtons${i}`,
      from: points['button' + j],
      to: points['button' + i],
      x: points.placketTopEdge.x - 15,
    })
  }
  macro('vd', {
    id: 'hPlacket',
    from: points.placketBottomEdge,
    to: points.placketTopEdge,
    x: points.placketTopEdge.x - 30,
  })

  return part
}
