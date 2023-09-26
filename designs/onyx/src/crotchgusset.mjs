import { front } from './front.mjs'
import { back } from './back.mjs'

function draftCrotchGusset({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  part,
  store,
  paperless,
  complete,
  sa,
  macro,
  snippets,
  Snippet,
}) {
  const crotchGussetLength = store.get('crotchGussetLength')
  const crotchGussetWidth = store.get('crotchGussetWidth')

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, crotchGussetWidth)
  points.bottomRightCorner = new Point(crotchGussetLength / 2, crotchGussetWidth)
  points.topRightCorner = new Point(crotchGussetLength / 2, 0)

  paths.saBase = new Path()
    .move(points.bottomLeftCorner)
    .line(points.bottomRightCorner)
    .line(points.topRightCorner)
    .line(points.topLeftCorner)
    .attr('class', 'fabric')
    .hide(true)

  paths.foldBase = new Path().move(points.topLeftCorner).line(points.bottomLeftCorner).hide(true)

  paths.seam = paths.saBase.join(paths.foldBase).close().attr('class', 'fabric')

  if (paperless) {
    macro('vd', {
      id: 'hCrotchGusset',
      from: points.topLeftCorner,
      to: points.bottomLeftCorner,
      x: -(15 + sa),
    })
    macro('hd', {
      id: 'wCrotchGusset',
      from: points.topLeftCorner,
      to: points.topRightCorner,
      y: -(sa + 15),
    })
  }

  points.cutonfoldFrom = points.topLeftCorner
  points.cutonfoldTo = points.bottomLeftCorner
  macro('cutonfold', {
    from: points.cutonfoldFrom,
    to: points.cutonfoldTo,
    grainline: true,
  })

  store.cutlist.addCut({ cut: 1 })

  if (complete) {
    points.title = new Point(crotchGussetLength / 4, crotchGussetWidth / 2)
    macro('title', { at: points.title, nr: 5, title: 'crotch gusset' })

    if (sa) {
      paths.sa = new Path()
        .move(points.bottomLeftCorner)
        .join(paths.saBase.offset(sa))
        .line(points.topLeftCorner)
        .attr('class', 'fabric sa')
    }
  }

  return part
}

export const crotchGusset = {
  name: 'onyx.crotchGusset',
  plugins: [],
  draft: draftCrotchGusset,
  after: [front, back],
}
