import { back } from './back.mjs'

function draftPocketCarpenter({
  options,
  absoluteOptions,
  points,
  paths,
  Snippet,
  snippets,
  sa,
  macro,
  part,
  store,
  scale,
}) {
  if (!options.pocketCarpenter) return part.hide()

  macro('rmad')
  macro('rmScalebox')

  const keepPaths = ['pocketCarpenterSeam', 'pocketCarpenterHem']
  for (const name in paths) {
    if (keepPaths.indexOf(name) === -1) delete paths[name]
  }

  delete snippets.logo

  paths.pocketCarpenterHem.setClass('fabric')
  paths.pocketCarpenterSeam.setClass('fabric')
  if (sa)
    paths.sa = paths.pocketCarpenterSeam
      .offset(sa)
      .join(paths.pocketCarpenterHem.offset(absoluteOptions.hemAllowance))
      .close()
      .setClass('fabric sa')

  macro('hd', {
    id: 'wTop',
    from: points.carpenterPocketTopBack,
    to: points.carpenterPocketTopFront,
    y: points.carpenterPocketTopFront.y - (sa + 15),
  })
  macro('hd', {
    id: 'wOpening',
    from: points.carpenterPocketTopFront,
    to: points.carpenterPocketOutseamTop,
    y: points.carpenterPocketTopFront.y - (sa + 15),
  })
  macro('hd', {
    id: 'wTotal',
    from: points.carpenterPocketTopBack,
    to: points.carpenterPocketOutseamTop,
    y: points.carpenterPocketTopFront.y - (sa + 30),
  })
  macro('vd', {
    id: 'hOpening',
    from: points.carpenterPocketTopFront,
    to: points.carpenterPocketOutseamTop,
    x: points.carpenterPocketOutseamTop.x + (sa + 15),
  })
  macro('vd', {
    id: 'hSide',
    from: points.carpenterPocketOutseamTop,
    to: points.carpenterPocketOutseamBottom,
    x: points.carpenterPocketOutseamTop.x + (sa + 15),
  })
  macro('vd', {
    id: 'hTotal',
    from: points.carpenterPocketTopFront,
    to: points.carpenterPocketOutseamBottom,
    x: points.carpenterPocketOutseamTop.x + (sa + 30),
  })

  points.grainlineTop = points.carpenterPocketTopBack.translate(scale * 10, 0)
  points.grainlineBottom = points.carpenterPocketBottomBack.translate(scale * 10, 0)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  store.cutlist.removeCut('fabric')
  store.cutlist.addCut({ cut: 1, from: 'fabric' })

  points.title = points.carpenterPocketTopBack.shiftFractionTowards(
    points.carpenterPocketOutseamBottom,
    0.5
  )
  macro('title', { at: points.title, nr: 8, title: 'opal:pocketCarpenter', align: 'center' })
  points.logo = points.title.translate(scale * 20, scale * 120)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}

export const pocketCarpenter = {
  name: 'pocketCarpenter',
  draft: draftPocketCarpenter,
  from: back,
}
