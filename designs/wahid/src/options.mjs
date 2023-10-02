// Constant
export const acrossBackFactor = 0.97
export const frontOverlap = 0.01
export const frontArmholeDeeper = 0.005
// Fit
export const armholeDepthFactor = { pct: 70, min: 60, max: 80, menu: 'fit' }
export const backScyeDart = { deg: 2, min: 0, max: 6, menu: 'fit' }
export const centerBackDart = { pct: 2, min: 0, max: 5, menu: 'fit' }
export const chestEase = { pct: 2, min: 1, max: 10, menu: 'fit' }
export const frontScyeDart = { deg: 6, min: 0, max: 12, menu: 'fit' }
export const hipsEase = { pct: 8, min: 2, max: 15, menu: 'fit' }
export const lengthBonus = { pct: 1, min: 0, max: 8, menu: 'fit' }
export const waistEase = { pct: 8, min: 2, max: 15, menu: 'fit' }
// Style
export const buttons = { count: 6, min: 4, max: 12, menu: 'style' }
export const frontStyle = { dflt: 'classic', list: ['classic', 'rounded'], menu: 'style' }
export const hemRadius = { pct: 6, min: 2, max: 12, menu: 'style' }
export const hemStyle = { dflt: 'classic', list: ['classic', 'rounded', 'square'], menu: 'style' }
export const necklineDrop = { pct: 50, min: 35, max: 85, menu: 'style' }
export const pocketLocation = { pct: 35, min: 25, max: 55, menu: 'style' }
export const pocketWidth = { pct: 10, max: 15, min: 8, menu: 'style' }
export const weltHeight = { pct: 12.5, max: 20, min: 10, menu: 'style' }
// Advanced
export const backInset = { pct: 15, min: 10, max: 20, menu: 'advanced' }
export const frontInset = { pct: 15, min: 10, max: 20, menu: 'advanced' }
export const shoulderInset = { pct: 10, min: 0, max: 20, menu: 'advanced' }
export const neckInset = { pct: 5, min: 0, max: 10, menu: 'advanced' }
export const pocketAngle = { deg: 5, min: 0, max: 5, menu: 'advanced' }

// Hide inherited options
export const bicepsEase = { pct: 15, min: 0, max: 50, menu: false }
export const collarEase = { pct: 5, min: 0, max: 10, menu: false }
export const cuffEase = { pct: 20, min: 0, max: 200, menu: false }
export const shoulderEase = { pct: 0, min: -2, max: 6, menu: false }
export const s3Armhole = { pct: 0, min: -100, max: 100, menu: false }
export const s3Collar = { pct: 0, min: -100, max: 100, menu: false }
export const shoulderSlopeReduction = { pct: 0, min: 0, max: 80, menu: false }
export const backNeckCutout = { pct: 5, min: -2, max: 8, menu: false }
