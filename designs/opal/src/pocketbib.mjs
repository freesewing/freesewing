import { bib } from './bib.mjs'

function draftPocketBib({
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
  if (!options.pocketBib) return part.hide()

  macro('rmad')

  const keepPaths = ['bibPocketSeam', 'bibPocketHem', 'cf']
  for (const name in paths) {
    if (keepPaths.indexOf(name) === -1) delete paths[name]
  }

  if (options.bibPocketOnFold) delete paths.cf
  paths.bibPocketSeam.unhide().setClass('fabric')
  paths.bibPocketHem.unhide().setClass('fabric')

  delete points.bibPocketText

  if (sa)
    paths.sa = paths.bibPocketHem
      .offset(absoluteOptions.hemAllowance)
      .join(paths.bibPocketSeam.offset(sa))
      .close()
      .setClass('fabric sa')

  macro('hd', {
    id: 'wTop',
    from: options.bibPocketOnFold
      ? points.pocketCenterTop
      : points.pocketSideTop.flipX(points.pocketCenterTop),
    to: points.pocketSideTop,
    y: points.pocketCenterTop.y - (absoluteOptions.hemAllowance + 15),
  })
  if (options.pocketBibStyle !== 'rectangle') {
    if (options.pocketBibStyle !== 'pentagon')
      macro('hd', {
        id: 'wBottomCenter',
        from: options.bibPocketOnFold
          ? points.pocketCenterBottom
          : points.pocketSideBottom.flipX(points.pocketCenterTop),
        to: points.pocketSideBottom,
        y: points.pocketCenterBottom.y + (sa + 15),
      })
    if (options.pocketBibStyle !== 'pentagon')
      macro('hd', {
        id: 'wBottomSide',
        from: points.pocketSideBottom,
        to: points.pocketFeatureSide,
        y: points.pocketCenterBottom.y + (sa + 15),
      })
    macro('hd', {
      id: 'wBottom',
      from: options.bibPocketOnFold
        ? points.pocketCenterBottom
        : points.pocketFeatureSide.flipX(points.pocketCenterTop),
      to: points.pocketFeatureSide,
      y: points.pocketCenterBottom.y + (sa + 30),
    })
    macro('vd', {
      id: 'hUpperSide',
      from: points.pocketSideTop,
      to: points.pocketFeatureSide,
      x: points.pocketFeatureSide.x + (sa + 15),
    })
    macro('vd', {
      id: 'hLowerSide',
      from: points.pocketFeatureSide,
      to: points.pocketCenterBottom,
      x: points.pocketFeatureSide.x + (sa + 15),
      noStartMarker: true,
      noEndMarker: true,
    })
  }
  macro('vd', {
    id: 'hTotalSide',
    from: points.pocketSideTop,
    to: points.pocketCenterBottom,
    x:
      options.pocketBibStyle === 'rectangle'
        ? points.pocketSideBottom.x + (sa + 15)
        : points.pocketFeatureSide.x + (sa + 30),
  })

  points.grainlineTop = points.pocketCenterTop
  points.grainlineBottom = points.pocketCenterBottom
  options.bibPocketOnFold
    ? macro('cutOnFold', {
        from: points.grainlineTop,
        to: points.grainlineBottom,
      })
    : macro('grainline', {
        from: points.grainlineTop,
        to: points.grainlineBottom,
      })

  points.title = points.pocketCenterTop
    .shiftFractionTowards(points.pocketCenterBottom, 1 / 2)
    .translate(scale * 10, scale * 10)
  macro('title', { at: points.title, nr: 4, title: 'opal:pocketBib' })
  options.bibPocketOnFold
    ? delete snippets.logo
    : (snippets.logo = new Snippet(
        'logo',
        (points.logo = points.title.translate(-scale * 20, scale * 35))
      ))

  return part
}

export const pocketBib = {
  name: 'pocketBib',
  draft: draftPocketBib,
  from: bib,
}
