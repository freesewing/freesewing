import { addButtonHoles } from './shared'

export default (part) => {
  const { store, sa, Point, points, Path, paths, snippets, complete, paperless, macro, options } =
    part.shorthand()

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

  paths.seam.line(points.placketTopEdge).line(points.placketBottomEdge).close()

  // Complete pattern?
  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path()
      .move(points.placketCfNeck)
      .line(points.placketCfHem)
      .attr('class', 'help')
    if (!options.seperateButtonPlacket) {
      // Match lines are only displayed on attached plackets
      paths.frontCenter.attr('data-text', 'matchHere').attr('data-text-class', 'text-xs center')
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
    points.placketEdgeWaist = new Point(points.placketBottomEdge.x, points.waist.y)
    points.placketEdgeArmhole = new Point(points.placketBottomEdge.x, points.armhole.y)
    points.placketEdgeHips = new Point(points.placketBottomEdge.x, points.hips.y)
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
    // Buttons
    addButtonHoles(part, 'placketCfNeck')

    // Title
    macro('title', { at: points.title, nr: 2, title: 'frontLeft' })

    if (sa) {
      paths.saFromArmhole
        .line(points.placketTopEdge.shift(90, sa))
        .line(points.placketTopEdge)
        .move(points.placketBottomEdge)
        .line(points.placketBottomEdge.shift(-90, 3 * sa))
        .line(paths.hemSa.start())
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.placketEdgeArmhole,
      to: points.armhole,
    })
    macro('hd', {
      from: points.placketEdgeWaist,
      to: points.waist,
    })
    macro('hd', {
      from: points.placketEdgeHips,
      to: points.hips,
    })
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
        from: points.placketTopEdge,
        to: points[pid],
        y: points.placketTopEdge.y - offset - sa,
      })
    }
    macro('hd', {
      from: points.placketTopEdge,
      to: points.s3CollarSplit,
      y: points.placketTopEdge.y - offset - sa - 15,
    })
    macro('hd', {
      from: points.placketTopEdge,
      to: points.s3ArmholeSplit,
      y: points.placketTopEdge.y - offset - sa - 30,
    })
    macro('hd', {
      from: points.placketTopEdge,
      to: points.armhole,
      y: points.placketTopEdge.y - offset - sa - 45,
    })
    if (complete) {
      points.button0 = points.placketTopEdge
      let j
      for (let i = 0; i < options.buttons; i++) {
        j = i + 1
        macro('vd', {
          from: points['button' + j],
          to: points['button' + i],
          x: points.placketTopEdge.x - 15,
        })
      }
    }
    macro('vd', {
      from: points.placketBottomEdge,
      to: points.placketTopEdge,
      x: points.placketTopEdge.x - 30,
    })
  }
  return part
}
