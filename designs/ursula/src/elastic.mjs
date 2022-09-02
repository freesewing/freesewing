export default function (part) {
  let { options, Point, points, store, utils, units, sa, paperless, macro } = part.shorthand()

  // Stretch utility method
  store.set('elasticScale', utils.stretchToScale(options.elasticStretch))

  // Design pattern here
  let legOpeningLength =
    store.get('frontLegOpeningLength') +
    store.get('backLegOpeningLength') +
    store.get('gussetSideLength')
  let waistBandLength = store.get('frontWaistBandLength') + store.get('backWaistBandLength')

  points.elasticInfo = new Point(0, 0)
    .attr('data-text', 'cutTwoPiecesOfElasticToFinishTheLegOpenings')
    .attr('data-text', ':')
    .attr('data-text', units(legOpeningLength * store.get('elasticScale') + 2 * sa))
    .attr('data-text', '\n')
    .attr('data-text', 'cutOnePieceOfElasticToFinishTheWaistBand')
    .attr('data-text', ':')
    .attr('data-text', units(waistBandLength * store.get('elasticScale') + 2 * sa))

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.elasticInfo,
      to: points.elasticInfo,
      y: points.elasticInfo.y + sa + 15,
    })
  }

  // determine where the markers should be drawn

  // waist band: start at center front
  if (store.get('frontWaistBandLength') >= waistBandLength / 2) {
    store.set('numWaistMarkersFront', 3)
    store.set('waistMarkerFrac', (0.25 * waistBandLength) / store.get('frontWaistBandLength'))
  } else {
    store.set('numWaistMarkersFront', 1)
    store.set('waistMarkerFrac', (0.25 * waistBandLength) / store.get('backWaistBandLength'))
  }

  // leg opening: start at side seam (marker 0, does not count towards total)
  // leg marker 1: at 25%, on either front or gusset
  // leg marker 2: at 50%, on front, gusset or back
  // leg marker 3: at 75%, on gusset or back
  // for any part, 'legMarker#Frac' gives the relative position along the path *on that part*, measured from front/back to gusset and from front of gusset to back of gusset

  // markers on front part
  if (store.get('frontLegOpeningLength') / legOpeningLength < 0.25) {
    store.set('numLegMarkersFront', 0) // side seam only (count markers per leg opening)
  } else if (store.get('frontLegOpeningLength') / legOpeningLength < 0.5) {
    store.set('numLegMarkersFront', 1)
    store.set('legMarker1Frac', (0.25 * legOpeningLength) / store.get('frontLegOpeningLength'))
  } else {
    // seems unlikely: front leg opening is at least 50% of total
    store.set('numLegMarkersFront', 2)
    store.set('legMarker1Frac', (0.25 * legOpeningLength) / store.get('frontLegOpeningLength'))
    store.set('legMarker2Frac', (0.5 * legOpeningLength) / store.get('frontLegOpeningLength'))
  }

  // markers on gusset
  if (
    store.get('frontLegOpeningLength') / legOpeningLength < 0.25 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength >
      0.25 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength < 0.5
  ) {
    store.set('numLegMarkersGusset', 1)
    store.set(
      'legMarker1Frac',
      (0.25 * legOpeningLength - store.get('frontLegOpeningLength')) / store.get('gussetSideLength')
    )
  } else if (
    store.get('frontLegOpeningLength') / legOpeningLength < 0.25 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength >=
      0.25 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength < 0.75
  ) {
    store.set('numLegMarkersGusset', 2)
    store.set(
      'legMarker1Frac',
      (0.25 * legOpeningLength - store.get('frontLegOpeningLength')) / store.get('gussetSideLength')
    )
    store.set(
      'legMarker2Frac',
      (0.5 * legOpeningLength - store.get('frontLegOpeningLength')) / store.get('gussetSideLength')
    )
  } else if (
    store.get('frontLegOpeningLength') / legOpeningLength < 0.25 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength >=
      0.25 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength >= 0.75
  ) {
    store.set('numLegMarkersGusset', 3)
    store.set(
      'legMarker1Frac',
      (0.25 * legOpeningLength - store.get('frontLegOpeningLength')) / store.get('gussetSideLength')
    )
    store.set(
      'legMarker2Frac',
      (0.5 * legOpeningLength - store.get('frontLegOpeningLength')) / store.get('gussetSideLength')
    )
    store.set(
      'legMarker3Frac',
      (0.75 * legOpeningLength - store.get('frontLegOpeningLength')) / store.get('gussetSideLength')
    )
  } else if (
    store.get('frontLegOpeningLength') / legOpeningLength < 0.5 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength >=
      0.5 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength < 0.75
  ) {
    store.set('numLegMarkersGusset', 1)
    store.set(
      'legMarker2Frac',
      (0.5 * legOpeningLength - store.get('frontLegOpeningLength')) / store.get('gussetSideLength')
    )
  } else if (
    store.get('frontLegOpeningLength') / legOpeningLength < 0.5 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength >=
      0.5 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength >= 0.75
  ) {
    store.set('numLegMarkersGusset', 2)
    store.set(
      'legMarker2Frac',
      (0.5 * legOpeningLength - store.get('frontLegOpeningLength')) / store.get('gussetSideLength')
    )
  } else if (
    store.get('frontLegOpeningLength') / legOpeningLength < 0.75 &&
    (store.get('frontLegOpeningLength') + store.get('gussetSideLength')) / legOpeningLength >= 0.75
  ) {
    store.set('numLegMarkersGusset', 1)
    store.set(
      'legMarker3Frac',
      (0.75 * legOpeningLength - store.get('frontLegOpeningLength')) / store.get('gussetSideLength')
    )
  } else {
    store.set('numLegMarkersGusset', 0)
  }

  // markers on back part
  if (store.get('backLegOpeningLength') / legOpeningLength > 0.25) {
    store.set('legMarker3Frac', (0.25 * legOpeningLength) / store.get('backLegOpeningLength'))
  } else if (store.get('backLegOpeningLength') / legOpeningLength > 0.5) {
    store.set('legMarker2Frac', (0.5 * legOpeningLength) / store.get('backLegOpeningLength'))
    store.set('legMarker3Frac', (0.25 * legOpeningLength) / store.get('backLegOpeningLength'))
  }

  return part
}
