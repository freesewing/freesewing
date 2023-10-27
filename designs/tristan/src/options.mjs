import { pctBasedOn } from '@freesewing/core'

// Constants
export const shoulderToShoulderCorrection = 0.995
export const bustDartCurve = 1
export const bustDartLength = 0.9
export const armholeFrontIn = 0.2
export const armholeFrontDepth = 0.65
export const armholeBackIn = 0.6
export const armholeBackDepth = 0.6
export const dartPosition = 'shoulder'
// Percentages
export const armholeDepth = { pct: 44, min: 38, max: 55, menu: 'armhole' }
export const strapWidth = { pct: 45, min: 5, max: 90, menu: 'style' }
export const cutDepthFront = { pct: 80, min: 0, max: 125, menu: 'style' }
export const cutDepthBack = { pct: 40, min: 5, max: 90, menu: 'style' }
// export const cutShape = { pct: 80, min: 0, max: 100, menu: 'style' }
export const cutRoundnessFront = { pct: 10, min: 0, max: 100, menu: 'style' }
export const cutRoundnessBack = { pct: 20, min: 0, max: 100, menu: 'style' }
export const bustSpanEase = { pct: 0, min: -5, max: 20, ...pctBasedOn('bustSpan'), menu: 'fit' }
export const backHemSlope = { deg: 2.5, min: 0, max: 5, menu: 'advanced' }
export const upperDartLength = { pct: 90, min: 80, max: 95, menu: 'darts' }
export const shoulderDartPosition = {
  pct: 50,
  min: 10,
  max: 90,
  menu: (settings, mergedOptions) => (mergedOptions.dartPosition === 'shoulder' ? 'darts' : false),
}
export const armholeDartPosition = {
  pct: 50,
  min: 10,
  max: 90,
  menu: (settings, mergedOptions) => (mergedOptions.dartPosition === 'armhole' ? 'darts' : false),
}
