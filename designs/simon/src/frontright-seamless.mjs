import { addButtons } from './shared.mjs'

export const draftFrontRightSeamless = ({
  sa,
  store,
  Point,
  points,
  Path,
  paths,
  complete,
  macro,
  options,
  part,
}) => {
  const width = store.get('buttonPlacketWidth')
  points.placketTopFold1 = points.cfNeck.shift(0, width / 2)
  points.placketTopFold2 = points.cfNeck.shift(0, width * 1.5)
  points.placketTopEdge = points.cfNeck.shift(0, width * 2.5)
  points.placketTopIn = points.cfNeck.shift(180, width / 2)
  points.placketBottomFold1 = points.cfHem.shift(0, width / 2)
  points.placketBottomFold2 = points.cfHem.shift(0, width * 1.5)
  points.placketBottomEdge = points.cfHem.shift(0, width * 2.5)
  points.placketBottomIn = points.cfHem.shift(180, width / 2)

  paths.seam.line(points.placketTopEdge).line(points.placketBottomEdge).line(points.cfHem).close()

  if (sa)
    paths.saFromArmhole
      .line(new Point(points.placketTopEdge.x, points.placketTopEdge.y - sa))
      .line(points.placketTopEdge)
      .move(points.placketBottomEdge)
      .line(points.placketBottomEdge.shift(-90, sa * 3))
      .line(paths.hemSa.start())

  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path().move(points.cfNeck).line(points.cfHem).attr('class', 'help')
    if (!options.seperateButtonholePlacket) {
      // Match lines are only displayed on attached plackets
      paths.frontCenter.addText('simon:matchHere', 'text-xs center')
    }
    paths.placketFold1 = new Path()
      .move(points.placketTopFold1)
      .line(points.placketBottomFold1)
      .attr('class', 'dotted')
    paths.placketFold2 = new Path()
      .move(points.placketTopFold2)
      .line(points.placketBottomFold2)
      .attr('class', 'dotted')
    paths.placketInnerFold = new Path()
      .move(points.placketBottomIn)
      .line(points.placketTopIn)
      .attr('class', 'dotted')
  }

  /*
   * Annotations
   */

  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: [
      'placketTopFold1',
      'placketTopFold2',
      'placketBottomFold1',
      'placketBottomFold2',
      'cfNeck',
      'cfHem',
    ],
  })

  // Buttons
  addButtons(part)

  // Title
  macro('title', { at: points.title, nr: 1, title: 'frontRight' })

  // Dimensions
  macro('hd', {
    id: 'wHpsToEdge',
    from: points.hps,
    to: points.placketTopEdge,
    y: points.hps.y - sa - 15,
  })
  macro('hd', {
    id: 'wShoulderToEdge',
    from: points.s3ArmholeSplit,
    to: points.placketTopEdge,
    y: points.hps.y - sa - 30,
  })
  macro('hd', {
    id: 'wFull',
    from: points.armhole,
    to: points.placketTopEdge,
    y: points.hps.y - sa - 45,
  })
  macro('vd', {
    id: 'hHpsToPlacketTop',
    from: points.placketTopEdge,
    to: points.s3CollarSplit,
    x: points.placketTopEdge.x + sa + 15,
  })
  macro('vd', {
    id: 'hPlacket',
    from: points.placketBottomEdge,
    to: points.placketTopEdge,
    x: points.placketTopEdge.x + 30,
  })
  points.button0 = points.placketTopEdge
  let j
  for (let i = 0; i < options.buttons; i++) {
    j = i + 1
    macro('vd', {
      id: `hBetweenButtons${i}`,
      from: points['button' + j],
      to: points['button' + i],
      x: points.placketTopEdge.x + 15,
    })
  }
  macro('hd', {
    id: 'wPlacketFold2',
    from: points.placketTopFold2,
    to: points.placketTopEdge,
    y: points.placketTopEdge.y - 15 - sa,
  })
  macro('hd', {
    id: 'wPlacketFold1',
    from: points.placketTopFold1,
    to: points.placketTopEdge,
    y: points.placketTopEdge.y - 30 - sa,
  })
  macro('hd', {
    id: 'wCfToEdge',
    from: points.cfNeck,
    to: points.placketTopEdge,
    y: points.placketTopEdge.y - 45 - sa,
  })
  macro('hd', {
    id: 'wPlacketInnerToEdge',
    from: points.placketTopIn,
    to: points.placketTopEdge,
    y: points.placketTopEdge.y - 60 - sa,
  })

  return part
}
