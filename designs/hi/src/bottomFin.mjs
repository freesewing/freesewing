import { body } from './body.mjs'
import { belly } from './belly.mjs'
import { aboveMouth } from './aboveMouth.mjs'

function draftHiBottomFin({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  complete,
  paperless,
  macro,
  part,
}) {
  let bottomFin01_02d = 250.63638754690027 * options.size
  const bottomFin01_02a = 119.34849371430543
  let bottomFin01_03d = 137.70322741678933 * options.size
  const bottomFin01_03a = 175.11970494988498
  const bottomFin01cp1d = 133.21819413653674 * options.size
  const bottomFin01cp2d = 51.94197687805115 * options.size
  const bottomFin01cp1a = 95.20910872095476
  const bottomFin01cp2a = 158.66090918215986
  const bottomFin02cp1d = 29.25974733588791 * options.size
  const bottomFin02cp2d = 31.28292571739416 * options.size
  const bottomFin02cp1a = 208.55316756249104
  const bottomFin02cp2a = 28.113642612639804
  const bottomFin03cp1d = 53.31550082293142 * options.size
  const bottomFin03cp2d = 177.65809391356197 * options.size
  const bottomFin03cp1a = 9.79694130335566
  const bottomFin03cp2a = 80.81868300891519

  const finLength = store.get('aboveMouthFinLength') + store.get('bellyFinLength')
  const finCircumference = store.get('topFinCircumference')

  let diff = 0
  let iteration = 0
  do {
    points.bottomFin01 = new Point(0, 0)
    points.bottomFin02 = points.bottomFin01.shift(bottomFin01_02a, bottomFin01_02d)
    points.bottomFin03 = points.bottomFin01.shift(bottomFin01_03a, bottomFin01_03d)

    points.bottomFin01cp1 = points.bottomFin01.shift(bottomFin01cp1a, bottomFin01cp1d)
    points.bottomFin01cp2 = points.bottomFin01.shift(bottomFin01cp2a, bottomFin01cp2d)
    points.bottomFin02cp1 = points.bottomFin02.shift(bottomFin02cp1a, bottomFin02cp1d)
    points.bottomFin02cp2 = points.bottomFin02.shift(bottomFin02cp2a, bottomFin02cp2d)
    points.bottomFin03cp1 = points.bottomFin03.shift(bottomFin03cp1a, bottomFin03cp1d)
    points.bottomFin03cp2 = points.bottomFin03.shift(bottomFin03cp2a, bottomFin03cp2d)

    diff =
      finLength -
      new Path()
        .move(points.bottomFin03)
        .curve(points.bottomFin03cp1, points.bottomFin01cp2, points.bottomFin01)
        .length()

    bottomFin01_03d = bottomFin01_03d + diff
    iteration++
  } while (Math.abs(diff) > store.get('tolerance') && iteration < 100)

  diff = 0
  iteration = 0
  do {
    points.bottomFin01 = new Point(0, 0)
    points.bottomFin02 = points.bottomFin01.shift(bottomFin01_02a, bottomFin01_02d)
    points.bottomFin03 = points.bottomFin01.shift(bottomFin01_03a, bottomFin01_03d)

    points.bottomFin01cp1 = points.bottomFin01.shift(bottomFin01cp1a, bottomFin01cp1d)
    points.bottomFin01cp2 = points.bottomFin01.shift(bottomFin01cp2a, bottomFin01cp2d)
    points.bottomFin02cp1 = points.bottomFin02.shift(bottomFin02cp1a, bottomFin02cp1d)
    points.bottomFin02cp2 = points.bottomFin02.shift(bottomFin02cp2a, bottomFin02cp2d)
    points.bottomFin03cp1 = points.bottomFin03.shift(bottomFin03cp1a, bottomFin03cp1d)
    points.bottomFin03cp2 = points.bottomFin03.shift(bottomFin03cp2a, bottomFin03cp2d)

    diff =
      finCircumference -
      new Path()
        .move(points.bottomFin01)
        .curve(points.bottomFin01cp1, points.bottomFin02cp2, points.bottomFin02)
        .curve(points.bottomFin02cp1, points.bottomFin03cp2, points.bottomFin03)
        .length()

    bottomFin01_02d = bottomFin01_02d + diff
    iteration++
  } while (Math.abs(diff) > store.get('tolerance') && iteration < 100)

  paths.seam = new Path()
    .move(points.bottomFin01)
    .curve(points.bottomFin01cp1, points.bottomFin02cp2, points.bottomFin02)
    .curve(points.bottomFin02cp1, points.bottomFin03cp2, points.bottomFin03)
    .curve(points.bottomFin03cp1, points.bottomFin01cp2, points.bottomFin01)
    .close()

  store.cutlist.addCut({ material: 'color1UpperBody' })

  // Complete?
  if (complete) {
    const finAttachment = new Path()
      .move(points.bottomFin01)
      .curve(points.bottomFin01cp2, points.bottomFin03cp1, points.bottomFin03)
    points.bottomFinSnippet = finAttachment.shiftAlong(store.get('aboveMouthFinLength'))
    snippets.bottomFin = new Snippet('bnotch', points.bottomFinSnippet)

    const attachments = finAttachment.split(points.bottomFinSnippet)
    paths.finAttachmentAboveMouth = attachments[0].reverse().attr('data-text-class', 'text-xs')
    paths.finAttachmentBelly = attachments[1].reverse().attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.finAttachmentAboveMouth,
      text: '+',
      dy: 0,
      spaces: 0,
      repeat: 4,
    })
    macro('banner', {
      path: paths.finAttachmentBelly,
      text: '-o-',
      dy: 0,
      spaces: 4,
      repeat: 7,
    })

    points.titleAnchor = points.bottomFin02
      .shiftFractionTowards(points.bottomFin01, 0.4)
      .shiftFractionTowards(points.bottomFin03, 0.1)
    points.logoAnchor = points.titleAnchor.shiftFractionTowards(points.bottomFin03, 0.4)

    snippets.logo = new Snippet('logo', points.logoAnchor).attr(
      'data-scale',
      (options.size > 1 ? 1 : options.size) / 2
    )

    macro('title', {
      at: points.titleAnchor,
      nr: 6,
      title: 'bottomFin',
      scale: (options.size > 1 ? 1 : options.size) / 2,
    })

    if (paperless) {
      points.bottomFinTop = paths.seam.edge('top')
      let tempPath = new Path()
        .move(points.bottomFin03)
        .curve(points.bottomFin03cp2, points.bottomFin02cp1, points.bottomFin02)
      const tempPoint = tempPath.shiftFractionAlong(0.8)
      points.bottomFinInsideLeft = tempPath.split(tempPoint)[0].edge('right')
      tempPath = new Path()
        .move(points.bottomFin01)
        .curve(points.bottomFin01cp2, points.bottomFin03cp1, points.bottomFin03)
      points.bottomFinInsideBottom = tempPath.edge('top')

      macro('hd', {
        from: points.bottomFin03,
        to: points.bottomFin01,
        y: points.bottomFin01.y + sa + 20,
      })
      macro('hd', {
        from: points.bottomFinTop,
        to: points.bottomFin01,
        y: points.bottomFinTop.y - sa - 10,
        // id: 'smallTop',
        // noStartMarker: true,
        // noEndMarker: true,
      })
      macro('hd', {
        from: points.bottomFinInsideLeft,
        to: points.bottomFin01,
        y: points.bottomFin03.y + sa + 20,
        // id: 'smallBottom',
        // noStartMarker: true,
        // noEndMarker: true,
      })
      macro('hd', {
        from: points.bottomFin03,
        to: points.bottomFinSnippet,
        y: points.bottomFin03.y + sa + 10,
      })
      macro('vd', {
        from: points.bottomFin03,
        to: points.bottomFinTop,
        x: points.bottomFin03.x - sa - 10,
      })
      macro('vd', {
        from: points.bottomFinTop,
        to: points.bottomFin01,
        x: points.bottomFin01.x + sa + 20,
      })
      macro('vd', {
        from: points.bottomFinTop,
        to: points.bottomFinInsideBottom,
        x: points.bottomFin01.x + sa + 10,
        // id: 'smallRight',
        // noStartMarker: true,
        // noEndMarker: true,
      })
      // if( options.size < 1.5 ) {
      //   paths.smallTop.attr('data-text-class', 'text-xs')
      //   paths.smallBottom.attr('data-text-class', 'text-xs')
      //   paths.smallRight.attr('data-text-class', 'text-xs')
      // }
    }

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  return part
}

export const bottomFin = {
  name: 'hi.bottomFin',
  after: [body, belly, aboveMouth],
  draft: draftHiBottomFin,
}
