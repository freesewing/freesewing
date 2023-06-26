import { sleeve } from './sleeve.mjs'
import { dimensions } from './shared.mjs'

function draftBentUnderSleeve({
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
  delete paths.ts
  paths.seam = paths.us.clone().attr('class', 'fabric', true)
  delete paths.us

  points.anchor = points.usTip.clone()

  store.cutlist.addCut()

  // Complete?
  if (complete) {
    snippets.logo = new Snippet('logo', points.elbowCenter)
    macro('title', {
      at: points.armCenter,
      nr: 4,
      title: 'undersleeve',
    })

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
  }

  // Paperless?
  if (paperless) {
    dimensions(part, 'us')
    macro('hd', {
      from: points.usLeftEdge,
      to: points.usTip,
      y: points.usTip.y - sa - 15,
    })
    macro('vd', {
      from: points.tsRightEdge,
      to: points.usTip,
      x: points.tsRightEdge.x + sa + 15,
    })
  }

  return part
}

export const underSleeve = {
  name: 'bent.underSleeve',
  from: sleeve,
  draft: draftBentUnderSleeve,
}
