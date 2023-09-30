import { draftTieShape, tieShapeDimensions, calculateHelpers, options } from './shared.mjs'

function trayvonInterfacingTail(params) {
  const { paths, points, macro, complete, Path, store, absoluteOptions } = params

  calculateHelpers(params)
  draftTieShape(params, store.get('backTip'), absoluteOptions.knotWidth)
  paths.seam.addClass('interfacing')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.addCut({ cut: 1, material: 'interfacing' })

  // Title
  macro('title', {
    at: points.title,
    nr: 2,
    title: 'interfacingTail',
    rotation: -90,
  })

  // Dimensions
  tieShapeDimensions(params)
  if (complete)
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .addClass('hidden')
      .addText('45°', 'center text-sm fill-note')

  return params.part
}

function trayvonInterfacingTip(params) {
  const { paths, points, macro, complete, Path, absoluteOptions, store } = params

  calculateHelpers(params)
  draftTieShape(params, absoluteOptions.tipWidth, absoluteOptions.knotWidth)
  paths.seam.addClass('interfacing')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.addCut({ cut: 1, material: 'interfacing' })

  // Title
  macro('title', {
    at: points.title,
    nr: 1,
    title: 'interfacingTip',
    rotation: -90,
  })

  // Dimentions
  tieShapeDimensions(params)
  if (complete)
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .addClass('hidden')
      .addText('45°', 'center text-sm fill-note')

  return params.part
}

export const interfacingTail = {
  name: 'trayvon.interfacingTail',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  draft: trayvonInterfacingTail,
}
export const interfacingTip = {
  name: 'trayvon.interfacingTip',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  draft: trayvonInterfacingTip,
}
