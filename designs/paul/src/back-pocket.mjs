import { back } from './back.mjs'

function draftPaulBackPocket({ points, paths, macro, options, expand, snippets, store, sa, part }) {
  if (!options.backPockets) {
    return part.hide()
  }

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    store.flag.note({
      msg: `paul:cutBackPocket`,
      notes: ['flag:partHiddenByExpand'],
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

  for (let id in paths) if (id !== 'backPocket' && id !== 'backPocketSa') delete paths[id]
  for (let id in snippets) delete snippets[id]

  paths.backPocket.unhide().setClass('fabric')

  if (sa) {
    paths.backPocketSa.unhide().setClass('fabric sa')
  }

  store.cutlist.setCut({ cut: 1, from: 'cardboard' })
  store.cutlist.addCut({ cut: 2, from: 'fabric' })

  macro('title', {
    at: points.pocketCenter,
    nr: 9,
    title: 'backPocket',
    align: 'center',
  })

  return part
}

export const backPocket = {
  name: 'paul.backPocket',
  from: back,
  options: {},
  draft: draftPaulBackPocket,
}
