import { frontLeft } from './front-left.mjs'

function draftFlyShield({
  Point,
  points,
  Path,
  paths,
  store,
  part,
  measurements,
  options,
  complete,
  sa,
  paperless,
  snippets,
  Snippet,
  macro,
  absoluteOptions,
}) {
  const w = store.get('jseamWidth')
  const h = store.get('jseamHeight') * 1.05

  points.topLeft = new Point(0, 0)
  points.topMid = new Point(w, 0)
  points.topRight = new Point(2 * w, 0)
  points.bottomLeft = new Point(0, h)
  points.bottomMid = new Point(w, h)
  points.bottomRight = new Point(2 * w, h)

  paths.seamLine = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  // Complete?
  if (complete) {
    paths.fold = new Path().move(points.bottomMid).line(points.topMid).addClass('note help')

    macro('banner', {
      path: paths.fold,
      text: 'foldHere',
      className: 'text-sm fill-note',
    })

    points.logo = new Point(w, h / 2)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.5)

    if (sa) {
      //  paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part
}

export const flyShield = {
  name: 'collab:flyShield',
  draft: draftFlyShield,
  after: frontLeft,
}
