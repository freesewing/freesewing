import { step8 } from './step5-8.mjs'

export const step9 = {
  name: 'tutorial.step9',
  from: step8,
  draft: ({ points, Path, paths, part }) => {
    points.edgeTopRightCp = points.edgeTopLeftCp.flipX()
    points.topCp1 = points.topCp2.flipX()
    points.tipLeftTopStart = points.tipRightTopStart.flipX()
    points.tipLeftTopCp1 = points.tipRightTopCp1.flipX()
    points.tipLeftTopCp2 = points.tipRightTopCp2.flipX()
    points.tipLeftTopEnd = points.tipRightTopEnd.flipX()
    points.tipLeftBottomStart = points.tipRightBottomStart.flipX()
    points.tipLeftBottomCp1 = points.tipRightBottomCp1.flipX()
    points.tipLeftBottomCp2 = points.tipRightBottomCp2.flipX()
    points.tipLeftBottomEnd = points.tipRightBottomEnd.flipX()
    points.snapRight = points.snapLeft.flipX()

    paths.seam = new Path()
      .move(points.edgeLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.edgeRight)
      .curve(points.edgeRightCp, points.edgeTopRightCp, points.tipLeftTopStart)
      .curve(points.tipLeftTopCp1, points.tipLeftTopCp2, points.tipLeftTopEnd)
      .curve(points.tipLeftBottomCp1, points.tipLeftBottomCp2, points.tipLeftBottomEnd)
      .curve(points.topCp1, points.rightCp2, points.right)
      .curve(points.rightCp1, points.bottomCp2, points.bottom)
      .curve(points.bottomCp1, points.leftCp2, points.left)
      .curve(points.leftCp1, points.topCp2, points.tipRightBottomEnd)
      .curve(points.tipRightBottomCp2, points.tipRightBottomCp1, points.tipRightBottomStart)
      .curve(points.tipRightTopCp2, points.tipRightTopCp1, points.tipRightTopStart)
      .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
      .close()
      .attr('class', 'fabric')

    delete paths.neck
    delete paths.rect

    return part
  },
}

export const step10 = {
  name: 'tutorial.step10',
  from: step9,
  draft: ({ points, Path, paths, macro, part }) => {
    macro('round', {
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: points.bottomRight.x / 4,
      prefix: 'bottomLeft',
    })
    macro('round', {
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: points.bottomRight.x / 4,
      prefix: 'bottomRight',
    })

    paths.seam = new Path()
      .move(points.edgeLeft)
      .line(points.bottomLeftStart)
      .curve(points.bottomLeftCp1, points.bottomLeftCp2, points.bottomLeftEnd)
      .line(points.bottomRightStart)
      .curve(points.bottomRightCp1, points.bottomRightCp2, points.bottomRightEnd)
      .line(points.edgeRight)
      .curve(points.edgeRightCp, points.edgeTopRightCp, points.tipLeftTopStart)
      .curve(points.tipLeftTopCp1, points.tipLeftTopCp2, points.tipLeftTopEnd)
      .curve(points.tipLeftBottomCp1, points.tipLeftBottomCp2, points.tipLeftBottomEnd)
      .curve(points.topCp1, points.rightCp2, points.right)
      .curve(points.rightCp1, points.bottomCp2, points.bottom)
      .curve(points.bottomCp1, points.leftCp2, points.left)
      .curve(points.leftCp1, points.topCp2, points.tipRightBottomEnd)
      .curve(points.tipRightBottomCp2, points.tipRightBottomCp1, points.tipRightBottomStart)
      .curve(points.tipRightTopCp2, points.tipRightTopCp1, points.tipRightTopStart)
      .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
      .close()

    return part
  },
}

export const step11 = {
  name: 'tutorial.step11',
  from: step10,
  draft: ({ Point, points, paths, macro, complete, snippets, Snippet, part }) => {
    // Complete?
    if (complete) {
      snippets.snapStud = new Snippet('snap-stud', points.snapLeft)
      snippets.snapSocket = new Snippet('snap-socket', points.snapRight).attr('opacity', 0.5)

      paths.bias = paths.seam
        .offset(-5)
        .attr('class', 'various dashed')
        .attr('data-text', 'finishWithBiasTape')
        .attr('data-text-class', 'center fill-various')

      points.title = points.bottom.shift(-90, 45)
      macro('title', {
        at: points.title,
        nr: 1,
        title: 'bib',
      })

      points.scalebox = points.title.shift(-90, 55)
      macro('scalebox', { at: points.scalebox })

      points.logo = new Point(0, 0)
      snippets.logo = new Snippet('logo', points.logo)
    }

    return part
  },
}
