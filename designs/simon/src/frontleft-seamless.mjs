import { addButtonHoles } from './shared.mjs'

export const draftFrontLeftSeamless = ({
  sa,
  points,
  Path,
  paths,
  complete,
  store,
  macro,
  options,
  part,
}) => {
  const width = store.get('buttonholePlacketWidth')
  points.placketCfNeck = points.cfNeck
  points.placketTopFold1 = points.cfNeck.shift(180, width / 2)
  points.placketTopFold2 = points.cfNeck.shift(180, width * 1.5)
  points.placketTopEdge = points.cfNeck.shift(180, width * 2.5)
  points.placketBottomFold1 = points.cfHem.shift(180, width / 2)
  points.placketBottomFold2 = points.cfHem.shift(180, width * 1.5)
  points.placketBottomEdge = points.cfHem.shift(180, width * 2.5)

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
    paths.frontCenter = new Path().move(points.cfNeck).line(points.cfHem).attr('class', 'help')
    if (!options.separateButtonPlacket) {
      // Match lines are only displayed on attached plackets
      paths.frontCenter.addText('simon:matchHere', 'text-xs center')
    }
    paths.placketFold1 = new Path()
      .move(points.placketBottomFold1)
      .line(points.placketTopFold1)
      .attr('class', 'dotted')
    paths.placketFold2 = new Path()
      .move(points.placketBottomFold2)
      .line(points.placketTopFold2)
      .attr('class', 'dotted')
  }

  /*
   * Annotations
   */
  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: [
      'cfNeck',
      'cfHem',
      'placketTopFold1',
      'placketTopFold2',
      'placketBottomFold1',
      'placketBottomFold2',
    ],
  })

  // Buttons
  addButtonHoles(part, 'cfNeck')

  // Title
  macro('title', { at: points.title, nr: 2, title: 'frontLeft' })

  // Dimensions
  let offset = 0
  for (const pid of ['placketBottomFold2', 'placketBottomFold1', 'cfHem', 'hips']) {
    offset += 15
    macro('hd', {
      id: `wEdgeTo${pid}`,
      from: points.placketBottomEdge,
      to: points[pid],
      y: points.placketBottomEdge.y + offset + 3 * sa,
    })
  }
  macro('hd', {
    id: 'wEdgeToHps',
    from: points.placketTopEdge,
    to: points.s3CollarSplit,
    y: points.s3CollarSplit.y - 15 - sa,
  })
  macro('hd', {
    id: 'wEdgeToShoulder',
    from: points.placketTopEdge,
    to: points.s3ArmholeSplit,
    y: points.s3CollarSplit.y - 30 - sa,
  })
  macro('hd', {
    id: 'wFull',
    from: points.placketTopEdge,
    to: points.armhole,
    y: points.s3CollarSplit.y - 45 - sa,
  })
  points.button0 = points.placketTopEdge
  let j
  for (let i = 0; i < options.buttons; i++) {
    j = i + 1
    macro('vd', {
      from: points['button' + j],
      id: `hBetweenButtons${i}`,
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
