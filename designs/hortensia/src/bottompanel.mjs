import { sidepanel } from './sidepanel.mjs'

function draftHortensiaBottompanel({
  store,
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  let w = store.get('bottomPanelLength')
  let h = store.get('depth')

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(0, h)
  points.bottomRight = new Point(w, h)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  store.cutlist.addCut({ cut: 1 })
  store.cutlist.addCut({ cut: 1, material: 'lining' })

  // Complete?
  if (complete) {
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(-90, 50).attr('data-text-class', 'center')

    macro('title', {
      at: points.title,
      nr: 3,
      title: 'BottomPanel',
    })
    points.__titleNr.attr('data-text-class', 'center')
    points.__titleName.attr('data-text-class', 'center')
    points.__titlePattern.attr('data-text-class', 'center')

    let scaleBoxMove = 180 * options.size

    if (scaleBoxMove > 50 && w > 100) {
      points.scaleBox = points.logo.shift(90, scaleBoxMove)
      macro('scalebox', {
        at: points.scaleBox,
      })
    }

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}

export const bottompanel = {
  name: 'hortensia.bottompanel',
  after: sidepanel,
  draft: draftHortensiaBottompanel,
}
