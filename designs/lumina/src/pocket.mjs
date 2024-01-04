import { pctBasedOn } from '@freesewing/core'
import { panel } from './panel.mjs'
import { points } from './points.mjs'

export const pocket = {
  name: 'lumina.pocket',
  // from: panel,
  // after: panel,
  // hide: hidePresets.HIDE_TREE,
  from: points,
  options: {
    pocket: { bool: true, menu: 'style' },
    pocketdepth: {
      pct: 80,
      min: 0,
      max: 100,
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
    // const p = store.get('pocket')
    // paths = p.paths
    // points = p.points

    if (!options.pocket) {
      return part.hide()
    }

    console.log({ s: JSON.parse(JSON.stringify(store)) })
    console.log({
      points: JSON.parse(JSON.stringify(points)),
      paths: JSON.parse(JSON.stringify(paths)),
    })

    const pocketDepth = measurements.waistToSeat * options.pocketdepth

    paths.pocketWaistband = new Path()
      .move(points.backPanelWaistband)
      .line(points.frontPanelWaistband)
      .addText('top', 'note center')
      .setClass('hidden')
    points.frontPocketHem = paths.frontPanel.shiftAlong(pocketDepth)
    points.backPocketHem = paths.backPanel.shiftAlong(pocketDepth)
    paths.pocketHem = new Path()
      .move(points.frontPocketHem)
      .line(points.backPocketHem)
      .addText('bottom', 'note center')
      .setClass('hidden')
    paths.frontPocket = paths.frontPanel
      .split(points.frontPocketHem)[0]
      .unhide()
      .addText('front', 'note center')
      .setClass('hidden')
    paths.backPocket = paths.backPanel
      .split(points.backPocketHem)[0]
      .unhide()
      .reverse()
      .addText('back', 'note center')
      .setClass('hidden')

    paths.seam = new Path()
      .move(points.frontPocketHem)
      .join(paths.pocketHem)
      .join(paths.backPocket)
      .join(paths.pocketWaistband)
      .join(paths.frontPocket)
      .close()

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    return part
  },
}
