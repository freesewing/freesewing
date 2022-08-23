export default function (part) {
  let { options, Point, points, store, utils, units, sa, paperless, macro } = part.shorthand()

  // Stretch utility method
  store.set('elasticScale', utils.stretchToScale(options.elasticStretch))

  // Design pattern here

  // Grab our variables from the store.
  const elasticScale = store.get('elasticScale')
  const frontLegOpeningLength = store.get('frontLegOpeningLength')
  const backLegOpeningLength = store.get('backLegOpeningLength')
  const gussetSideLength = store.get('gussetSideLength')
  const frontWaistBandLength = store.get('frontWaistBandLength')
  const backWaistBandLength = store.get('backWaistBandLength')

  // Define some measurements.
  const legOpeningLength =
    frontLegOpeningLength + gussetSideLength + backLegOpeningLength
  const waistBandLength = frontWaistBandLength + backWaistBandLength
  const frontPercentage = frontLegOpeningLength / legOpeningLength
  const frontAndGussetPercentage =
    (frontLegOpeningLength + gussetSideLength) / legOpeningLength
  const backPercentage = backLegOpeningLength / legOpeningLength

  points.elasticInfo = new Point(0, 0)
    .attr('data-text', 'cutTwoPiecesOfElasticToFinishTheLegOpenings')
    .attr('data-text', ':')
    .attr('data-text', units(legOpeningLength * elasticScale) + 2 * sa)
    .attr('data-text', '\n')
    .attr('data-text', 'cutOnePieceOfElasticToFinishTheWaistBand')
    .attr('data-text', ':')
    .attr('data-text', units(waistBandLength * elasticScale) + 2 * sa)

  // Paperless?
  if (paperless) {
    macro('hd', {
      // What is this distance line? It doesn't seem to serve
      // any purpose? --BenF
      from: points.elasticInfo,
      to: points.elasticInfo,
      y: points.elasticInfo.y + sa + 15,
    })
  }

  // determine where the markers should be drawn

  // waist band: start at center front
  if (frontWaistBandLength >= waistBandLength / 2) {
    store.set('numWaistMarkersFront', 3)
    store.set('waistMarkerFrac',
      (0.25 * waistBandLength) / frontWaistBandLength)
  } else {
    store.set('numWaistMarkersFront', 1)
    store.set('waistMarkerFrac',
      (0.25 * waistBandLength) / backWaistBandLength)
  }

  // leg opening: start at side seam (marker 0, does not count towards total)
  // leg marker 1: at 25%, on either front or gusset
  // leg marker 2: at 50%, on front, gusset or back
  // leg marker 3: at 75%, on gusset or back
  // for any part, 'legMarker#Frac' gives the relative position along the
  //   path *on that part*, measured from front/back to gusset and from
  //   front of gusset to back of gusset

  // markers on front part
  if (frontPercentage < 0.25) {
    // side seam only (count markers per leg opening)
    store.set('numLegMarkersFront', 0)
  } else if (frontPercentage < 0.5) {
    store.set('numLegMarkersFront', 1)
    store.set('legMarker1Frac',
      (0.25 * legOpeningLength) / frontLegOpeningLength)
  } else {
    // seems unlikely: front leg opening is at least 50% of total
    store.set('numLegMarkersFront', 2)
    store.set('legMarker1Frac',
      (0.25 * legOpeningLength) / frontLegOpeningLength)
    store.set('legMarker2Frac',
      (0.5 * legOpeningLength) / frontLegOpeningLength)
  }

  // markers on gusset
  // (The control logic and flow has been left intact in this section.
  //  However, it could be much improved by nested if-else or switch
  //  statements to reduce the amount of repeated code. --BenF)
  // (I am not sure if all of these cases are doing what they should
  //  be doing. --BenF)
  if (frontPercentage < 0.25 &&
    frontAndGussetPercentage > 0.25 &&
    frontAndGussetPercentage < 0.5) {
    store.set('numLegMarkersGusset', 1)
    store.set('legMarker1Frac',
      (0.25 * legOpeningLength - frontLegOpeningLength) / gussetSideLength)
  } else if (frontPercentage < 0.25 &&
    frontAndGussetPercentage >= 0.25 &&
    frontAndGussetPercentage  < 0.75) {
    store.set('numLegMarkersGusset', 2)
    store.set('legMarker1Frac',
      (0.25 * legOpeningLength - frontLegOpeningLength) / gussetSideLength)
    store.set('legMarker2Frac',
      (0.5 * legOpeningLength - frontLegOpeningLength) / gussetSideLength)
  } else if (frontPercentage < 0.25 &&
    frontAndGussetPercentage >= 0.25 && // superfluous --BenF
    frontAndGussetPercentage >= 0.75) {
    store.set('numLegMarkersGusset', 3)
    store.set('legMarker1Frac',
      (0.25 * legOpeningLength - frontLegOpeningLength) / gussetSideLength)
    store.set('legMarker2Frac',
      (0.5 * legOpeningLength - frontLegOpeningLength) / gussetSideLength)
    store.set('legMarker3Frac',
      (0.75 * legOpeningLength - frontLegOpeningLength) / gussetSideLength)
  } else if (frontPercentage < 0.5 &&
    frontAndGussetPercentage >= 0.5 &&
    frontAndGussetPercentage < 0.75) {
    store.set('numLegMarkersGusset', 1)
    store.set('legMarker2Frac',
      (0.5 * legOpeningLength - frontLegOpeningLength) / gussetSideLength)
  } else if (frontPercentage < 0.5 &&
    frontAndGussetPercentage >= 0.5 && // superfluous --BenF
    frontAndGussetPercentage >= 0.75) {
    store.set('numLegMarkersGusset', 2)
    store.set('legMarker2Frac',
      (0.5 * legOpeningLength - frontLegOpeningLength) / gussetSideLength)
  } else if (frontPercentage < 0.75 &&
    frontAndGussetPercentage >= 0.75) {
    store.set('numLegMarkersGusset', 1)
    store.set(
      'legMarker3Frac',
      (0.75 * legOpeningLength - frontLegOpeningLength) / gussetSideLength)
  } else {
    store.set('numLegMarkersGusset', 0)
  }

  // markers on back part
  if (backPercentage > 0.25) {
    store.set('legMarker3Frac',
      (0.25 * legOpeningLength) / backLegOpeningLength)
  } else if (backPercentage > 0.5) { // This case will never run. --BenF
    store.set('legMarker2Frac',
      (0.5 * legOpeningLength) / backLegOpeningLength)
    store.set('legMarker3Frac',
      (0.25 * legOpeningLength) / backLegOpeningLength)
  }

  return part
}
