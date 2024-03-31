import { front } from './front.mjs'

function tinaFrontBottom({ paths, points, part, snippets, Snippet, store, macro, sa }) {
  if (!store.splitFrontPart) {
    return part.hide()
  }

  for (const key of Object.keys(paths)) paths[key].hide()
  for (const key of Object.keys(snippets)) delete snippets[key]

  if (points.startGather.y > points.sideSplit.y) {
    snippets.startGather = new Snippet('notch', points.startGather)
  }

  paths.tinaSeamBottomHalf.unhide()
  if (sa) paths.tinaSeamBottomHalfSa.unhide()

  macro('cutonfold', {
    from: points.cfSplit,
    to: points.cfHem,
  })

  points.title = points.cfSplit.shift(-70, 70)

  store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

  macro('rmTitle', 'title')
  macro('title', { at: points.title, nr: '1b', title: 'frontBottom' })

  macro('vd', {
    id: 'hVert',
    from: points.cfSplit,
    to: points.cfHem,
    x: -sa - 15,
  })
  macro('hd', {
    id: 'wTop',
    from: points.cfSplit,
    to: points.sideSplit,
    y: points.cfSplit.y - sa - 15,
  })
  macro('hd', {
    id: 'wBottom',
    from: points.cfHem,
    to: points.hem,
    y: points.cfHem.y + sa + 15,
  })

  return part
}

export const frontBottom = {
  name: 'tina.frontBottom',
  from: front,
  options: {},
  draft: tinaFrontBottom,
}
