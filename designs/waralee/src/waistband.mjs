import { pantsProto } from './pantsproto.mjs'

function waraleeWaistband(
  type,
  {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    macro,
    sa,
    store,
    expand,
    units,
    part,
  }
) {
  const waistBand = store.get('waistBand')
  const waistBandLengthFront = points.fWaistSideHem.dist(points.fWaistFrontOverlapHem)
  const waistBandLengthBack =
    points.bWaistSideHem.dist(points.bWaistBackHem) +
    points.bWaistBackHem.dist(points.bWaistBackOverlapHem)

  let waistBandLength = measurements.waist + measurements.crotchDepth * 1.75
  let partNr = 0

  switch (type) {
    case 'waistBandFront':
      if (false == options.separateWaistband && 'welt' == options.frontPocketStyle) {
        return part
      }
      partNr = 9
      waistBandLength = waistBandLengthFront * 2
      break

    case 'waistBandBack':
      if (false == options.separateWaistband && 'welt' == options.frontPocketStyle) {
        return part
      }
      partNr = 10
      waistBandLength = waistBandLengthBack * 2
      break

    case 'strapFront':
      partNr = 7
      waistBandLength -= waistBandLengthFront * 2
      waistBandLength += options.knotInFront ? measurements.waist / 2 : 0
      break

    case 'strapBack':
      partNr = 8
      waistBandLength -= waistBandLengthBack * 2
      waistBandLength += options.knotInFront ? 0 : measurements.waist / 2
      break
  }

  if (!expand) {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `waralee:cut` + type,
      replace: {
        width: units(waistBand * 2),
        length: units(waistBandLength),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expand')

    return part.hide()
  }

  points.tl = new Point(0, 0)
  points.bl = new Point(0, waistBandLength)
  points.tr = new Point(waistBand * 2, 0)
  points.br = new Point(waistBand * 2, waistBandLength)

  paths.seam = new Path()
    .move(points.br)
    .line(points.tr)
    .line(points.tl)
    .line(points.bl)
    .line(points.br)
    .close()

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  console.log({
    part: type,
    points: JSON.parse(JSON.stringify(points)),
    paths: JSON.parse(JSON.stringify(paths)),
  })

  points.title = new Point(waistBand, waistBandLength * 0.2)
  macro('title', {
    nr: partNr,
    at: points.title,
    title: type,
    prefix: 'front',
    scale: 0.4,
    align: 'center',
  })

  points.logo = new Point(waistBand, waistBandLength * 0.4)
  snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.3)

  macro('hd', {
    id: 'w',
    from: points.tr,
    to: points.tl,
    y: points.tl.y + sa + 10,
  })
  macro('vd', {
    id: 'h',
    from: points.tr,
    to: points.br,
    x: points.br.x + sa + 10,
  })

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
