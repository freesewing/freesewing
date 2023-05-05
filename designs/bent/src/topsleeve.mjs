import { sleeve } from './sleeve.mjs'
import { dimensions } from './shared.mjs'

function draftBentTopSleeve({
  macro,
  Path,
  points,
  paths,
  complete,
  paperless,
  snippets,
  Snippet,
  sa,
  store,
  part,
}) {
  // Extract seamline from sleeve
  delete paths.us
  paths.seam = paths.ts.clone().attr('class', 'fabric', true)
  delete paths.ts

  store.cutlist.addCut()

  // Complete?
  if (complete) {
    macro('scalebox', { at: points.elbowCenter })
    snippets.logo = new Snippet('logo', points.elbowCenter.shift(90, 50))
    macro('title', {
      at: points.armCenter,
      nr: 3,
      title: 'topsleeve',
    })

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
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    dimensions(part, 'ts')
    macro('vd', {
      from: points.tsLeftEdge,
      to: points.top,
      x: points.tsLeftEdge.x - sa - 15,
    })
    macro('hd', {
      from: points.tsLeftEdge,
      to: points.top,
      y: points.top.x - sa - 15,
    })
    macro('hd', {
      from: points.tsLeftEdge,
      to: points.backPitchPoint,
      y: points.top.x - sa - 30,
    })
    macro('hd', {
      from: points.tsLeftEdge,
      to: points.tsRightEdge,
      y: points.top.x - sa - 45,
    })
    macro('vd', {
      from: points.tsRightEdge,
      to: points.backPitchPoint,
      x: points.tsRightEdge.x + sa + 15,
    })
  }

  return part
}

export const topSleeve = {
  name: 'bent.topSleeve',
  from: sleeve,
  draft: draftBentTopSleeve,
}
