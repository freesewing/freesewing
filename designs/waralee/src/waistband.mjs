import { pantsProto } from './pantsproto.mjs'

function waraleeWaistband(type, {
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
  store,
  part,
}) {

  const WidthReduction = 6
  let waistBand = store.get('waistBand')
  let waistBandLengthFront = points.fWaistSideHem.dist(points.fWaistFrontOverlapHem)
  let waistBandLengthBack =
    points.bWaistSideHem.dist(points.bWaistBackHem) +
    points.bWaistBackHem.dist(points.bWaistBackOverlapHem)

  let strapLength = measurements.waist + measurements.crotchDepth * 1.75
  let partNr = 0
  let partN = 0

  switch (type) {
    case 'waistBandFront':
      if (false == options.separateWaistband && 'welt' == options.frontPocketStyle) {
        return part
      }
      partNr = 9
      points.tr = points.fWaistSide
      points.mr = points.fWaistSideHem
      points.br = points.fWaistSideSeam
      points.ml = points.fWaistSideHem.shift(180, (waistBandLengthFront / WidthReduction) * 2)
      points.tl = points.ml.shift(90, waistBand)
      points.bl = points.ml.shift(270, waistBand)

      macro('hd', {
        from: points.ml,
        to: points.mr,
        y: points.mr.y,
        text: part.units(waistBandLengthFront),
      })

      break

    case 'waistBandBack':
      if (false == options.separateWaistband && 'welt' == options.frontPocketStyle) {
        return part
      }
      partNr = 10
      points.tl = points.bWaistSide
      points.ml = points.bWaistSideHem
      points.bl = points.bWaistSideSeam
      points.mr = points.bWaistSideHem.shift(0, (waistBandLengthBack / WidthReduction) * 2)
      points.tr = points.mr.shift(90, waistBand)
      points.br = points.mr.shift(270, waistBand)

      macro('hd', {
        from: points.ml,
        to: points.mr,
        y: points.mr.y,
        text: part.units(waistBandLengthBack),
      })

      break

    case 'strapFront':
      partNr = 7
      strapLength -= waistBandLengthFront * 2
      strapLength += options.knotInFront ? measurements.waist / 2 : 0

      points.mr = new Point(0, 0)
      points.tr = points.mr.shift(90, waistBand)
      points.br = points.mr.shift(270, waistBand)
      points.ml = points.mr.shift(180, (waistBandLengthFront / WidthReduction) * 2)
      points.tl = points.ml.shift(90, waistBand)
      points.bl = points.ml.shift(270, waistBand)

      macro('hd', {
        from: points.ml,
        to: points.mr,
        y: points.mr.y,
        text: part.units(strapLength),
      })

      break

    case 'strapBack':
      partNr = 8
      strapLength -= waistBandLengthBack * 2
      strapLength += options.knotInFront ? 0 : measurements.waist / 2

      points.mr = new Point(0, 0)
      points.tr = points.mr.shift(90, waistBand)
      points.br = points.mr.shift(270, waistBand)
      points.ml = points.mr.shift(180, (waistBandLengthFront / WidthReduction) * 2)
      points.tl = points.ml.shift(90, waistBand)
      points.bl = points.ml.shift(270, waistBand)

      macro('hd', {
        from: points.ml,
        to: points.mr,
        y: points.mr.y,
        text: part.units(strapLength),
      })

      break
  }

  points.zigzagTop = points.tr.shift(180, waistBandLengthFront / WidthReduction)
  points.zigzagTopR = points.zigzagTop.shift(0, waistBand / 8)
  points.zigzagTopT = points.zigzagTop.shift(90, waistBand / 4)
  points.zigzagTopL = points.zigzagTop.shift(180, waistBand / 8)
  points.zigzagTopB = points.zigzagTop.shift(270, waistBand / 4)
  points.zigzagBottom = points.br.shift(180, waistBandLengthFront / WidthReduction)
  points.zigzagBottomR = points.zigzagBottom.shift(0, waistBand / 8)
  points.zigzagBottomT = points.zigzagBottom.shift(90, waistBand / 4)
  points.zigzagBottomL = points.zigzagBottom.shift(180, waistBand / 8)
  points.zigzagBottomB = points.zigzagBottom.shift(270, waistBand / 4)

  paths.ZZtop = new Path()
    .move(points.zigzagTopR)
    .line(points.zigzagTopT)
    .line(points.zigzagTopB)
    .line(points.zigzagTopL)
    .attr('class', 'dotted')
  paths.ZZbottom = new Path()
    .move(points.zigzagBottomR)
    .line(points.zigzagBottomT)
    .line(points.zigzagBottomB)
    .line(points.zigzagBottomL)
    .attr('class', 'dotted')
  paths.right = new Path()
    .move(points.zigzagBottomR)
    .line(points.br)
    .line(points.mr)
    .line(points.tr)
    .line(points.zigzagTopR)
  paths.left = new Path()
    .move(points.zigzagBottomL)
    .line(points.bl)
    .line(points.ml)
    .line(points.tl)
    .line(points.zigzagTopL)

  paths.seam = new Path()
    .move(points.br)
    .line(points.mr)
    .line(points.tr)
    .line(points.tl)
    .line(points.ml)
    .line(points.bl)
    .line(points.br)
    .close()
    .setRender(false)

  // Complete?
  if (complete) {
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    points.title = points.tl.shiftFractionTowards(points.br, 0.2).shift(270, 20)
    macro('title', {
      nr: partNr,
      at: points.title,
      title: type,
      prefix: 'front',
      scale: 0.4,
    })

    points.logo = points.tl.shiftFractionTowards(points.br, 0.8)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.3)
  }
  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.tr,
      to: points.br,
      x: points.br.x + sa + 10,
    })
  }

  return part
}

export const waistbandFront = {
  name: 'waralee.waistbandFront',
  from: pantsProto,
  draft: (part) => waraleeWaistband('waistBandFront', part),
}
export const waistbandBack = {
  name: 'waralee.waistbandBack',
  from: pantsProto,
  draft: (part) => waraleeWaistband('waistBandBack', part),
}
export const strapFront = {
  name: 'waralee.strapFront',
  from: pantsProto,
  draft: (part) => waraleeWaistband('strapFront', part),
}
export const strapBack = {
  name: 'waralee.strapBack',
  from: pantsProto,
  draft: (part) => waraleeWaistband('strapBack', part),
}
