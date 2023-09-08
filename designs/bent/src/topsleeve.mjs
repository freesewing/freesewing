import { sleeve } from './sleeve.mjs'
import { dimensions } from './shared.mjs'

function draftBentTopSleeve({ macro, Path, points, paths, snippets, Snippet, sa, store, part }) {
  // Extract seamline from sleeve
  delete paths.us
  paths.seam = paths.ts.clone().attr('class', 'fabric', true)
  delete paths.ts

  // Seam allowance
  if (sa) {
    paths.sa = paths.seam.clone()
    // Remove hem
    paths.sa.ops.splice(-2)
    paths.sa = paths.sa
      .offset(sa)
      .join(
        new Path()
          .move(points.tsWristLeft)
          .line(points.tsWristRight)
          .offset(sa * 3)
      )
      .close()
      .addClass('fabric sa')
  }

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut()

  // Scalebox
  macro('scalebox', { at: points.elbowCenter })

  // Logo
  snippets.logo = new Snippet('logo', points.elbowCenter.shift(90, 50))

  // Title
  macro('title', {
    at: points.armCenter,
    nr: 3,
    title: 'topsleeve',
  })

  // Dimensions
  dimensions(part, 'ts')
  macro('vd', {
    id: 'hSleeveCap',
    from: points.tsLeftEdge,
    to: points.top,
    x: points.tsLeftEdge.x - sa - 15,
  })
  macro('hd', {
    id: 'wArmholeInnerToSleevecapTop',
    from: points.tsLeftEdge,
    to: points.top,
    y: points.top.x - sa - 15,
  })
  macro('hd', {
    id: 'wArmholeInnerToSleevecapEnd',
    from: points.tsLeftEdge,
    to: points.backPitchPoint,
    y: points.top.x - sa - 30,
  })
  macro('hd', {
    id: 'wSleeveHead',
    from: points.tsLeftEdge,
    to: points.tsRightEdge,
    y: points.top.x - sa - 45,
  })
  macro('vd', {
    id: 'hArmholeInnerToSleeveCapEnd',
    from: points.tsRightEdge,
    to: points.backPitchPoint,
    x: points.tsRightEdge.x + sa + 15,
  })

  return part
}

export const topSleeve = {
  name: 'bent.topSleeve',
  from: sleeve,
  draft: draftBentTopSleeve,
}
