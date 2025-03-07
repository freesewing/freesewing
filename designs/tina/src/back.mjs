import { back as bibiBack } from '@freesewing/bibi'

function tinaBack({ part, points, macro, store }) {
  // Replace Bibi title
  store.cutlist.setCut({ cut: 1, from: 'fabric' })
  macro('rmTitle', 'title')
  macro('title', { at: points.title, nr: 2, title: 'back' })

  // Unchanged from Bibi
  return part
}

export const back = {
  name: 'tina.back',
  from: bibiBack,
  hide: { from: true },
  options: {},
  draft: tinaBack,
}
