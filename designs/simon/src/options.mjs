// Static
export const collarFactor = 5
export const cuffOverlap = 0.15
// Back
export const backDarts = { list: ['auto', 'never', 'always'], dflt: 'auto', menu: 'style' }
export const backDartShaping = { pct: 25, min: 5, max: 75, menu: 'advanced' }
export const boxPleat = { bool: false, menu: 'style' }
export const boxPleatFold = { pct: 15, min: 10, max: 20, menu: 'advanced' }
export const boxPleatWidth = { pct: 7, min: 4, max: 10, menu: 'advanced' }
export const roundBack = { pct: 0, min: 0, max: 10, menu: 'fit' }
// Front
export const buttonFreeLength = { pct: 2, min: 0, max: 15, menu: 'style.closure' }
export const buttonholePlacketStyle = {
  list: ['classic', 'seamless'],
  dflt: 'seamless',
  hide: ({ options }) => options.seperateButtonholePlacket,
  menu: 'style.closure',
}
export const buttonholePlacketWidth = { pct: 8, min: 4, max: 12, menu: 'style.closure' }
export const buttonholePlacketFoldWidth = { pct: 16, min: 8, max: 24, menu: 'style.closure' }
export const buttonPlacketStyle = {
  list: ['classic', 'seamless'],
  dflt: 'classic',
  hide: ({ options }) => options.seperateButtonPlacket,
  menu: 'style.closure',
}
export const buttonPlacketWidth = { pct: 5, min: 2, max: 8, menu: 'style.closure' }
export const extraTopButton = { bool: true, menu: 'style.closure' }
export const seperateButtonPlacket = { bool: false, menu: 'style.closure' }
export const seperateButtonholePlacket = { bool: false, menu: 'style.closure' }
// Collar
export const collarEase = { pct: 2, min: 0, max: 10, menu: 'style.collar' }
export const collarAngle = { deg: 85, min: 60, max: 130, menu: 'style.collar' }
export const collarBend = { pct: 3.5, min: 0, max: 10, menu: 'style.collar' }
export const collarFlare = { deg: 3.5, min: 0, max: 10, menu: 'style.collar' }
export const collarGap = { pct: 2.5, min: 0, max: 6, menu: 'style.collar' }
export const collarRoll = { pct: 3, min: 0, max: 6, menu: 'style.collar' }
// Collar stand
export const collarStandBend = { deg: 3, min: 0, max: 5, menu: 'style.collar' }
export const collarStandCurve = { deg: 2, min: 0, max: 5, menu: 'style.collar' }
export const collarStandWidth = { pct: 8, min: 3, max: 13, menu: 'style.collar' }
// Cuffs
export const barrelCuffNarrowButton = { bool: true, menu: 'style.cuffs' }
export const cuffButtonRows = { count: 1, min: 1, max: 2, menu: 'style.cuffs' }
export const cuffDrape = { pct: 5, min: 0, max: 10, menu: 'style.cuffs' }
export const cuffEase = { pct: 20, min: 10, max: 40, menu: 'fit' }
export const cuffLength = { pct: 10, min: 3, max: 15, menu: 'style.cuffs' }
export const cuffStyle = {
  list: [
    'roundedBarrelCuff',
    'angledBarrelCuff',
    'straightBarrelCuff',
    'roundedFrenchCuff',
    'angledFrenchCuff',
    'straightFrenchCuff',
  ],
  dflt: 'angledBarrelCuff',
  menu: 'style.cuffs',
}
// Hem & hips
export const hemCurve = { pct: 50, min: 25, max: 100, menu: 'style' }
export const hemStyle = {
  list: ['straight', 'baseball', 'slashed'],
  dflt: 'straight',
  menu: 'style',
}
export const hipsEase = { pct: 15, min: 10, max: 35, menu: 'fit' }
export const lengthBonus = { pct: 25, min: -4, max: 60 }
// Shoulders
export const shoulderEase = { pct: 2, min: 0, max: 15 }
export const splitYoke = { bool: false, menu: 'style' }
export const yokeHeight = { pct: 70, min: 40, max: 90, menu: 'style' }
// Sleeve
export const sleeveLengthBonus = { pct: 3.5, min: -40, max: 10, menu: 'fit' }
export const sleevePlacketLength = { pct: 25, min: 15, max: 35, menu: 'style.cuffs' }
export const sleevePlacketWidth = { pct: 13, min: 8, max: 18, menu: 'style.cuffs' }
// Waist
export const buttons = { count: 7, min: 4, max: 12, menu: 'style.closure' }
export const waistEase = { pct: 15, min: 10, max: 35, menu: 'fit' }
// Flat-felled seam allowance
export const ffsa = { pct: 150, min: 100, max: 200, menu: 'advanced' }
