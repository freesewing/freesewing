import {
  calculateHelpers,
  draftTieShape,
  seamAllowance,
  tieShapeDimensions,
  options,
} from './shared.mjs'

function trayvonFabricTail(params) {
  const { Path, complete, macro, paths, points, sa, store, absoluteOptions } = params

  calculateHelpers(params)
  draftTieShape(params, store.get('backTip') * 2.5, absoluteOptions.knotWidth * 2.5, true)
  paths.seam.addClass('fabric')
  if (sa) seamAllowance(params, 'fabric')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.addCut({ cut: 1 })

  // Title
  macro('title', {
    at: points.title,
    nr: 4,
    title: 'fabricTail',
    rotation: -90,
  })

  // Dimensions
  tieShapeDimensions(params)
  macro('ld', {
    id: 'lTipToNotch1',
    from: points.tip,
    to: points.notch1,
    d: absoluteOptions.tipWidth / -2.5,
  })
  macro('ld', {
    id: 'lTipToNotch2',
    from: points.notch2,
    to: points.tip,
    d: absoluteOptions.tipWidth / -2.5,
  })
  if (complete)
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .addClass('hidden')
      .addText('45°', 'center')

  return params.part
}

function trayvonFabricTip(params) {
  const { Path, Snippet, complete, macro, paths, points, sa, snippets, absoluteOptions, store } =
    params

  calculateHelpers(params)
  draftTieShape(params, absoluteOptions.tipWidth * 2.5, absoluteOptions.knotWidth * 2.5, true)
  paths.seam.addClass('fabric')
  if (sa) seamAllowance(params, 'fabric')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.addCut({ cut: 1 })

  // Title
  macro('title', {
    at: points.title,
    nr: 3,
    title: 'fabricTip',
    rotation: -90,
  })

  // Logo
  points.logo = points.tip.shiftFractionTowards(points.mid, 0.4)
  snippets.logo = new Snippet('logo', points.logo)

  // Dimensions
  tieShapeDimensions(params)
  macro('ld', {
    id: 'lTipToNotch1',
    from: points.tip,
    to: points.notch1,
    d: absoluteOptions.tipWidth / -2.5,
  })
  macro('ld', {
    id: 'lTipToNotch2',
    from: points.notch2,
    to: points.tip,
    d: absoluteOptions.tipWidth / -2.5,
  })
  if (complete)
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .addClass('hidden')
      .addText('45°', 'center')

  return params.part
}

export const fabricTail = {
  name: 'trayvon.fabricTail',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  draft: trayvonFabricTail,
}

export const fabricTip = {
  name: 'trayvon.fabricTip',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  draft: trayvonFabricTip,
}
