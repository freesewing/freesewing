import { back } from './back.mjs'

function draftPocketBack({
  options,
  absoluteOptions,
  points,
  paths,
  Snippet,
  snippets,
  sa,
  macro,
  part,
  scale,
}) {
  if (!options.pocketBack) return part.hide()

  macro('rmad')
  macro('rmScalebox')

  points.title = points.backPocket.copy().translate(scale * 10, scale * 10)

  const keepPaths = ['pocketBackSeam', 'pocketBackHem']
  for (const name in paths) {
    if (keepPaths.indexOf(name) === -1) delete paths[name]
  }

  paths.pocketBackSeam.setClass('fabric')
  paths.pocketBackHem.setClass('fabric')
  if (sa)
    paths.sa = paths.pocketBackSeam
      .offset(sa)
      .join(paths.pocketBackHem.offset(absoluteOptions.hemAllowance))
      .close()
      .setClass('fabric sa')

  macro('hd', {
    id: 'wTop',
    from: points.backPocketBackTop,
    to: points.backPocketFrontTop,
    y: points.backPocketBackTop.y - (absoluteOptions.hemAllowance + 15),
  })
  macro('hd', {
    id: 'wBottomCenter',
    from: points.backPocketBackBottomP2,
    to: points.backPocketFrontBottomP1,
    y: points.backPocketBackBottom.y + (sa + 15),
  })
  macro('hd', {
    id: 'wBottomSide',
    from: points.backPocketFrontBottomP1,
    to: points.backPocketFrontBottomP2,
    y: points.backPocketBackBottom.y + (sa + 15),
  })
  macro('vd', {
    id: 'hSideMain',
    from: points.backPocketFrontTop,
    to: points.backPocketFrontBottomP2,
    x: points.backPocketFrontTop.x + (sa + 15),
  })
  macro('vd', {
    id: 'hSideDiagonal',
    from: points.backPocketFrontBottomP2,
    to: points.backPocketFrontBottomP1,
    x: points.backPocketFrontTop.x + (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('vd', {
    id: 'hSideTotal',
    from: points.backPocketFrontTop,
    to: points.backPocketFrontBottomP1,
    x: points.backPocketFrontTop.x + (sa + 30),
  })

  points.grainlineTop = points.backPocketBackTop.shiftFractionTowards(
    points.backPocketFrontTop,
    0.5
  )
  points.grainlineBottom = points.backPocketBackBottom.shiftFractionTowards(
    points.backPocketFrontBottom,
    0.5
  )
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  macro('title', { at: points.title, nr: 7, title: 'opal:pocketBack' })
  points.logo = points.title.translate(-scale * 20, scale * 35)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}

export const pocketBack = {
  name: 'pocketBack',
  draft: draftPocketBack,
  from: back,
}
