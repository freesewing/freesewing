import { points } from './points.mjs'

export const leg = {
  name: 'lumina.leg',
  from: points,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    paths.seam = new Path()
      .move(points.frontSplitHem)
      .join(paths.backSplit.reverse())
      .join(paths.backWaistband.reverse())
      .join(paths.back)
      .join(paths.front.reverse())
      .join(paths.frontWaistband)
      .join(paths.frontSplit)
      .close()

    // paths.backSplit.addClass('lining').unhide()
    // paths.back.addClass('note').unhide()
    // paths.front.addClass('mark').unhide()
    // paths.frontSplit.addClass('contrast').unhide()
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    return part
  },
}
