import { base } from '@freesewing/brian'
import {
  adjustSidePoints,
  constructBackHem,
  constructBackPoints,
  constructFrontHem,
  constructFrontPoints,
  correctArmHole,
  draftRibbing,
} from './shared.mjs'

export const waistband = {
  name: 'bibi.waistband',
  from: base,
  hide: { from: true },

  options: {
    // Bibi specific, placed here as this is the earliest part that drafts the sideseam
    fitWaist: { bool: true, menu: 'fit', order: 'EBA' },
    waistEase: {
      pct: 5,
      min: -10,
      max: 20,
      menu: (settings, mergedOptions) => (mergedOptions.fitWaist ? 'fit' : false),
      order: 'EBB',
    },
    hipsEase: { pct: 5, min: -5, max: 50, menu: 'fit', order: 'ECA' },
    seatEase: { pct: 2, min: -5, max: 50, menu: 'fit', order: 'EDA' },
    chestEase: { pct: 2, min: -5, max: 25, menu: 'fit', order: 'EAB' },
    length: {
      dflt: 'seat',
      list: ['underbust', 'waist', 'hips', 'seat', 'knee', 'floor'],
      menu: 'style.length',
    },
    flare: {
      pct: 0,
      min: 0,
      max: 150,
      menu: (settings, mergedOptions) =>
        (mergedOptions.length === 'waist' && mergedOptions.lengthBonus > 0) ||
        mergedOptions.length === 'hips' ||
        mergedOptions.length === 'seat' ||
        mergedOptions.length === 'knee' ||
        mergedOptions.length === 'floor'
          ? 'style.length'
          : false,
    },
    backNeckCutout: { pct: 6, min: 2, max: 110, menu: 'style' },
    backNeckBend: { pct: 50, min: 0, max: 70, menu: 'style' },
    lengthBonus: { pct: 0, min: -30, max: 30, menu: 'style.length' },
    draftForHighBust: { bool: true, menu: 'fit' },
    // waistband specific
    useWaistRibbing: { bool: false, menu: 'style' },
    ribbingStretch: { pct: 15, min: 0, max: 30, menu: 'fit' },
    ribbingHeight: {
      pct: 10,
      min: 5,
      max: 15,
      menu: (settings, mergedOptions) =>
        mergedOptions.useWaistRibbing || mergedOptions.useCuffRibbing ? 'style' : false,
      toAbs: (val, { measurements }) =>
        (measurements.hpsToWaistBack + measurements.waistToHips) * val,
    },
    necklineWidth: { pct: 15, min: -5, max: 90, menu: 'style' },
    strapWidth: {
      pct: 40,
      min: 15,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.sleeves ? false : 'style.sleeves'),
    },
    sleeves: { bool: true, menu: 'style.sleeves' },
    seatBackAdjustment: {
      pct: 20,
      min: 0,
      max: 100,
      menu: 'advanced',
    },
    curvatureAdjustment: {
      pct: 50,
      min: 0.1,
      max: 100,
      menu: 'advanced',
    },
    waistAdjustment: {
      pct: 95,
      min: 50,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.fitWaist ? 'advanced' : false),
    },
    lengthAdjustment: {
      pct: 25,
      min: 0,
      max: 100,
      menu: 'advanced',
    },
  },
  draft: bibiWaistband,
}

function bibiWaistband({ part, store, measurements, options, paths, points, snippets, macro }) {
  store.set(
    'ribbingHeight',
    (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight
  )

  if (!options.useWaistRibbing) {
    return part.hide()
  }

  // draft a simple version of front and back to determine hem length

  constructBackPoints(part)

  adjustSidePoints(part)

  correctArmHole(part)

  constructBackHem(part)

  store.set('backHemLength', paths.hem.length() * 2)

  constructFrontPoints(part)

  adjustSidePoints(part)

  constructFrontHem(part)

  store.set('frontHemLength', paths.hem.length() * 2)

  // clean up temporary stuff
  for (const key of Object.keys(paths)) delete paths[key]
  for (const key of Object.keys(snippets)) delete snippets[key]
  for (const key of Object.keys(points)) delete points[key]

  draftRibbing(part, (store.frontHemLength + store.backHemLength) * (1 - options.ribbingStretch))

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'ribbing' })

  // Title
  macro('title', {
    at: points.title,
    nr: 5,
    scale: 0.5,
    rotation: 90,
    title: 'waistband',
  })

  return part
}
