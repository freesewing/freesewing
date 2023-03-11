function draftCathrinBase({ measurements, options, store, points, paths, Point, Path, part }) {
  // Where to divide our corset into panels
  if (options.panels === '11') store.set('gaps', [0.15, 0.275, 0.4, 0.6, 0.75])
  else store.set('gaps', [0.2, 0.35, 0.5, 0.65, 0.8])

  // Absolute values for some options
  store.set('waistReduction', measurements.waist * options.waistReduction)
  store.set('backOpening', measurements.underbust * options.backOpening)
  let len = measurements.waistToUnderbust + measurements.waistToHips
  for (let option of ['backRise', 'backDrop', 'frontRise', 'frontDrop', 'hipRise'])
    store.set(option, len * options[option])
  store.set('length', len)

  /**
   * How much should we take in the corset at waist and bust
   *
   * I assume that the hips are larger than the underbust.
   * Can I be sure? Maybe not, but a larger underbust than hip
   * measurements seems very rare to say the least.
   */
  store.set('width', 0.5 * (measurements.hips - store.get('backOpening')))
  store.set(
    'waistIntake',
    0.5 * (measurements.hips - measurements.waist + store.get('waistReduction'))
  )
  store.set('bustIntake', 0.5 * (measurements.hips - measurements.underbust))

  // Basic box (CB = Center back, CF = Center front)
  let wid = store.get('width')
  points.underbustCF = new Point(0, 0)
  points.hipsCF = new Point(0, len)
  points.hipsCB = new Point(wid, len)
  points.underbustCB = new Point(wid, 0)
  points.topSide = points.underbustCF.shiftFractionTowards(points.underbustCB, 0.5)
  points.bottomSide = points.hipsCF.shiftFractionTowards(points.hipsCB, 0.5)
  points.waistCF = points.underbustCF.shift(-90, measurements.waistToUnderbust)
  points.waistCB = new Point(points.hipsCB.x, points.waistCF.y)

  // frontRise
  points.topCF = points.underbustCF.shift(90, store.get('frontRise'))
  points.frontRiseStart = points.underbustCF.shift(0, wid * 0.15)
  points.frontRiseStartCp2 = points.underbustCF.shift(0, wid * 0.11)
  points.topCFCp1 = points.topCF.shift(0, wid * 0.11)

  // frontDrop
  points.bottomCF = points.hipsCF.shift(-90, store.get('frontDrop'))
  points.bottomCFCp2 = points.bottomCF.shift(0, wid * 0.11)

  // hipRise
  points.hipRise = points.bottomSide.shift(90, store.get('hipRise'))
  points.hipRiseCp1 = points.hipRise.shift(180, wid * 0.3)
  points.hipRiseCp2 = points.hipRise.shift(0, wid * 0.2)

  // backDrop
  points.backDrop = points.hipsCB.shift(-90, store.get('backDrop'))
  points.backDropCp1 = points.backDrop.shift(180, wid * 0.3)

  // backRise
  points.backRise = points.underbustCB.shift(90, store.get('backRise'))
  points.backRiseCp1 = points.backRise.shift(180, wid * 0.4)
  points.topSideCp1 = points.topSide.shift(0, wid * 0.2)

  // Paths
  paths.help1 = new Path()
    .move(points.underbustCF)
    .line(points.hipsCF)
    .line(points.hipsCB)
    .line(points.underbustCB)
    .close()
  paths.help2 = new Path()
    .move(points.topSide)
    .line(points.bottomSide)
    .line(points.waistCF)
    .line(points.waistCB)
  paths.help1.hide()
  paths.help2.hide()

  paths.outline = new Path()
    .move(points.bottomCF)
    .curve(points.bottomCFCp2, points.hipRiseCp1, points.hipRise)
    .curve(points.hipRiseCp2, points.backDropCp1, points.backDrop)
    .line(points.backRise)
    .curve(points.backRiseCp1, points.topSideCp1, points.topSide)
    .line(points.frontRiseStart)
    .curve(points.frontRiseStartCp2, points.topCFCp1, points.topCF)
    .line(points.bottomCF)
    .close()

  return part
}

export const base = {
  name: 'cathrin.base',
  hide: { self: true },
  measurements: ['underbust', 'waist', 'hips', 'waistToUnderbust', 'waistToHips'],
  options: {
    waistReduction: { pct: 10, min: 2, max: 20, menu: 'fit' },
    panels: { list: ['11', '13'], dflt: '13', menu: 'fit' },
    backOpening: { pct: 4, min: 3, max: 10, menu: 'style' },
    backRise: { pct: 15, min: 1, max: 25, menu: 'style' },
    backDrop: { pct: 2, min: 0, max: 5, menu: 'style' },
    frontRise: { pct: 4, min: 0.1, max: 8, menu: 'style' },
    frontDrop: { pct: 5, min: 0, max: 10, menu: 'style' },
    hipRise: { pct: 5, min: 0, max: 15, menu: 'style' },
  },
  draft: draftCathrinBase,
}
