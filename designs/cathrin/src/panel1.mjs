import { panels } from './panels.mjs'
import { draftPanel1ab } from './panel1ab.mjs'

function draftCathrinPanel1(params) {
  const { macro, sa, store, paths, points, options, part } = params

  points.anchor = points.topCF.clone()

  delete paths.outline
  delete paths.panel2
  delete paths.panel3
  delete paths.panel4
  delete paths.panel5
  delete paths.panel6

  if (options.panels === '13') return draftPanel1ab(params)

  if (sa) paths.sa = paths.panel1.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cut list
  store.cutlist.setCut([
    { cut: 1, from: 'interfacing' },
    { cut: 1, from: 'fabric' },
  ])

  // Cut on fold indicaor
  macro('cutonfold', {
    to: points.bottomCF,
    from: points.topCF,
    grainline: true,
  })

  // Title
  points.title = points.waistCF.shiftFractionTowards(points.underbustGap1Left, 0.5)
  macro('title', {
    nr: 1,
    title: '',
    at: points.title,
    align: 'center',
    scale: 0.7,
  })

  // Dimensions
  macro('vd', {
    id: 'hCfBottomToWais',
    from: points.bottomCF,
    to: points.waistCF,
    x: points.topCF.x - sa - 15,
  })
  macro('vd', {
    id: 'hCfWaistToTop',
    from: points.waistCF,
    to: points.topCF,
    x: points.topCF.x - sa - 15,
  })
  macro('vd', {
    id: 'hSideBottomToWaist',
    from: points.hipsGap1,
    to: points.waistGap1Left,
    x: points.hipsGap1.x + sa + 15,
  })
  macro('vd', {
    id: 'hSideWaistToTop',
    from: points.waistGap1Left,
    to: points.underbustGap1Left,
    x: points.hipsGap1.x + sa + 15,
  })
  macro('hd', {
    id: 'wBottom',
    from: points.bottomCF,
    to: points.hipsGap1,
    y: points.bottomCF.y + sa + 15,
  })
  macro('hd', {
    id: 'wTop',
    from: points.topCF,
    to: points.underbustGap1Left,
    y: points.topCF.y - sa - 15,
  })
  macro('ld', {
    id: 'wAtWaist',
    from: points.waistCF,
    to: points.waistGap1Left,
  })

  return part
}

export const panel1 = {
  name: 'cathrin.panel1',
  from: panels,
  draft: draftCathrinPanel1,
}
