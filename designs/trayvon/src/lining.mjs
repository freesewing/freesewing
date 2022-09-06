import { pluginBundle } from '@freesewing/plugin-bundle'
import {
  calculateHelpers,
  draftTieShape,
  seamAllowance,
  tieShapeDimensions,
  options,
} from './shared.mjs'

function trayvonLiningTail(part) {
  const {
    Path,
    Snippet,
    complete,
    macro,
    options,
    paths,
    points,
    paperless,
    sa,
    snippets,
    store,
    absoluteOptions,
  } = part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, store.get('backTip') * 2.5, options.knotWidth * 2.5)

  // Cut part short
  points.cutRight = points.tipRight.shiftTowards(points.midRight, absoluteOptions.tipWidth * 2.5)
  points.cutLeft = points.cutRight.flipX()

  // Overwrite path
  paths.seam = new Path()
    .move(points.tip)
    .line(points.tipLeft)
    .line(points.cutLeft)
    .line(points.cutRight)
    .line(points.tipRight)
    .line(points.tip)
    .close()
    .attr('class', 'lining')

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 6,
      title: 'liningTip',
      rotation: -90,
    })
    snippets.notch = new Snippet('notch', points.tip)

    if (sa) seamAllowance(part, 'lining')
  }

  // Paperless?
  if (paperless) tieShapeDimensions(part, true)

  return part
}

function trayvonLiningTip(part) {
  const {
    Path,
    Snippet,
    complete,
    macro,
    paperless,
    paths,
    points,
    sa,
    snippets,
    absoluteOptions,
  } = part.shorthand()

  calculateHelpers(part)
  draftTieShape(part, absoluteOptions.tipWidth * 2.5, absoluteOptions.knotWidth * 2.5)

  // Cut part short
  points.cutRight = points.tipRight.shiftTowards(points.midRight, absoluteOptions.tipWidth * 2.5)
  points.cutLeft = points.cutRight.flipX()

  // Overwrite path
  paths.seam = new Path()
    .move(points.tip)
    .line(points.tipLeft)
    .line(points.cutLeft)
    .line(points.cutRight)
    .line(points.tipRight)
    .line(points.tip)
    .close()
    .attr('class', 'lining')

  // Complete pattern?
  if (complete) {
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'liningTip',
      rotation: -90,
    })
    snippets.notch = new Snippet('notch', points.tip)
    macro('miniscale', { at: points.gridAnchor })

    if (sa) seamAllowance(part, 'lining')
  }

  // Paperless?
  if (paperless) {
    tieShapeDimensions(part, true)
  }

  return part
}

export const liningTail = {
  name: 'trayvon.liningTail',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  plugins: [ pluginBundle ],
  draft: trayvonLiningTail,
}

export const liningTip = {
  name: 'trayvon.liningTip',
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  options,
  plugins: [ pluginBundle ],
  draft: trayvonLiningTip,
}
