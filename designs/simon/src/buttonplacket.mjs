import { addButtons } from './shared.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'

function simonButtonPlacket({
  utils,
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
  store,
  part,
}) {
  if (!options.separateButtonPlacket) {
    part.paths = {}
    part.snippets = {}
    part.points = {}
    return part
  }

  for (const id in paths) {
    if (id !== 'seam') delete part.paths[id]
  }
  let notchesToKeep = ['cfBust-notch', 'cfArmhole-notch', 'cfWaist-notch', 'cfHem-notch']
  for (const id in snippets) {
    if (!notchesToKeep.includes(id)) delete snippets[id]
  }
  macro('flip')
  const width = store.get('buttonPlacketWidth')
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

  paths.saBase = new Path()
    .move(points.placketBottomIn)
    .line(points.placketTopIn)
    .join(paths.seam.split(points.placketTopIn)[1])
    .line(points.placketTopEdge)
    .line(points.placketBottomEdge)

  paths.seam = paths.saBase.clone().close().attr('class', 'fabric')
  if (sa)
    paths.sa = paths.saBase
      .offset(sa * -1)
      .line(new Point(points.placketBottomEdge.x + sa, points.placketBottomEdge.y + 3 * sa))
      .line(new Point(points.placketBottomIn.x - sa, points.placketBottomIn.y + 3 * sa))
      .close()
      .attr('class', 'fabric sa')

  if (complete) {
    // Placket help lines
    paths.placketOuterFold = new Path()
      .move(points.placketTopOut)
      .line(points.placketBottomOut)
      .attr('class', 'dotted')
    macro('sprinkle', {
      snippet: 'notch',
      on: ['placketTopOut', 'placketBottomOut'],
    })
  }

  /*
   * Annotations
   */

  // Buttons
  addButtons(part)

  // Grainline
  points.grainlineFrom = points.placketBottomEdge.shift(180, width / 2)
  points.grainlineTo = points.placketTopEdge.shift(180, width / 2)
  macro('grainline', {
    from: points.grainlineFrom,
    to: points.grainlineTo,
  })

  // Title
  points.title = new Point(points.placketTopOut.x, points.cfArmhole.y)
  macro('title', {
    at: points.title,
    nr: '1b',
    title: 'buttonPlacket',
    scale: 0.75,
    rotation: -90,
  })

  // Logo
  points.logo = points.title.shift(-90, 120)
  snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.5).attr('data-rotate', -90)

  // Dimensions
  macro('hd', {
    id: 'wHalfPlacket',
    from: points.placketTopIn,
    to: points.placketTopOut,
    y: points.placketTopIn.y - 15 - sa,
  })
  macro('hd', {
    id: 'wFull',
    from: points.placketTopIn,
    to: points.placketTopEdge,
    y: points.placketTopIn.y - 30 - sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.placketBottomEdge,
    to: points.placketTopEdge,
    x: points.placketTopEdge.x + 15 + sa,
  })
  points.button0 = points.placketTopEdge
  let j
  for (let i = 0; i < options.buttons; i++) {
    j = i + 1
    macro('vd', {
      id: `hBetweenButtons${i}`,
      from: points['button' + j],
      to: points['button' + i],
      x: points.placketTopIn.x - 15 - sa,
    })
  }

  return part
}

export const buttonPlacket = {
  name: 'simon.buttonPlacket',
  from: front,
  after: back,
  draft: simonButtonPlacket,
}
