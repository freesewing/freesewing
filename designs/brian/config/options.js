// Constants
export const brianFitSleeve = true
export const brianFitCollar = true
export const collarFactor = 4.8

// Percentages
export const acrossBackFactor = { pct: 98, min: 93, max: 100 }
export const armholeDepthFactor = { pct: 55, min: 50, max: 70 }
export const backNeckCutout = { pct: 5, min: 2, max: 8 }
export const bicepsEase = { pct: 15, min: 0, max: 50 }
export const chestEase = { pct: 15, min: -4, max: 35 }
export const collarEase = { pct: 5, min: 0, max: 10 }
export const cuffEase = { pct: 20, min: 0, max: 200 }
export const frontArmholeDeeper = { pct: 0.2, min: 0, max: 0.5 }
export const lengthBonus = { pct: 0, min: -4, max: 60 }
export const shoulderEase = { pct: 0, min: -2, max: 6 }
export const shoulderSlopeReduction = { pct: 0, min: 0, max: 80 }

// s3 is short for Shoulder Seam Shift
export const s3Collar = { pct: 0, min: -100, max: 100 }
export const s3Armhole = { pct: 0, min: -100, max: 100 }

// Sleevecap
export const sleevecapEase = { pct: 0, min: 0, max: 10 }
export const sleevecapTopFactorX = { pct: 50, min: 25, max: 75 }
export const sleevecapTopFactorY = { pct: 45, min: 35, max: 125 }
export const sleevecapBackFactorX = { pct: 60, min: 35, max: 65 }
export const sleevecapBackFactorY = { pct: 33, min: 30, max: 65 }
export const sleevecapFrontFactorX = { pct: 55, min: 35, max: 65 }
export const sleevecapFrontFactorY = { pct: 33, min: 30, max: 65 }
export const sleevecapQ1Offset = { pct: 1.7, min: 0, max: 7 }
export const sleevecapQ2Offset = { pct: 3.5, min: 0, max: 7 }
export const sleevecapQ3Offset = { pct: 2.5, min: 0, max: 7 }
export const sleevecapQ4Offset = { pct: 1, min: 0, max: 7 }
export const sleevecapQ1Spread1 = { pct: 10, min: 4, max: 20 }
export const sleevecapQ1Spread2 = { pct: 15, min: 4, max: 20 }
export const sleevecapQ2Spread1 = { pct: 15, min: 4, max: 20 }
export const sleevecapQ2Spread2 = { pct: 10, min: 4, max: 20 }
export const sleevecapQ3Spread1 = { pct: 10, min: 4, max: 20 }
export const sleevecapQ3Spread2 = { pct: 8, min: 4, max: 20 }
export const sleevecapQ4Spread1 = { pct: 7, min: 4, max: 20 }
export const sleevecapQ4Spread2 = { pct: 6.3, min: 4, max: 20 }
// Sleeve
export const sleeveWidthGuarantee = { pct: 90, min: 25, max: 100 }
export const sleeveLengthBonus = { pct: 0, min: -40, max: 10 }

// Draft for high bust
export const draftForHighBust = { bool: false }

// Helper objects for per-part options
export const _base = {
  brianFitSleeve,
  brianFitCollar,
  collarFactor,
  acrossBackFactor,
  armholeDepthFactor,
  backNeckCutout,
  bicepsEase,
  chestEase,
  collarEase,
  cuffEase,
  frontArmholeDeeper,
  lengthBonus,
  shoulderEase,
  shoulderSlopeReduction,
  s3Collar,
  s3Armhole,
  draftForHighBust,
}
export const _sleevecap = {
  sleevecapEase,
  sleevecapTopFactorX,
  sleevecapTopFactorY,
  sleevecapBackFactorX,
  sleevecapBackFactorY,
  sleevecapFrontFactorX,
  sleevecapFrontFactorY,
  sleevecapQ1Offset,
  sleevecapQ2Offset,
  sleevecapQ3Offset,
  sleevecapQ4Offset,
  sleevecapQ1Spread1,
  sleevecapQ1Spread2,
  sleevecapQ2Spread1,
  sleevecapQ2Spread2,
  sleevecapQ3Spread1,
  sleevecapQ3Spread2,
  sleevecapQ4Spread1,
  sleevecapQ4Spread2,
  sleeveWidthGuarantee,
}
export const _sleeve = { sleeveLengthBonus }


