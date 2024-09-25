import { front } from './front.mjs'
import { back } from './back.mjs'

function draftPaulGusset({
  points,
  Point,
  paths,
  Path,
  options,
  store,
  macro,
  snippets,
  Snippet,
  sa,
  part,
}) {
  if (!options.gusset) {
    return part.hide()
  }

  const verticalLength = store.get('innerGussetLegSize')
  const frontWidth = store.get('gussetFrontWidth')
  const frontCurveLength = store.get('outerFrontGussetLegSize')
  const backWidth = store.get('gussetBackWidth')
  const backCurveLength = store.get('outerBackGussetLegSize')

  points.topCenter = new Point(0, 0)
  points.bottomCenter = new Point(0, verticalLength)
  points.topFront = new Point(-frontWidth, 0)
  points.topBack = new Point(backWidth, 0)
  points.topFrontCp = new Point(-frontWidth, verticalLength * 0.3)
  points.topBackCp = new Point(backWidth, verticalLength * 0.3)

  snippets.front = new Snippet('notch', points.topFront)
  snippets.back = new Snippet('bnotch', points.topBack)

  // adjust bottomCenter so that both curves match the lengths from store
  for (let i = 0; i < 10; i++) {
    let curveLeftLength = new Path()
      .move(points.topFront)
      .curve_(points.topFrontCp, points.bottomCenter)
      .length()
    let curveRightLength = new Path()
      .move(points.topBack)
      .curve_(points.topBackCp, points.bottomCenter)
      .length()

    let deltaY = frontCurveLength + backCurveLength - curveLeftLength - curveRightLength
    let deltaX = frontCurveLength - backCurveLength - curveLeftLength + curveRightLength

    points.bottomCenter.x += deltaX / 2
    points.bottomCenter.y += deltaY / 2
  }

  paths.outlineBase = new Path()
    .move(points.topFront)
    .curve_(points.topFrontCp, points.bottomCenter)
    ._curve(points.topBackCp, points.topBack)
    .hide()

  macro('mirror', {
    mirror: [points.topFront, points.topBack],
    paths: ['outlineBase'],
    points: ['bottomCenter'],
  })

  paths.outline = paths.outlineBase
    .clone()
    .unhide()
    .join(paths.mirroredOutlineBase.reverse())
    .setClass('fabric')
    .close()

  if (sa) {
    paths.sa = macro('sa', {
      paths: ['outline'],
      limit: sa,
    })
  }

  macro('grainline', {
    from: points.bottomCenter,
    to: points.mirroredBottomCenter,
  })

  macro('title', {
    at: points.topCenter,
    nr: 8,
    title: 'gusset',
    align: 'left',
    scale: 0.5,
  })

  macro('vd', {
    id: 'vHeight',
    from: points.mirroredBottomCenter,
    to: points.bottomCenter,
    x: points.topFront.x - 10,
  })
  macro('hd', {
    id: 'hWidth',
    from: points.topFront,
    to: points.topBack,
    y: points.bottomCenter.y + 10,
  })
  macro('hd', {
    id: 'hRight',
    from: points.mirroredBottomCenter,
    to: points.topBack,
    y: points.mirroredBottomCenter.y,
  })

  return part
}

export const gusset = {
  name: 'paul.gusset',
  after: [front, back],
  options: {},
  draft: draftPaulGusset,
}
