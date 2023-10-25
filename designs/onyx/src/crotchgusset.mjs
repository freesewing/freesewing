import { front } from './front.mjs'
import { back } from './back.mjs'

function draftCrotchGusset({
  Path,
  Point,
  paths,
  points,
  options,
  absoluteOptions,
  part,
  store,
  sa,
  macro,
  snippets,
  Snippet,
  scale,
}) {
  const crotchGussetLength = store.get('crotchGussetLength')
  const crotchGussetWidth = store.get('crotchGussetWidth')

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, crotchGussetWidth)
  points.bottomRightCorner = new Point(crotchGussetLength / 2, crotchGussetWidth)
  points.topRightCorner = new Point(crotchGussetLength / 2, 0)

  paths.saBase1 = new Path()
    .move(points.bottomLeftCorner)
    .line(points.bottomRightCorner)
    .addClass('fabric')
    .hide()

  paths.hemBase = new Path()
    .move(points.bottomRightCorner)
    .line(points.topRightCorner)
    .addClass('fabric')
    .hide()

  paths.saBase2 = new Path()
    .move(points.topRightCorner)
    .line(points.topLeftCorner)
    .addClass('fabric')
    .hide()

  paths.foldBase = new Path().move(points.topLeftCorner).line(points.bottomLeftCorner).hide()

  paths.seam = paths.saBase1
    .join(paths.hemBase)
    .join(paths.saBase2)
    .join(paths.foldBase)
    .close()
    .addClass('fabric')

  macro('vd', {
    id: 'hCrotchGusset',
    from: points.topLeftCorner,
    to: points.bottomLeftCorner,
    x: -(sa + 15),
  })
  macro('hd', {
    id: 'wCrotchGusset',
    from: points.topLeftCorner,
    to: points.topRightCorner,
    y: -(sa + 15),
  })

  points.cutonfoldFrom = points.topLeftCorner
  points.cutonfoldTo = points.bottomLeftCorner
  macro('cutonfold', {
    from: points.cutonfoldFrom,
    to: points.cutonfoldTo,
    grainline: false,
  })

  points.grainlineFrom = points.topLeftCorner.shiftFractionTowards(points.bottomLeftCorner, 0.95)
  points.grainlineTo = points.topRightCorner.shiftFractionTowards(points.bottomRightCorner, 0.95)
  macro('grainline', {
    from: points.grainlineFrom,
    to: points.grainlineTo,
  })

  store.cutlist.addCut({ cut: 1, from: 'fabric' })

  points.title = new Point(crotchGussetLength / 4, crotchGussetWidth / 2)
  macro('title', { at: points.title, nr: 5, title: 'crotch gusset' })
  points.logo = points.title.shift(180, 50 * scale)
  snippets.logo = new Snippet('logo', points.logo)

  if (sa) {
    paths.sa = new Path()
      .move(points.bottomLeftCorner)
      .line(points.bottomLeftCorner.translate(0, sa))
      .line(
        points.bottomRightCorner.translate(options.legRibbing ? sa : absoluteOptions.legHem, sa)
      )
      .line(points.topRightCorner.translate(options.legRibbing ? sa : absoluteOptions.legHem, -sa))
      .line(points.topLeftCorner.translate(0, -sa))
      .line(points.topLeftCorner)
      .addClass('fabric sa')
  }

  return part
}

export const crotchGusset = {
  name: 'onyx.crotchGusset',
  draft: draftCrotchGusset,
  after: [front, back],
}
