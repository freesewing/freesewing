import configHelpers from '@freesewing/config-helpers'
const { pctBasedOn } = configHelpers

export const brianFitCollar = false
export const brianFitSleeve = false
export const acrossBackFactor = 0.97
export const backNeckCutout = 0.05
export const bicepsEase = 0.05
export const shoulderEase = 0
export const collarEase = 0
export const frontArmholeDeeper = 0
export const armholeDepthFactor = 0.6
export const shoulderSlopeReduction = 0

// Percentages
export const armholeDrop = { pct: 10, min: 0, max: 75 }
export const backlineBend = { pct: 50, min: 25, max: 100 }
export const chestEase = { pct: 8, min: 0, max: 20, ...pctBasedOn('chest') }
export const hipsEase = { pct: 8, min: 0, max: 20 }
export const lengthBonus = { pct: 10, min: -20, max: 60 }
export const necklineBend = { pct: 100, min: 40, max: 100 }
export const necklineDrop = { pct: 20, min: 10, max: 35 }
export const stretchFactor = { pct: 5, min: 0, max: 15 }
export const shoulderStrapWidth = { pct: 15, min: 10, max: 40 }
export const shoulderStrapPlacement = { pct: 40, min: 20, max: 80 }

// draft for high bust
export const draftForHighBust = { bool: false }
