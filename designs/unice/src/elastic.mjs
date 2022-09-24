import { gusset } from './gusset.mjs'

export const elastic = {
  name: 'unice.elastic',
  options: {
    elasticStretch: { pct: 8, min: 5, max: 15, menu: 'fit' },
  },
  after: gusset,
  draft: ({
  options,
  Point,
  points,
  store,
  utils,
  units,
  sa,
  paperless,
  macro,
  part,
  }) => {
  // Stretch utility method
  store.set('elasticScale', utils.stretchToScale(options.elasticStretch))

  // Design pattern here
  const legOpeningLength =
    store.get('frontLegOpeningLength') +
    store.get('backLegOpeningLength') +
    store.get('gussetSideLength')
  const waistBandLength = store.get('frontWaistBandLength') + store.get('backWaistBandLength')

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

  return part
  },
}
