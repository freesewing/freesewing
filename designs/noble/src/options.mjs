import { pctBasedOn } from '@freesewing/core'

// Constants
export const shoulderToShoulderCorrection = 0.995
export const bustDartCurve = 1
export const bustDartLength = 0.9
// Percentages
export const bustSpanEase = { pct: 0, min: -5, max: 20, ...pctBasedOn('bustSpan'), menu: 'fit' }
export const backHemSlope = { deg: 2.5, min: 0, max: 5, menu: 'advanced' }
export const upperDartLength = { pct: 90, min: 80, max: 95, menu: 'darts' }
export const dartPosition = { dflt: 'shoulder', list: ['shoulder', 'armhole'], menu: 'darts' }
export const waistdartposition = { pct: 0, min: -100, max: 100, menu: 'darts' }
export const shoulderDartCurvature = {
  pct: 0,
  min: -5,
  max: 2.5,
  // eslint-disable-next-line no-unused-vars
  menu: (settings, mergedOptions) => (mergedOptions.dartPosition === 'shoulder' ? 'darts' : false),
}
export const shoulderDartPosition = {
  pct: 50,
  min: 10,
  max: 90,
  // eslint-disable-next-line no-unused-vars
  menu: (settings, mergedOptions) => (mergedOptions.dartPosition === 'shoulder' ? 'darts' : false),
}
export const armholeDartPosition = {
  pct: 50,
  min: 10,
  max: 90,
  // eslint-disable-next-line no-unused-vars
  menu: (settings, mergedOptions) => (mergedOptions.dartPosition === 'armhole' ? 'darts' : false),
}
