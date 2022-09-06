import { pluginBundle } from '@freesewing/plugin-bundle'
import { draftTieShape, tieShapeDimensions, calculateHelpers, options } from './shared.mjs'

function trayvonInterfacingTail(part) {
  const { paths, points, macro, complete, paperless, Path, store, absoluteOptions } =
    part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, store.get('backTip'), absoluteOptions.knotWidth)
  paths.seam.attributes.add('class', 'interfacing')

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'interfacingTail',
      rotation: -90,
    })
  }

  // Paperless?
  if (paperless) {
    tieShapeDimensions(part)
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .attr('class', 'hidden')
      .attr('data-text', '45°')
      .attr('data-text-class', 'center')
  }

  return part
}

function trayvonInterfacingTip(part) {
  let { paths, points, macro, complete, paperless, Path, absoluteOptions } = part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, absoluteOptions.tipWidth, absoluteOptions.knotWidth)
  paths.seam.attributes.add('class', 'interfacing')

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'interfacingTip',
      rotation: -90,
    })
  }

  // Paperless?
  if (paperless) {
    tieShapeDimensions(part)
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .attr('class', 'hidden')
      .attr('data-text', '45°')
      .attr('data-text-class', 'center')
  }

  return part
}

export const interfacingTail = {
  name: 'trayvon.interfacingTail',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  plugins: [ pluginBundle ],
  draft: trayvonInterfacingTail,
}
export const interfacingTip = {
  name: 'trayvon.interfacingTip',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  plugins: [ pluginBundle ],
  draft: trayvonInterfacingTip,
}
