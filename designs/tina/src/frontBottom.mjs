import { front } from './front.mjs'

function tinaFrontBottom({ Snippet, paths, points, part, snippets, store, macro, sa }) {
  for (let key of Object.keys(paths)) paths[key].hide()
  for (let key of Object.keys(snippets)) delete snippets[key]

  if (!paths.tinaSeamBottom) {
    return part.hide()
  }

  paths.tinaSeamBottomHalf.unhide()
  if (sa) paths.tinaSeamBottomHalfSa.unhide()

  macro('cutonfold', {
    from: points.cfSplit,
    to: points.cfHem,
  })

  points.title = points.cfSplit.shift(-70, 70)
  points.logo = points.shoulderCp1.clone()
  snippets.logo = new Snippet('logo', points.logo)

  store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

  macro('rmTitle', 'title')
  macro('title', { at: points.title, nr: '1b', title: 'frontBottom' })

  return part
}

export const frontBottom = {
  name: 'tina.frontBottom',
  from: front,
  options: {},
  draft: tinaFrontBottom,
}
