import { pluginBundle } from '@freesewing/plugin-bundle'
import { units } from '@freesewing/core'

export function logMeasurement(part, measurement, mm) {
  const { log } = part.shorthand()
  const cm = units(mm)
  let shortname = part.name.substring(part.name.indexOf('.') + 1)
  shortname = shortname.charAt(0).toUpperCase() + shortname.substring(1) 
  log.info(shortname + ' ' + measurement + ': ' + cm)
}

export function showPoints(points, scale, textsize) {
  for (const p in points) {
    if (p.indexOf('_') > -1) continue
    if (p.indexOf('title') > -1) continue
    if (p.indexOf('logo') > -1) continue
    if (p.indexOf('grainline') > -1) continue
    points[p]
      .attr('data-circle', 2)
      .attr('data-circle-class', 'fill-note')
      .attr('data-scale', scale)
    points[p + 'label'] = points[p]
      .shiftTowards(points.center, 15)
      .attr('data-text', '(' + p + ')')
      .attr('data-text-class', `text-lg center fill-note ${textsize}`)
      .attr('data-scale', scale)
  }
}
 
function draftTortugaBase({
  log,
  part,
}) {
  log.info('Note: All measurements include seam allowance.')
  return part
}

export const base = {
  name: 'tortuga.base',
  measurements: [
    'neck',
    'chest',
    'waist',
    'hips',
    'seat',
    'shoulderToShoulder',
    'hpsToBust',
    'hpsToWaistFront',
    'waistToHips',
    'waistToKnee',
    'shoulderToElbow',
    'shoulderToWrist',
    'biceps',
    'wrist',
  ],
  options: {
    // Single front and back piece? or
    singleFrontBack: { bool: false, menu: 'body' },
    // Length of garment: percent from hips (0) to knee (100)
    garmentLength: { pct: 75, min: 0, max: 100, menu: 'body' },
    // Width of garment, percent added to shoulder-to-shoulder,
    // automatically increased if needed to accommodate largest
    // circumference chest/waist/hips/seat.
    garmentWidth: { pct: 50, min: 25, max: 100, menu: 'body' },
    // Amount of extra back length, as percentage of the normal length.
    garmentExtraBackLength: { pct: 0, min: 0, max: 5, menu: 'body' },
    // Add reinforcement patches to the shoulder seams?
    //shoulderPatch: { bool: false, menu: 'body' },
    shoulderPatch: { bool: true, menu: 'body' }, // DEBUG: TO BE REMOVED
    // Length of vertical chest slit, as percentage of HPS-to-bust.
    chestSlitLength: { pct: 100, min: 50, max: 125, menu: 'body' },
    // Add a reinforcement patch to the bottom of the chest slit?
    // If so, what style?
    chestSlitPatch: {
      dflt: 'none',
      list: ['none', 'house', 'jewel', 'triangle', 'heart'],
      menu: 'body',
    },
    // Length of side vents, as percentage of absolute garment length.
    sideVentLength: { pct: 5, min: 1, max: 10, menu: 'body' },
    // Add gussets to the top of the side vents?
    sideGussetUse: { bool: false, menu: 'body' },
    // Length of side gusset square side, as percentage of
    // side vent length.
    sideGussetSize: { pct: 5, min: 1, max: 30, menu: 'body' },
    // Add a reinforcement patch to the top of the side vents?
    // If so, what style?
    sideVentPatch: {
      dflt: 'none',
      list: ['none', 'triangle', 'house', 'jewel'],
      menu: 'body',
    },
    // Add back gathers to the collar back?
    collarBackGathers: { bool: false, menu: 'body' },
    // Length of horizontal neck slit, as percent added to neck width,
    // automatically limited by shoulder length.
    neckSlitLength: { pct: 100, min: 100, max: 200, menu: 'neck' },
    // Length of neck gusset square side, as percentage of
    // neck circumference.
    neckGussetLength: { pct: 17, min: 5, max: 30, menu: 'neck' },
    // Width of collar, as percentage of neck circumference.
    collarWidth: { pct: 25, min: 5, max: 50, menu: 'neck' },
    // Length of sleeve, as percent added to shoulder-to-wrist.
    sleeveLength: { pct: 10, min: 0, max: 50, menu: 'sleeve' },
    // Width of sleeve, as percent added to biceps.
    sleeveWidth: { pct: 30, min: 10, max: 100, menu: 'sleeve' },
    // Length of armscye, as percent of biceps circumference.
    armscyeLength: { pct: 100, min: 80, max: 120, menu: 'sleeve' },
    // Length of sleeve gusset square side, as percentage of
    // shoulder to elbow length.
    sleeveGussetLength: { pct: 50, min: 20, max: 80, menu: 'sleeve' },
    // Length of sleeve vents, as percentage of elbow-to-wrist length.
    sleeveVentLength: { pct: 3, min: 1, max: 20, menu: 'sleeve' },
    // Width of cuff, as percentage of elbow-to-wrist length.
    cuffWidth: { pct: 5, min: 1, max: 5, menu: 'sleeve' },
  },
  plugins: [pluginBundle],
  draft: draftTortugaBase,
}
