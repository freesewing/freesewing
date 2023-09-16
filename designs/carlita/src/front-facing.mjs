import { frontFacing as carltonFrontFacing } from '@freesewing/carlton'

function draftCarlitaFrontFacing({
  sa,
  snippets,
  Snippet,
  store,
  points,
  macro,
  expand,
  paths,
  Path,
  part,
}) {
  macro('title', {
    at: points.title,
    nr: '1c',
    title: 'frontFacing',
    align: 'center',
  })

  return part
}

export const frontFacing = {
  name: 'carlita.frontFacing',
  from: carltonFrontFacing,
  draft: draftCarlitaFrontFacing,
  hide: {
    from: true,
    inherited: true,
  },
}
