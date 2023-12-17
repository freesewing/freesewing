import { back } from './back.mjs'

function draftPocketCarpenter({
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
  if (!options.pocketCarpenter) return part.hide()

  paths.seam = store.get('pocketCarpenter').clone()
  paths.seam.setClass('fabric')

  points.title = store
    .get('carpenterPocketLabel')
    .copy()
    .translate(scale * 10, scale * 50)
  macro('title', { at: points.title, nr: 8, title: 'opal:pocketCarpenter' })
  points.logo = points.title.translate(-scale * 20, scale * 35)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}

export const pocketCarpenter = {
  name: 'pocketCarpenter',
  draft: draftPocketCarpenter,
  after: back,
}
