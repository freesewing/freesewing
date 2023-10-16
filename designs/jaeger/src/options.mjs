// Jaeger options
export const frontOverlap = { pct: 1.5, min: 1, max: 2, menu: 'advanced' }
export const sleeveVentLength = { pct: 35, min: 25, max: 55, menu: 'sleeves' }
export const sleeveVentWidth = { pct: 18, min: 10, max: 26, menu: 'sleeves' }
export const innerPocketPlacement = { pct: 52, min: 42, max: 62, menu: 'pockets' }
export const innerPocketWidth = { pct: 50, min: 45, max: 65, menu: 'pockets' }
export const innerPocketDepth = { pct: 110, min: 75, max: 140, menu: 'pockets' }
export const innerPocketWeltHeight = { pct: 3.5, min: 2.5, max: 5, menu: 'pockets' }
export const pocketFoldover = { pct: 25, min: 15, max: 35, menu: 'pockets' }
export const waistEase = { pct: 14, min: 8, max: 25, menu: 'fit' }
export const hipsEase = { pct: 12, min: 8, max: 20, menu: 'fit' }
export const centerBackDart = { pct: 0.5, min: 0, max: 1.5, menu: 'fit' }
export const centerFrontHemDrop = { pct: 2, min: 0, max: 4, menu: 'style' }
export const backVent = { count: 1, min: 0, max: 2, menu: 'style' }
export const backVentLength = { pct: 35, min: 15, max: 100, menu: 'style' }
export const frontCutawayAngle = { deg: 2.5, min: 1, max: 4, menu: 'style' }
export const frontCutawayStart = { pct: 30, min: 10, max: 70, menu: 'style' }
export const frontCutawayEnd = { pct: 40, min: 10, max: 40, menu: 'style' }
export const hemRadius = { pct: 100, min: 35, max: 100, menu: 'style' }
export const chestPocketDepth = { pct: 110, min: 70, max: 150, menu: 'pockets' }
export const chestPocketWidth = { pct: 37, min: 30, max: 45, menu: 'pockets' }
export const chestPocketPlacement = { pct: 52, min: 40, max: 60, menu: 'pockets' }
export const chestPocketAngle = { deg: 2.5, min: 0, max: 7, menu: 'pockets' }
export const chestPocketWeltSize = { pct: 17.5, min: 10, max: 25, menu: 'pockets' }
export const frontPocketPlacement = { pct: 75, min: 65, max: 85, menu: 'pockets' }
export const frontPocketWidth = { pct: 68, min: 55, max: 75, menu: 'pockets' }
export const frontPocketDepth = { pct: 110, min: 80, max: 130, menu: 'pockets' }
export const frontPocketRadius = { pct: 10, min: 0, max: 50, menu: 'pockets' }
export const lapelStart = { pct: 10, min: 0, max: 35, menu: 'style' }
export const lapelReduction = { pct: 5, min: 0, max: 10, menu: 'style' }
export const collarSpread = { deg: 13, min: 5, max: 35, menu: 'collar' }
export const collarHeight = { pct: 9, min: 7, max: 10, menu: 'collar' }
export const collarNotchDepth = { pct: 15, min: 15, max: 50, menu: 'collar' }
export const collarNotchAngle = { deg: 45, min: 30, max: 60, menu: 'collar' }
export const collarNotchReturn = { pct: 100, min: 50, max: 100, menu: 'collar' }
export const collarRoll = { pct: 5, min: 0, max: 10, menu: 'collar' }
export const frontDartPlacement = { pct: 55, min: 45, max: 60, menu: 'advanced' }
export const sideFrontPlacement = { pct: 85, min: 80, max: 90, menu: 'advanced' }
export const chestShaping = { pct: 30, min: 0, max: 100, menu: 'advanced' }
export const rollLineCollarHeight = { pct: 6, min: 5, max: 9, menu: 'collar' }
export const buttonLength = { pct: 30, min: 30, max: 60, menu: 'style' }
export const buttons = { list: ['1', '2', '3'], dflt: '2', menu: 'style' }
export const lengthBonus = { pct: 19, min: 10, max: 25, menu: 'fit' }

// Constants
export const chestShapingMax = 5
// Disable S3 options from Brian
export const s3Collar = 0
export const s3Armhole = 0
/*
 * How the reduction of waist and hips is divided
 * Waist:
 *  - front dart: 10%
 *  - Side/front: 16%
 *  - Side/back: 16%
 *  - Back: 8%
 *  Total for half garment = 50%
 * Hips:
 *  - Side/front: 20%
 *  - Side/back: 20%
 *  - Back: 10%
 */
export const reduceWaistStandardFraction = 0.08
export const reduceWaistDartFraction = 0.05
export const reduceHipsStandardFraction = 0.1
