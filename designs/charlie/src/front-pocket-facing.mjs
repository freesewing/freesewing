import { frontPocketBag } from './front-pocket-bag.mjs'

function draftCharlieFrontPocketFacing({
  points,
  Point,
  paths,
  Path,
  store,
  macro,
  snippets,
  sa,
  part,
}) {
  // Clean up
  for (let id in paths) delete paths[id]
  for (let id in snippets) delete snippets[id]

  // Anchor for sampling/grid
  points.anchor = points.pocketFacingTop.clone()

  paths.seam = new Path()
    .move(points.pocketFacingTop)
    .line(points.slantTop)
    .line(points.slantCurveStart)
    .join(
      new Path()
        .move(points.slantCurveStart)
        .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
        .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
        .split(points.pocketFacingBottom)
        .shift()
    )
    .line(points.pocketFacingTop)
    .close()
    .setClass('fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa', true)

  /*
   * Annotations
   */
  // cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.titleAnchor = points.slantBottomNotch.shift(0, 10)
  macro('title', {
    at: points.titleAnchor,
    nr: 8,
    title: 'frontPocketFacing',
  })

  // Grainline
  macro('grainline', {
    from: points.slantTop,
    to: new Point(points.slantTop.x, points.facingDirection.y),
  })

  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: ['facingDirection', 'slantTopNotch', 'slantBottomNotch'],
  })

  return part
}

export const frontPocketFacing = {
  name: 'charlie.frontPocketFacing',
  from: frontPocketBag,
  draft: draftCharlieFrontPocketFacing,
}
