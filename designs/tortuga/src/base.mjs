import { pluginBundle } from '@freesewing/plugin-bundle'
import { units } from '@freesewing/core'

export const UNIVERSAL_DEBUG = true

// Log part measurements.
export function logMeasurement(part, measurement, mm) {
  const { log } = part.shorthand()
  const cmin = units(mm)
  let shortname = part.name.substring(part.name.indexOf('.') + 1)
  shortname = shortname.charAt(0).toUpperCase() + shortname.substring(1) 
  log.info(shortname + ' ' + measurement + ': ' + cmin)
}

// For debugging purposes, show and label all points.
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
  units,
  sa,
  measurements,
  options,
  part,
}) {

  const DEBUG = true
  if (DEBUG) {
    log.debug('Seam allowance: ' + units(sa))
    for (let m in measurements) {
      log.debug('measurements.' + m + ': ' + units(measurements[m]))
    }
    for (let o in options) {
      log.debug('options.' + o + ': ' + options[o])
    }
  }

  //------------------------------------------------
  // neckToShoulder calculated/estimated measurement
  // Estimate model's actual shoulder length, based on the
  // shoulder-to-shoulder and neck circumference measurements.
  const neckDiameter = measurements.neck / Math.PI
  measurements.neckToShoulder = (measurements.shoulderToShoulder -
    neckDiameter) / 2
  log.info('Calculated measurement.neckToShoulder: ' +
    units(measurements.neckToShoulder))

  //------------------------------------------------
  // elbowToWrist calculated measurement
  measurements.elbowToWrist = measurements.shoulderToWrist -
    measurements.shoulderToElbow
  log.info('Calculated measurement.elbowToWrist: ' +
    units(measurements.elbowToWrist))
  
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
    garmentExtraBackLength: { pct: 0, min: 0, max: 10, menu: 'body' },
    // Add reinforcement strap to the shoulder seams?
    shoulderStrapUse: { bool: true, menu: 'body' },
    // Width of shoulder strap, as percentage of length
    shoulderStrapWidth: { pct:20, min:15, max:30, menu: 'body' },
    // Length of vertical chest slit, as percentage of HPS-to-bust.
    chestSlitLength: { pct: 100, min: 50, max: 125, menu: 'body' },
    // Add a reinforcement patch to the bottom of the chest slit?
    // If so, what style?
    chestPatch: {
      dflt: 'heart',
      list: ['none', 'square', 'heart'],
      menu: 'body',
    },
    // Length of side vents, as percentage of absolute garment length.
    sideVentLength: { pct: 15, min: 1, max: 30, menu: 'body' },
    // Add gussets to the top of the side vents?
    sideGussetUse: { bool: true, menu: 'body' },
    // Length of side gusset square side, as percentage of
    // side vent length.
    sideGussetSize: { pct: 30, min: 20, max: 40, menu: 'body' },
    // Add a reinforcement patch to the top of the side vents?
    sidePatch: { bool: true, menu: 'body' },
    // Add back gathers to the collar back?
    collarBackGathers: { bool: false, menu: 'body' },
    // Length of shoulder, as percent added to neck to shoulder
    // calculated length. automatically limited by neck circumference.
    shoulderLength: { pct: 15, min: -30, max: 30, menu: 'body' },
    // Length of neck gusset square side, as percentage of
    // neck circumference.
    neckGussetLength: { pct: 17, min: 5, max: 30, menu: 'neck' },
    // Width of collar, as percentage of neck circumference.
    collarWidth: { pct: 25, min: 5, max: 50, menu: 'neck' },
    // Length of collar, as percent added to neck circumference.
    collarLength: { pct: 6, min: 5, max: 20, menu: 'neck' },
    // Style of collar closure.
    collarClosure: {
      dflt: 'TwoSetsOfButtonholes',
      list: [
        'TwoSetsOfButtonholes', 'TwoSetsOfButtonsAndButtonholes',
        'OneSetOfButtonholes', 'OneSetOfButtonAndButtonhole',
        'none' ],
      menu: 'neck',
    },
    // Length of sleeve, as percent added to shoulder-to-wrist.
    sleeveLength: { pct: 0, min: 0, max: 15, menu: 'sleeve' },
    // Width of sleeve, as percent added to biceps.
    sleeveWidth: { pct: 30, min: 10, max: 100, menu: 'sleeve' },
    // Length of armscye, as percent of biceps circumference.
    armscyeLength: { pct: 100, min: 80, max: 120, menu: 'sleeve' },
    // Length of sleeve gusset square side, as percentage of
    // shoulder to elbow length.
    sleeveGussetLength: { pct: 45, min: 20, max: 75, menu: 'sleeve' },
    // Length of sleeve vents, as percentage of elbow-to-wrist length.
    sleeveVentLength: { pct: 20, min: 0, max: 50, menu: 'sleeve' },
    // Width of cuff, as percentage of elbow-to-wrist length.
    cuffWidth: { pct: 15, min: 2, max: 35, menu: 'sleeve' },
    // Length of cuff, as percent added to wrist circumference.
    cuffLength: { pct: 10, min: 2, max: 20, menu: 'sleeve' },
    // Style of cuff closure.
    cuffClosure: {
      dflt: 'TwoButtonholes',
      list: ['TwoButtonholes', 'ButtonAndButtonhole', 'none'], 
      menu: 'sleeve',
    },
  },
  plugins: [pluginBundle],
  draft: draftTortugaBase,
}
