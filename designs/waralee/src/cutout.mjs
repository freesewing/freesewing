import { pantsProto } from './pantsproto.mjs'

export const cutout = {
  name: 'waralee.cutout',
  from: pantsProto,
  draft: ({ options, Path, points, paths, Snippet, snippets, sa, macro, expand, part }) => {
    if (expand) {
      return part.hide()
    }

    const separateWaistband = options.separateWaistband || 'waistband' == options.frontPocketStyle

    paths.seam = new Path()
      .move(points.mWaist1)
      .line(points.mWaist2)
      .line(separateWaistband ? points.bWaistSideSeam : points.bWaistSide)
      .join(paths.backTopCutOut)
      .join(paths.backBottomCutOut)
      .join(paths.frontBottomCutOut)
      .join(paths.frontTopCutOut)
      .close()
      .attr('class', 'fabric')

    // paths.cutout.hide()

    points.title = points.mWaist.shift(270, 75)
    macro('title', {
      nr: 2,
      at: points.title,
      title: 'cutOut',
    })

    points.logo = points.title.shift(270, 75)

    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      paths.seamAlternate = new Path()
        .move(separateWaistband ? points.bWaistSideSeam : points.bWaistSide)
        .join(paths.backTopCutOut)
        .join(paths.backBottomCutOut)
        .join(paths.frontBottomCutOut)
        .join(paths.frontTopCutOut)

      paths.sa = paths.seamAlternate.offset(sa).attr('class', 'fabric sa')
    }

    macro('hd', {
      id: 1,
      from: points.fWaistSide,
      to: points.mWaist,
      y: (separateWaistband ? points.fWaistSideCp2 : points.mWaist).y,
    })
    macro('hd', {
      id: 2,
      from: points.mWaist,
      to: points.bWaistSide,
      y: (separateWaistband ? points.fWaistSideCp2 : points.mWaist).y,
    })
    macro('vd', {
      id: 3,
      from: points.mWaist1,
      to: points.mHip,
      x: points.mWaist.x,
    })
    macro('vd', {
      id: 4,
      from: points.mWaist2,
      to: points.mWaist1,
      x: points.mWaist.x + 15,
    })

    return part
  },
}
