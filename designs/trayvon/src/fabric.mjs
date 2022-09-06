import { pluginBundle } from '@freesewing/plugin-bundle'
import {
  calculateHelpers,
  draftTieShape,
  seamAllowance,
  tieShapeDimensions,
  options,
} from './shared.mjs'

function trayvonFabricTail(part) {
  const { Path, complete, macro, paths, points, paperless, sa, store, absoluteOptions } =
    part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, store.get('backTip') * 2.5, absoluteOptions.knotWidth * 2.5, true)
  paths.seam.attributes.add('class', 'fabric')

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'fabricTail',
      rotation: -90,
    })

    if (sa) seamAllowance(part, 'fabric')
  }

  // Paperless?
  if (paperless) {
    tieShapeDimensions(part)
    macro('ld', {
      from: points.tip,
      to: points.notch1,
      d: absoluteOptions.tipWidth / -2.5,
    })
    macro('ld', {
      from: points.notch2,
      to: points.tip,
      d: absoluteOptions.tipWidth / -2.5,
    })
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .attr('class', 'hidden')
      .attr('data-text', '45°')
      .attr('data-text-class', 'center')
  }

  return part
}

function trayvonFabricTip(part) {
  const {
    Path,
    Snippet,
    complete,
    macro,
    paths,
    paperless,
    points,
    sa,
    snippets,
    absoluteOptions,
  } = part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, absoluteOptions.tipWidth * 2.5, absoluteOptions.knotWidth * 2.5, true)
  paths.seam.attributes.add('class', 'fabric')

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'fabricTip',
      rotation: -90,
    })

    points.logo = points.tip.shiftFractionTowards(points.mid, 0.4)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) seamAllowance(part, 'fabric')
  }

  // Paperless?
  if (paperless) {
    tieShapeDimensions(part)
    macro('ld', {
      from: points.tip,
      to: points.notch1,
      d: absoluteOptions.tipWidth / -2.5,
    })
    macro('ld', {
      from: points.notch2,
      to: points.tip,
      d: absoluteOptions.tipWidth / -2.5,
    })
    paths.n45 = new Path()
      .move(points.midLeft)
      .line(points.midRight)
      .attr('class', 'hidden')
      .attr('data-text', '45°')
      .attr('data-text-class', 'center')
  }

  return part
}

export const fabricTail = {
  name: 'trayvon.fabricTail',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  plugins: [ pluginBundle ],
  draft: trayvonFabricTail,
}

export const fabricTip = {
  name: 'trayvon.fabricTip',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  plugins: [ pluginBundle ],
  draft: trayvonFabricTip,
}
