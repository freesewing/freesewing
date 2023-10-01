import {
  calculateHelpers,
  draftTieShape,
  seamAllowance,
  tieShapeDimensions,
  options,
} from './shared.mjs'

function trayvonLiningTail(params) {
  const { Path, Snippet, macro, options, paths, points, sa, snippets, store, absoluteOptions } =
    params

  calculateHelpers(params)
  draftTieShape(params, store.get('backTip') * 2.5, options.knotWidth * 2.5)

  // Cut part short
  points.cutRight = points.tipRight.shiftTowards(points.midRight, absoluteOptions.tipWidth * 2.5)
  points.cutLeft = points.cutRight.flipX()

  // Overwrite path
  paths.seam = new Path()
    .move(points.tip)
    .line(points.tipLeft)
    .line(points.cutLeft)
    .line(points.cutRight)
    .line(points.tipRight)
    .line(points.tip)
    .close()
    .addClass('lining')
  if (sa) seamAllowance(params, 'lining')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.addCut({ cut: 1, material: 'lining' })

  // Title
  macro('title', {
    at: points.title,
    nr: 6,
    title: 'liningTip',
    rotation: -90,
  })

  // Notch
  snippets.notch = new Snippet('notch', points.tip)

  // Dimensions
  tieShapeDimensions(params, true)

  return params.part
}

function trayvonLiningTip(params) {
  const { Path, Snippet, macro, paths, points, sa, snippets, absoluteOptions, store } = params

  calculateHelpers(params)
  draftTieShape(params, absoluteOptions.tipWidth * 2.5, absoluteOptions.knotWidth * 2.5)

  // Cut part short
  points.cutRight = points.tipRight.shiftTowards(points.midRight, absoluteOptions.tipWidth * 2.5)
  points.cutLeft = points.cutRight.flipX()

  // Overwrite path
  paths.seam = new Path()
    .move(points.tip)
    .line(points.tipLeft)
    .line(points.cutLeft)
    .line(points.cutRight)
    .line(points.tipRight)
    .line(points.tip)
    .close()
    .addClass('lining')

  if (sa) seamAllowance(params, 'lining')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.addCut({ cut: 1, material: 'lining' })

  // Title
  macro('title', {
    at: points.title,
    nr: 5,
    title: 'liningTip',
    rotation: -90,
  })

  // Notch
  snippets.notch = new Snippet('notch', points.tip)

  // Miniscale
  macro('miniscale', { at: points.gridAnchor })

  // Dimensions
  tieShapeDimensions(params, true)

  return params.part
}

export const liningTail = {
  name: 'trayvon.liningTail',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  draft: trayvonLiningTail,
}

export const liningTip = {
  name: 'trayvon.liningTip',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  draft: trayvonLiningTip,
}
