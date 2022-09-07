import { pantsProto } from './pantsproto.mjs'

function waraleeFacings(part) {
  const {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    sa,
  } = part.shorthand()

  let frontPocketSize =
    options.frontPocketSize * measurements.crotchDepth /*- measurements.waistToHips*/
  let backPocketSize =
    options.backPocketSize * measurements.crotchDepth /*- measurements.waistToHips*/

  points.frontTL = new Point(0, 0)
  points.frontTR = points.frontTL.shift(0, frontPocketSize + sa + sa)
  points.frontBL = points.frontTL.shift(270, frontPocketSize / 2)
  points.frontBR = points.frontTR.shift(270, frontPocketSize / 2)

  points.backTL = points.frontBL.shift(270, 50)
  points.backTR = points.backTL.shift(0, backPocketSize + sa + sa)
  points.backBL = points.backTL.shift(270, backPocketSize / 2)
  points.backBR = points.backTR.shift(270, backPocketSize / 2)

  paths.frontSeam = new Path()
    .move(points.frontTL)
    .line(points.frontBL)
    .line(points.frontBR)
    .line(points.frontTR)
    .line(points.frontTL)
    .close()
    .attr('class', 'fabric')
    .setRender(options.frontPocket && 'welt' == options.frontPocketStyle)

  paths.backSeam = new Path()
    .move(points.backTL)
    .line(points.backBL)
    .line(points.backBR)
    .line(points.backTR)
    .line(points.backTL)
    .close()
    .attr('class', 'fabric')
    .setRender(options.backPocket)

  // Complete?
  if (complete) {
    if (options.frontPocket && 'welt' == options.frontPocketStyle) {
      points.frontTitle = points.frontTL.shift(270, 30).shift(0, 40)
      macro('title', {
        nr: 5,
        at: points.frontTitle.shift(0, 30),
        title: 'frontFacing',
        prefix: 'front',
        scale: 0.6,
      })

      points.frontLogo = points.frontTitle.shift(270, 0)
      snippets.frontLogo = new Snippet('logo', points.frontLogo).attr('data-scale', 0.3)
      points.frontText = points.frontLogo
        .shift(-90, 15)
        .attr('data-text', 'Waralee')
        .attr('data-text-class', 'center')
    }
    if (options.backPocket) {
      points.backTitle = points.backTL.shift(270, 30).shift(0, 40)
      macro('title', {
        nr: 6,
        at: points.backTitle.shift(0, 30),
        title: 'backFacing',
        prefix: 'back',
        scale: 0.6,
      })
      points.backLogo = points.backTitle.shift(270, 0)
      snippets.backLogo = new Snippet('logo', points.backLogo).attr('data-scale', 0.3)
      points.backText = points.backLogo
        .shift(-90, 15)
        .attr('data-text', 'Waralee')
        .attr('data-text-class', 'center')
    }
  }
  // Paperless?
  if (paperless) {
    if (options.frontPocket && 'welt' == options.frontPocketStyle) {
      macro('hd', {
        from: points.frontTL,
        to: points.frontTR,
        y: points.frontTL.y + 15,
      })
      macro('vd', {
        from: points.frontTL,
        to: points.frontBL,
        x: points.frontTL.x + 15,
      })
    }
    if (options.backPocket) {
      macro('hd', {
        from: points.backTL,
        to: points.backTR,
        y: points.backTL.y + 15,
      })
      macro('vd', {
        from: points.backTL,
        to: points.backBL,
        x: points.backTL.x + 15,
      })
    }
  }

  return part
}

export const facings = {
  name: 'waralee.facings',
  after: pantsProto,
  draft: waraleeFacings,
}
