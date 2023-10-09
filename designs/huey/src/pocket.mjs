import { front } from './front.mjs'

function draftHueyPocket({
  macro,
  Path,
  points,
  paths,
  snippets,
  Snippet,
  sa,
  store,
  expand,
  options,
  part,
}) {
  if (!options.pocket) return part

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `huey:cutPocket`,
      notes: 'flag:partHiddenByExpand',
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  // Clear paths and snippets
  for (let p of Object.keys(paths)) delete paths[p]
  for (let p of Object.keys(snippets)) delete snippets[p]

  // Paths
  paths.seam = new Path()
    .move(points.cfHem)
    .line(points.pocketHem)
    .line(points.pocketTip)
    .curve_(points.pocketTipCp2, points.pocketTopRight)
    .line(points.pocketCfTop)
    .line(points.cfHem)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Logo
  points.logo = points.pocketCfTop.shiftFractionTowards(points.pocketHem, 0.3)
  snippets.logo = new Snippet('logo', points.logo).scale(0.666)

  // Title
  points.title = points.pocketCfTop.shiftFractionTowards(points.pocketHem, 0.5)
  macro('title', {
    at: points.title,
    nr: 4,
    title: 'pocket',
    align: 'center',
  })

  // Grainline
  macro('grainline', {
    from: points.cfHem.shift(45, 20),
    to: points.pocketCfTop.shift(-45, 20),
  })

  // Dimensions
  macro('hd', {
    id: 'wAtWaist',
    from: points.cfHem,
    to: points.pocketHem,
    y: points.cfHem.y + sa + 15,
  })
  macro('hd', {
    id: 'WFull',
    from: points.cfHem,
    to: points.pocketTip,
    y: points.cfHem.y + sa + 30,
  })
  macro('hd', {
    id: 'wAtTop',
    from: points.pocketCfTop,
    to: points.pocketTopRight,
    y: points.pocketCfTop.y - sa - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.cfHem,
    to: points.pocketCfTop,
    x: points.cfHem.x - sa - 15,
  })
  macro('vd', {
    id: 'hToTip',
    from: points.pocketHem,
    to: points.pocketTip,
    x: points.pocketTip.x + sa + 15,
  })

  return part
}

export const pocket = {
  name: 'huey.pocket',
  from: front,
  draft: draftHueyPocket,
}
