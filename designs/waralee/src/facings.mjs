import { pantsProto } from './pantsproto.mjs'

function waraleeFacing(
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
  const frontPocketSize =
    options.frontPocketSize * measurements.crotchDepth /*- measurements.waistToHips*/
  const backPocketSize =
    options.backPocketSize * measurements.crotchDepth /*- measurements.waistToHips*/

  if (type == 'front') {
    if (!options.frontPocket || 'welt' != options.frontPocketStyle) {
      return part.hide()
    }
  } else {
    if (!options.backPocket) {
      return part.hide()
    }
  }

  const width = (type == 'front' ? frontPocketSize : backPocketSize) + sa + sa
  const height = (type == 'front' ? frontPocketSize : backPocketSize) / 2

  if (!expand) {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `waralee:cutFacing` + type,
      replace: {
        width: units(width),
        length: units(height),
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
  points.tr = points.tl.shift(0, width)
  points.bl = points.tl.shift(270, height)
  points.br = points.tr.shift(270, height)

  paths.seamSeam = new Path()
    .move(points.tl)
    .line(points.bl)
    .line(points.br)
    .line(points.tr)
    .line(points.tl)
    .close()
    .attr('class', 'fabric')

  store.cutlist.addCut({ cut: type == 'front' ? 4 : 2, from: 'fabric' })

  points.title = points.tl.shift(270, 30).shift(0, 40)
  macro('title', {
    nr: type == 'front' ? 5 : 6,
    at: points.title.shift(0, 30),
    title: type + 'Facing',
    scale: 0.6,
  })

  points.logo = points.title.shift(270, 0)
  snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.3)

  macro('hd', {
    id: 1,
    from: points.tl,
    to: points.tr,
    y: points.tl.y + 15,
  })
  macro('vd', {
    id: 2,
    from: points.tl,
    to: points.bl,
    x: points.tl.x + 15,
  })

  return part
}

export const facingFront = {
  name: 'waralee.facingFront',
  after: pantsProto,
  draft: (part) => waraleeFacing('front', part),
}
export const facingBack = {
  name: 'waralee.facingBack',
  after: pantsProto,
  draft: (part) => waraleeFacing('back', part),
}
