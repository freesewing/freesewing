import { back } from './back.mjs'

function draftPocketBack({
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
  if (!options.pocketBack) return part.hide()

  paths.seam = store.get('pocketBack').clone()
  paths.seam.setClass('fabric')

  points.title = store
    .get('backPocketCenter')
    .copy()
    .translate(scale * 10, scale * 10)
  macro('title', { at: points.title, nr: 7, title: 'opal:pocketBack' })
  points.logo = points.title.translate(-scale * 20, scale * 35)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}

export const pocketBack = {
  name: 'pocketBack',
  draft: draftPocketBack,
  after: back,
}
