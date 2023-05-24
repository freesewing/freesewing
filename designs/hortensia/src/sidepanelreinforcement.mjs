import { sidepanel } from './sidepanel.mjs'
import { bottomsidepanel } from './bottomsidepanel.mjs'

function draftHortensiaSidepanelreinforcement({
  store,
  Point,
  Path,
  points,
  paths,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  const w = store.get('width')
  const h = store.get('sidePanelReinforcementHeight')
  const sizeRatio = store.get('sizeRatio')

  points.topMiddle = new Point(0, 0)
  points.topLeft = points.topMiddle.shift(180, w / 2)
  points.topRight = points.topMiddle.shift(0, w / 2)

  bottomsidepanel(points, points.topMiddle, w, h, sizeRatio)

  paths.seam = new Path()
    .move(points.topMiddle)
    .line(points.topLeft)
    .line(points.bottomLeftU)
    .curve(points.bottomLeftUcp, points.bottomLeftRcp, points.bottomLeftR)
    .line(points.bottomRightL)
    .curve(points.bottomRightLcp, points.bottomRightUcp, points.bottomRightU)
    .line(points.topRight)
    .line(points.topMiddle)
    .close()
    .attr('class', 'fabric')

  store.cutlist.addCut()

  // Complete?
  if (complete) {
    points.title = points.topLeft
      .shiftFractionTowards(points.bottomRight, 0.5)
      .attr('data-text-class', 'center')
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'SidePanelReinforcement',
      scale: 0.25,
    })
    points.__titleNr.attr('data-text-class', 'center')
    points.__titleName.attr('data-text-class', 'center')
    points.__titlePattern.attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeftU,
      to: points.bottomRightU,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRightL,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}

export const sidepanelreinforcement = {
  name: 'hortensia.sidepanelreinforcement',
  after: sidepanel,
  draft: draftHortensiaSidepanelreinforcement,
}
