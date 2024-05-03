import { back } from './back.mjs'

function draftPocketCarpenterExtra({
  options,
  absoluteOptions,
  points,
  paths,
  snippets,
  sa,
  macro,
  part,
  store,
  scale,
}) {
  if (!options.pocketCarpenterExtra) return part.hide()

  macro('rmad')
  macro('rmScalebox')

  const keepPaths = ['pocketCarpenterExtraSeam', 'pocketCarpenterExtraHem']
  for (const name in paths) {
    if (keepPaths.indexOf(name) === -1) delete paths[name]
  }

  delete snippets.logo

  paths.pocketCarpenterExtraHem.setClass('fabric')
  paths.pocketCarpenterExtraSeam.setClass('fabric')
  if (sa)
    paths.sa = paths.pocketCarpenterExtraSeam
      .offset(sa)
      .join(paths.pocketCarpenterExtraHem.offset(absoluteOptions.hemAllowance))
      .close()
      .setClass('fabric sa')

  macro('hd', {
    id: 'wWidth',
    from: points.carpenterPocketExtraBackTop,
    to: points.carpenterPocketExtraOutseamTop,
    y: points.carpenterPocketExtraBackTop.y - (absoluteOptions.hemAllowance + 15),
  })
  macro('vd', {
    id: 'hHeight',
    from: points.carpenterPocketExtraOutseamTop,
    to: points.carpenterPocketOutseamBottom,
    x: points.carpenterPocketExtraOutseamTop.x + (sa + 15),
  })

  points.grainlineTop = points.carpenterPocketExtraBackTop.translate(scale * 10, 0)
  points.grainlineBottom = points.carpenterPocketBottomBack.translate(scale * 10, 0)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  store.cutlist.removeCut('fabric')
  store.cutlist.addCut({ cut: 1, from: 'fabric' })

  points.title = points.carpenterPocketExtraBackTop.shiftFractionTowards(
    points.carpenterPocketOutseamBottom,
    0.5
  )
  macro('title', { at: points.title, nr: 9, title: 'opal:pocketCarpenterExtra', align: 'center' })
  points.logo = points.title.translate(scale * -10, scale * 35)

  return part
}

export const pocketCarpenterExtra = {
  name: 'pocketCarpenterExtra',
  draft: draftPocketCarpenterExtra,
  from: back,
}
