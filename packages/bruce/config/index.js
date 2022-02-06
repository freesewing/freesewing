import pkg from '../package.json'

export default {
  name: 'bruce',
  version: pkg.version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'underwear',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: ['bulge', 'stretch', 'legStretch', 'backRise'],
    style: ['rise', 'legBonus'],
  },
  measurements: ['hips', 'upperLeg', 'waistToHips', 'waistToUpperLeg'],
  dependencies: {
    side: ['back', 'front'],
    front: 'inset',
    inset: 'back',
  },
  options: {
    // Constants

    /* Ratio of different parts at the hips */
    hipRatioFront: 0.245,
    hipRatioBack: 0.315,

    /** Ratio of different parts at the legs */
    legRatioInset: 0.3,
    legRatioBack: 0.32,

    /** Gusset widht in relation to waist = 6.66% */
    gussetRatio: 0.0666,

    /** Part of crotch seam length that is attached
     * to the inset (rest goes in the tusks) */
    gussetInsetRatio: 0.6,

    /** Height distribution between inset and front */
    heightRatioInset: 0.65,

    // Degrees
    bulge: { deg: 20, min: 0, max: 40 },

    // Percentages
    legBonus: { pct: 0, min: -10, max: 20 },
    rise: { pct: 10, min: 0, max: 25 },
    stretch: { pct: 15, min: 5, max: 25 },
    legStretch: { pct: 40, min: 25, max: 45 },
    backRise: { pct: 5, min: 0, max: 10 },
  },
}
