import { pctBasedOn } from '@freesewing/core'
import {back as ursulaBack } from '@freesewing/ursula'

export const back = {
  name: 'unice.back',
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg','hips','waistToHips'],
  optionalMeasurements: ['crossSeam','crossSeamFront'],
  options: {
    gussetShift: 0.015, // fraction of seat circumference - could be an advanced option?
    gussetWidth: { pct: 7.2, min: 2, max: 12, menu: 'fit' }, // Gusset width in relation to waist-to-upperleg
    gussetLength: { pct: 12.7, min: 10, max: 16, menu: 'fit' }, // Gusset length in relation to seat
	fabricStretch: { pct: 15, min: 0, max: 100, menu: 'fit' }, // used in Ursula
    fabricStretchX: { pct: 15, min: 0, max: 100, menu: 'fit' }, // horizontal stretch (range set wide for beta testing)
    fabricStretchY: {pct: 0, min: 0, max: 100, menu: 'fit' }, // vertical stretch (range set wide for beta testing)
    rise: { pct: 60, min: 30, max: 100, menu: 'style' }, // extending rise beyond 100% would require adapting paths.sideLeft!
    legOpening: { pct: 45, min: 5, max: 85, menu: 'style' },
    frontDip: { pct: 5.0, min: -5, max: 15, menu: 'style' },
    taperToGusset: { pct: 70, min: 5, max: 100, menu: 'style' },
    // booleans
    useCrossSeam: { bool: true, menu: 'fit' },
    adjustStretch: {bool: true, menu: 'fit' }, // to not stretch fabric to the limits    
  },
  draft: ({
    utils,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro,
    part,
  }) => {
    return part
  },
}
