import { sleeve } from './sleeve.mjs'
import { dimensions } from './shared.mjs'

function draftBentUnderSleeve({ macro, Path, points, paths, snippets, Snippet, sa, store, part }) {
  // Extract seamline from sleeve
  delete paths.ts
  paths.seam = paths.us.clone().attr('class', 'fabric', true)
  delete paths.us

  points.anchor = points.usTip.clone()

  // Seam allowance
  if (sa) {
    paths.sa = paths.seam.clone()
    // Remove hem
    paths.sa.ops.splice(-2)
    paths.sa = paths.sa
      .offset(sa)
      .join(
        new Path()
          .move(points.usWristLeft)
          .line(points.usWristRight)
          .offset(sa * 3)
      )
      .close()
      .attr('class', 'fabric sa')
  }

  /*
   * Annotatinos
   */

  // Cutlist
  store.cutlist.addCut()

  // Logo
  snippets.logo = new Snippet('logo', points.elbowCenter)

  // Title
  macro('title', {
    at: points.armCenter,
    nr: 4,
    title: 'undersleeve',
  })

  // Dimensions
  dimensions(part, 'us')
  macro('hd', {
    id: 'wArmholeInnerSleeveCapTip',
    from: points.usLeftEdge,
    to: points.usTip,
    y: points.usTip.y - sa - 15,
  })
  macro('vd', {
    id: 'hArmholeInnerSleeveCapTip',
    from: points.tsRightEdge,
    to: points.usTip,
    x: points.tsRightEdge.x + sa + 15,
  })

  return part
}

export const underSleeve = {
  name: 'bent.underSleeve',
  from: sleeve,
  draft: draftBentUnderSleeve,
}
