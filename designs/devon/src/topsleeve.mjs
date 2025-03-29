import { sleeve } from './sleeve.mjs'

export const topSleeve = {
  name: 'devon.topSleeve',
  from: sleeve,
  draft: ({ macro, Path, points, paths, snippets, Snippet, sa, store, part }) => {
    // Extract seamline from sleeve
    delete paths.us
    delete paths.underSleeve
    paths.seam = paths.topSleeve.clone().attr('class', 'fabric', true)
    delete paths.ts
    delete paths.topSleeve

    // Seam allowance
    if (sa) {
      paths.sa = paths.seam.offset(sa).addClass('fabric sa')
    }

    /*
     * Annotations
     */
    // Cut list
    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    // Scalebox
    macro('scalebox', { at: points.elbowCenter })

    // Logo
    snippets.logo = new Snippet('logo', points.elbowCenter.shift(90, 50))

    // Title
    macro('title', {
      at: points.armCenter,
      nr: 8,
      title: 'topsleeve',
    })

    return part
  },
}
