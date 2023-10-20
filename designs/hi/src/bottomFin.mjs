import { body } from './body.mjs'
import { belly } from './belly.mjs'
import { aboveMouth } from './aboveMouth.mjs'

export const bottomOfFin = {
  name: 'hi.bottomOfFin',
  after: [body, belly, aboveMouth],
  draft: ({ store, sa, Point, points, Path, paths, Snippet, snippets, macro, part }) => {
    const multiplier = store.get('multiplier')

    let bottomOfFin01_02d = 250.63638754690027 * multiplier
    const bottomOfFin01_02a = 119.34849371430543
    let bottomOfFin01_03d = 137.70322741678933 * multiplier
    const bottomOfFin01_03a = 175.11970494988498
    const bottomOfFin01cp1d = 133.21819413653674 * multiplier
    const bottomOfFin01cp2d = 51.94197687805115 * multiplier
    const bottomOfFin01cp1a = 95.20910872095476
    const bottomOfFin01cp2a = 158.66090918215986
    const bottomOfFin02cp1d = 29.25974733588791 * multiplier
    const bottomOfFin02cp2d = 31.28292571739416 * multiplier
    const bottomOfFin02cp1a = 208.55316756249104
    const bottomOfFin02cp2a = 28.113642612639804
    const bottomOfFin03cp1d = 53.31550082293142 * multiplier
    const bottomOfFin03cp2d = 177.65809391356197 * multiplier
    const bottomOfFin03cp1a = 9.79694130335566
    const bottomOfFin03cp2a = 80.81868300891519

    const finLength = store.get('aboveMouthFinLength') + store.get('bellyFinLength')
    const finCircumference = store.get('topFinCircumference')

    let diff = 0
    let iteration = 0
    do {
      points.bottomOfFin01 = new Point(0, 0)
      points.bottomOfFin02 = points.bottomOfFin01.shift(bottomOfFin01_02a, bottomOfFin01_02d)
      points.bottomOfFin03 = points.bottomOfFin01.shift(bottomOfFin01_03a, bottomOfFin01_03d)

      points.bottomOfFin01cp1 = points.bottomOfFin01.shift(bottomOfFin01cp1a, bottomOfFin01cp1d)
      points.bottomOfFin01cp2 = points.bottomOfFin01.shift(bottomOfFin01cp2a, bottomOfFin01cp2d)
      points.bottomOfFin02cp1 = points.bottomOfFin02.shift(bottomOfFin02cp1a, bottomOfFin02cp1d)
      points.bottomOfFin02cp2 = points.bottomOfFin02.shift(bottomOfFin02cp2a, bottomOfFin02cp2d)
      points.bottomOfFin03cp1 = points.bottomOfFin03.shift(bottomOfFin03cp1a, bottomOfFin03cp1d)
      points.bottomOfFin03cp2 = points.bottomOfFin03.shift(bottomOfFin03cp2a, bottomOfFin03cp2d)

      diff =
        finLength -
        new Path()
          .move(points.bottomOfFin03)
          .curve(points.bottomOfFin03cp1, points.bottomOfFin01cp2, points.bottomOfFin01)
          .length()

      bottomOfFin01_03d = bottomOfFin01_03d + diff
      iteration++
    } while (Math.abs(diff) > store.get('tolerance') && iteration < 100)

    diff = 0
    iteration = 0
    do {
      points.bottomOfFin01 = new Point(0, 0)
      points.bottomOfFin02 = points.bottomOfFin01.shift(bottomOfFin01_02a, bottomOfFin01_02d)
      points.bottomOfFin03 = points.bottomOfFin01.shift(bottomOfFin01_03a, bottomOfFin01_03d)

      points.bottomOfFin01cp1 = points.bottomOfFin01.shift(bottomOfFin01cp1a, bottomOfFin01cp1d)
      points.bottomOfFin01cp2 = points.bottomOfFin01.shift(bottomOfFin01cp2a, bottomOfFin01cp2d)
      points.bottomOfFin02cp1 = points.bottomOfFin02.shift(bottomOfFin02cp1a, bottomOfFin02cp1d)
      points.bottomOfFin02cp2 = points.bottomOfFin02.shift(bottomOfFin02cp2a, bottomOfFin02cp2d)
      points.bottomOfFin03cp1 = points.bottomOfFin03.shift(bottomOfFin03cp1a, bottomOfFin03cp1d)
      points.bottomOfFin03cp2 = points.bottomOfFin03.shift(bottomOfFin03cp2a, bottomOfFin03cp2d)

      diff =
        finCircumference -
        new Path()
          .move(points.bottomOfFin01)
          .curve(points.bottomOfFin01cp1, points.bottomOfFin02cp2, points.bottomOfFin02)
          .curve(points.bottomOfFin02cp1, points.bottomOfFin03cp2, points.bottomOfFin03)
          .length()

      bottomOfFin01_02d = bottomOfFin01_02d + diff
      iteration++
    } while (Math.abs(diff) > store.get('tolerance') && iteration < 100)

    paths.seam = new Path()
      .move(points.bottomOfFin01)
      .curve(points.bottomOfFin01cp1, points.bottomOfFin02cp2, points.bottomOfFin02)
      .curve(points.bottomOfFin02cp1, points.bottomOfFin03cp2, points.bottomOfFin03)
      .curve(points.bottomOfFin03cp1, points.bottomOfFin01cp2, points.bottomOfFin01)
      .close()

    store.cutlist.addCut({ cut: 2, material: 'color1UpperBody' })

    const finAttachment = new Path()
      .move(points.bottomOfFin01)
      .curve(points.bottomOfFin01cp2, points.bottomOfFin03cp1, points.bottomOfFin03)
    points.bottomOfFinSnippet = finAttachment.shiftAlong(store.get('aboveMouthFinLength'))
    snippets.bottomOfFin = new Snippet('bnotch', points.bottomOfFinSnippet)

    const attachments = finAttachment.split(points.bottomOfFinSnippet)
    paths.finAttachmentAboveMouth = attachments[0].reverse().attr('data-text-class', 'text-xs')
    paths.finAttachmentBelly = attachments[1].reverse().attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.finAttachmentAboveMouth,
      text: '+',
      dy: 0,
      spaces: 0,
      repeat: 4,
      id: 'plusses',
    })
    macro('banner', {
      path: paths.finAttachmentBelly,
      text: '-o-',
      dy: 0,
      spaces: 4,
      repeat: 7,
      id: 'circles',
    })

    points.titleAnchor = points.bottomOfFin02
      .shiftFractionTowards(points.bottomOfFin01, 0.4)
      .shiftFractionTowards(points.bottomOfFin03, 0.1)
    points.logoAnchor = points.titleAnchor.shiftFractionTowards(points.bottomOfFin03, 0.4)
    points.gridAnchor = points.titleAnchor.clone()

    snippets.logo = new Snippet('logo', points.logoAnchor).attr(
      'data-scale',
      (multiplier > 1 ? 1 : multiplier) / 2
    )

    macro('title', {
      at: points.titleAnchor,
      nr: 6,
      title: 'bottomOfFin',
      scale: (multiplier > 1 ? 1 : multiplier) / 2,
    })

    points.bottomOfFinTop = paths.seam.edge('top')
    let tempPath = new Path()
      .move(points.bottomOfFin03)
      .curve(points.bottomOfFin03cp2, points.bottomOfFin02cp1, points.bottomOfFin02)
    const tempPoint = tempPath.shiftFractionAlong(0.8)
    points.bottomOfFinInsideLeft = tempPath.split(tempPoint)[0].edge('right')
    tempPath = new Path()
      .move(points.bottomOfFin01)
      .curve(points.bottomOfFin01cp2, points.bottomOfFin03cp1, points.bottomOfFin03)
    points.bottomOfFinInsideBottom = tempPath.edge('top')

    macro('hd', {
      from: points.bottomOfFin03,
      to: points.bottomOfFin01,
      y: points.bottomOfFin01.y + sa + 20,
      id: 'width',
    })
    macro('hd', {
      from: points.bottomOfFinTop,
      to: points.bottomOfFin01,
      y: points.bottomOfFinTop.y - sa - 10,
      id: 'smallTop',
    })
    macro('hd', {
      from: points.bottomOfFinInsideLeft,
      to: points.bottomOfFin01,
      y: points.bottomOfFin03.y + sa + 20,
      id: 'widthToSmallest',
    })
    macro('hd', {
      from: points.bottomOfFin03,
      to: points.bottomOfFinSnippet,
      y: points.bottomOfFin03.y + sa + 10,
      id: 'widthToSnippet',
    })
    macro('vd', {
      from: points.bottomOfFin03,
      to: points.bottomOfFinTop,
      x: points.bottomOfFin03.x - sa - 10,
      id: 'heightLeft',
    })
    macro('vd', {
      from: points.bottomOfFinTop,
      to: points.bottomOfFin01,
      x: points.bottomOfFin01.x + sa + 20,
      id: 'heightRight',
    })
    macro('vd', {
      from: points.bottomOfFinTop,
      to: points.bottomOfFinInsideBottom,
      x: points.bottomOfFin01.x + sa + 10,
      id: 'heightToSmallest',
    })
    // if( multiplier < 1.5 ) {
    //   paths.smallTop.attr('data-text-class', 'text-xs')
    //   paths.smallBottom.attr('data-text-class', 'text-xs')
    //   paths.smallRight.attr('data-text-class', 'text-xs')
    // }

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    return part
  },
}
