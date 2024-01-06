import { pctBasedOn } from '@freesewing/core'
import { panel } from './panel.mjs'
import { shape } from './shape.mjs'

export const pocket = {
  name: 'lumina.pocket',
  after: panel,
  from: shape,
  options: {
    pocket: { bool: true, menu: 'style' },
    pocketdepth: {
      pct: 90,
      min: 20,
      max: 120,
      ...pctBasedOn('waistToSeat'),
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions?.pocket ? 'style' : false),
    },
  },
  draft: ({
    measurements,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    macro,
    store,
    part,
  }) => {
    if (!options.pocket) {
      return part.hide()
    }

    const pocketDepth = measurements.waistToSeat * options.pocketdepth

    paths.pocketWaistband = new Path()
      .move(points.frontPanelWaistband)
      .line(points.backPanelWaistband)
      .addText('top', 'note center')
      .setClass('hidden')
    points.frontPocketHem = paths.frontPanel.shiftAlong(pocketDepth)
    points.backPocketHem = paths.backPanel.shiftAlong(pocketDepth)
    paths.pocketHem = new Path()
      .move(points.backPocketHem)
      .line(points.frontPocketHem)
      .addText('bottom', 'note center')
      .setClass('hidden')
    const frontPocketSplit = paths.frontPanel.split(points.frontPocketHem)
    if (frontPocketSplit) {
      paths.frontPocket = frontPocketSplit[0]
        .reverse()
        .unhide()
        .addText('front', 'note center')
        .setClass('hidden')
    } else {
      log.info('lumina:couldNotCreatePocket')
      return part.hide()
    }
    const backPocketSplit = paths.backPanel.split(points.backPocketHem)
    if (backPocketSplit) {
      paths.backPocket = backPocketSplit[0]
        .unhide()
        .addText('back', 'note center')
        .setClass('hidden')
    } else {
      log.info('lumina:couldNotCreatePocket')
      return part.hide()
    }

    paths.seam = new Path()
      .move(points.frontPocketHem)
      .join(paths.pocketHem.reverse())
      .join(paths.backPocket.reverse())
      .join(paths.pocketWaistband.reverse())
      .join(paths.frontPocket.reverse())
      .close()
      .reverse()

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    for (var i = 1; i < 4; i++) {
      if (paths.frontPanel.length() * (0.2 * i) < pocketDepth) {
        snippets['front' + i] = new Snippet('notch', paths.frontPanel.shiftFractionAlong(0.2 * i))
      }

      if (paths.backPanel.length() * (0.25 * i) < pocketDepth) {
        snippets['back' + i] = new Snippet('notch', paths.backPanel.shiftFractionAlong(0.25 * i))
      }
    }

    return part
  },
}
