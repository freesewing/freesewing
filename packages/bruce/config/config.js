export default {
  name: "bruce",
  measurements: [
    "hipsCircumference",
    "upperLegCircumference",
    "hipsToUpperLeg"
  ],
  options: {
    // Constants

    /* Ratio of different parts at the hips
     * Take care to keep this sum of this = 1 (side counts double) */
    hipRatioFront: 0.245,
    hipRatioSide: 0.22,
    hipRatioBack: 0.315,

    /** Ratio of different parts at the legs
     * Take care to keep this sum of this = 1 */
    legRatioInset: 0.3,
    legRatioSide: 0.38,
    legRatioBack: 0.32,

    /** Gusset widht in relation to waist = 6.66% */
    gussetRatio: 0.0666,

    /** Part of crotch seam length that is attached
     * to the inset (rest goes in the tusks) */
    gussetInsetRatio: 0.6,

    /** Height distribution between inset and front */
    heightRatioInset: 0.65,
    heightRatioFront: 0.35,

    // Degrees
    bulge: { deg: 20, min: 0, max: 40 },

    // Millimeters
    elasticWidth: { mm: 35, min: 10, max: 70 },

    // Percentages
    legBonus:   { pct:  0,   min:   0, max: 70},
    rise:       { pct: 35,   min: -30, max: 50},
    stretch:    { pct: 14,   min:   4, max: 24},
    legStretch: { pct: 40,   min:  25, max: 45},
    backRise:   { pct:  2.5, min:   0, max:  5},
  }
};
