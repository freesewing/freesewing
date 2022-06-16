import { addButtonHoles } from './shared'

export default (part) => {
  const {
    utils,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    options,
    store,
  } = part.shorthand()

  if (!options.seperateButtonholePlacket) {
    part.paths = {}
    part.snippets = {}
    part.points = {}
    return part
  }

  for (const id in paths) delete part.paths[id]
  const width = store.get('buttonholePlacketWidth')
  const fold = store.get('buttonholePlacketFoldWidth')

  points.topInnerEdge = utils.lineIntersectsCurve(
    new Point(points.cfNeck.x + fold * 2, points.cfNeck.y + 20),
    new Point(points.cfNeck.x + fold * 2, points.cfNeck.y - 20),
    points.cfNeck,
    points.cfNeckCp1,
    points.neckCp2Front,
    points.neck
  )
  points.bottomInnerEdge = new Point(points.topInnerEdge.x, points.cfHem.y)

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

  paths.saBase = new Path()
    .move(points.placketTopEdge)
    .line(points.cfNeck)
    .curve(points.cfNeckCp1, points.neckCp2Front, points.neck)
    .split(points.topInnerEdge)[0]
    .line(points.bottomInnerEdge)

  paths.seam = paths.saBase.clone().line(points.placketBottomEdge).close().attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path()
      .move(points.placketCfNeck)
      .line(points.placketCfHem)
      .attr('class', 'help')
    paths.placketInnerEdgeFold = new Path()
      .move(points.placketTopInnerEdgeFold)
      .line(points.placketBottomInnerEdgeFold)
      .attr('class', 'dotted')
    paths.placketInnerEdgeOver = new Path()
      .move(points.placketTopInnerEdgeOver)
      .line(points.placketBottomInnerEdgeOver)
      .attr('class', 'dotted')
    paths.placketOuterEdgeFold = new Path()
      .move(points.placketTopOuterEdgeFold)
      .line(points.placketBottomOuterEdgeFold)
      .attr('class', 'dotted')
    paths.placketOuterEdgeOver = new Path()
      .move(points.placketTopOuterEdgeOver)
      .line(points.placketBottomOuterEdgeOver)
      .attr('class', 'dotted')
    paths.placketOuterEdgeUnder = new Path()
      .move(points.placketTopOuterEdgeUnder)
      .line(points.placketBottomOuterEdgeUnder)
      .attr('class', 'dotted')

    // Notches
    snippets['cfArmhole-notch'].anchor.x = points.cfArmhole.x - fold * 2
    snippets['cfWaist-notch'].anchor.x = points.cfArmhole.x - fold * 2
    // This notch is not available in Simone
    if (typeof snippets['cfHips-notch'] !== 'undefined')
      snippets['cfHips-notch'].anchor.x = points.cfArmhole.x - fold * 2

    // Buttons
    addButtonHoles(part, 'placketCfNeck')

    // Grainline
    points.grainlineFrom = points.placketBottomEdge.shift(0, width / 2)
    points.grainlineTo = points.placketTopEdge.shift(0, width / 2)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    // Title
    points.title = new Point(points.placketCfNeck.x, points.cfArmhole.y)
    macro('title', {
      at: points.title,
      nr: '2b',
      title: 'buttonholePlacket',
      scale: 0.75,
      rotation: -90,
    })

    // Logo
    points.logo = points.title.shift(-90, 120)
    snippets.logo = new Snippet('logo', points.logo)
      .attr('data-scale', 0.5)
      .attr('data-rotate', -90)

    if (sa) {
      paths.sa = paths.saBase.offset(sa * -1)
      paths.sa
        .line(new Point(points.bottomInnerEdge.x + sa, points.bottomInnerEdge.y + 3 * sa))
        .line(new Point(points.placketBottomEdge.x, points.placketBottomEdge.y + 3 * sa))
        .line(points.placketBottomEdge)
        .move(points.placketTopEdge)
        .line(paths.sa.start())
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    let offset = 0
    for (const pid of [
      'placketBottomOuterEdgeUnder',
      'placketBottomOuterEdgeFold',
      'placketBottomOuterEdgeOver',
      'placketCfHem',
      'placketBottomInnerEdgeOver',
      'placketBottomInnerEdgeFold',
      'placketBottomInnerEdgeUnder',
    ]) {
      offset += 15
      macro('hd', {
        from: points.placketBottomEdge,
        to: points[pid],
        y: points.placketBottomEdge.y + offset + 3 * sa,
      })
    }
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
    macro('vd', {
      from: points.placketBottomEdge,
      to: points.placketTopEdge,
      x: points.placketTopEdge.x - 30,
    })
  }

  return part
}
