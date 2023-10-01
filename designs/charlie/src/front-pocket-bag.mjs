import { front } from './front.mjs'

function draftCharlieFrontPocketBag({
  points,
  paths,
  Path,
  store,
  macro,
  snippets,
  Snippet,
  sa,
  part,
}) {
  // Clean up
  for (let id in paths) delete paths[id]
  for (let id in snippets) delete snippets[id]

  // Anchor for sampling/grid
  points.anchor = points.pocketbagTopRight.clone()

  // Paths
  paths.saBase = new Path()
    .move(points.pocketbagTopRight)
    .line(points.pocketFacingTop)
    .line(points.pocketFacingBottom)
    .join(
      new Path()
        .move(points.slantCurveStart)
        .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
        .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
        .line(points.pocketbagBottomRight)
        .split(points.pocketFacingBottom)
        .pop()
    )
  paths.seam = paths.saBase.clone().line(points.pocketbagTopRight).close().setClass('lining')

  if (sa)
    paths.sa = new Path()
      .move(points.pocketbagTopRight)
      .join(paths.saBase.offset(sa))
      .line(points.pocketbagBottomRight)
      .attr('class', 'lining sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'lining' })

  // Title
  points.titleAnchor = points.pocketbagTopRight.shiftFractionTowards(points.pocketbagBottomCp2, 0.5)
  macro('title', {
    at: points.titleAnchor,
    nr: 7,
    title: 'frontPocketBag',
    align: 'center',
    scale: 0.7,
  })

  // Cut on fold
  macro('cutonfold', {
    from: points.pocketbagBottomRight,
    to: points.pocketbagTopRight,
    grainline: true,
  })

  // Notches
  snippets.notch = new Snippet('notch', points.facingDirection)

  // Dimensions
  macro('ld', {
    id: 'hFull',
    from: points.pocketbagBottomRight,
    to: points.topPleat,
    d: -15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.pocketFacingBottom,
    to: points.pocketbagBottomRight,
    y: points.pocketbagBottomRight.y + sa + 15,
  })

  return part
}

export const frontPocketBag = {
  name: 'charlie.frontPocketBag',
  from: front,
  draft: draftCharlieFrontPocketBag,
}
