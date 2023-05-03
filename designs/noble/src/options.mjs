// Constants
export const shoulderToShoulderCorrection = 0.995
export const bustDartCurve = 1
export const bustDartLength = 0.9
// Percentages
export const bustSpanEase = { pct: 0, min: -5, max: 20, menu: 'fit' }
export const backHemSlope = { deg: 2.5, min: 0, max: 5, menu: 'advanced' }
export const upperDartLength = { pct: 90, min: 80, max: 95, menu: 'darts' }
export const dartPosition = { dflt: 'shoulder', list: ['shoulder', 'armhole'], menu: 'darts' }
export const shoulderDartPosition = {
  pct: 50,
  min: 10,
  max: 90,
  menu: 'darts',
  hide: ({ options }) => options?.dartPosition === 'armhole',
}
export const armholeDartPosition = {
  pct: 50,
  min: 10,
  max: 90,
  menu: 'darts',
  hide: ({ options }) =>
    options === undefined ||
    options?.dartPosition === undefined ||
    options.dartPosition === 'shoulder',
}
