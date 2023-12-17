import { back } from './back.mjs'

function draftPocketCarpenterExtra({
  measurements,
  options,
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
  if (!options.pocketCarpenterExtra) return part.hide()

  paths.seam = store.get('pocketCarpenterExtra').clone()
  paths.seam.setClass('fabric')

  points.title = store
    .get('carpenterPocketExtraLabel')
    .copy()
    .translate(scale * 5, scale * 10)
  macro('title', { at: points.title, nr: 9, title: 'opal:pocketCarpenterExtra' })
  points.logo = points.title.translate(scale * -10, scale * 35)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}

export const pocketCarpenterExtra = {
  name: 'pocketCarpenterExtra',
  draft: draftPocketCarpenterExtra,
  after: back,
}
