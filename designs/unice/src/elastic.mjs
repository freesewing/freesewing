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
  Path,
  paths,
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

  // Draw a box around the text, so the part shows up correctly.
  paths.box = new Path()
    .move(new Point(-10,-10))
    .line(new Point(-10,15))
    .line(new Point(200,15))
    .line(new Point(200,-10))
    .close()

  return part
  },
}
