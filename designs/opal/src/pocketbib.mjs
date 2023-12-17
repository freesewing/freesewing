import { bib } from './bib.mjs'

function draftPocketBib({
  measurements,
  options,
  absoluteOptions,
  Point,
  Path,
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
  if (!options.pocketBib) return part.hide()

  macro('rmad')

  delete paths.seam
  delete paths.hem
  delete paths.sa
  delete paths.placket
  if (options.bibOnFold) delete paths.cf
  paths.bibPocketSeam.setClass('fabric')
  paths.bibPocketHem.setClass('fabric')

  delete points.bibPocketText

  if (sa)
    paths.sa = paths.bibPocketHem
      .offset(absoluteOptions.hemAllowance)
      .join(paths.bibPocketSeam.offset(sa))
      .close()
      .setClass('fabric sa')

  macro('hd', {
    id: 'wTop',
    from: options.bibOnFold
      ? points.pocketCenterTop
      : points.pocketSideTop.flipX(points.pocketCenterTop),
    to: points.pocketSideTop,
    y: points.pocketCenterTop.y - (absoluteOptions.hemAllowance + 15),
  })

  points.grainlineTop = points.pocketCenterTop
  points.grainlineBottom = points.pocketCenterBottom
  options.bibOnFold
    ? macro('cutOnFold', {
        from: points.grainlineTop,
        to: points.grainlineBottom,
      })
    : macro('grainline', {
        from: points.grainlineTop,
        to: points.grainlineBottom,
      })

  points.title = store
    .get('bibPocketCenter')
    .copy()
    .translate(scale * 10, scale * 10)
  macro('title', { at: points.title, nr: 4, title: 'opal:pocketBib' })
  options.bibOnFold
    ? delete snippets.logo
    : (points.logo = points.title.translate(-scale * 20, scale * 35))

  return part
}

export const pocketBib = {
  name: 'pocketBib',
  draft: draftPocketBib,
  from: bib,
}
