import { points } from './points.mjs'

export const leg = {
  name: 'lumina.leg',
  from: points,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    paths.front = paths.front.reverse().unhide().addText('front', 'note center').setClass('hidden')
    paths.frontSplit.unhide().addText('front', 'note center').setClass('hidden')
    paths.back.unhide().addText('back', 'note center').setClass('hidden')
    paths.backSplit = paths.backSplit
      .reverse()
      .unhide()
      .addText('back', 'note center')
      .setClass('hidden')

    paths.seam = new Path()
      .move(points.frontSplitHem)
      .join(paths.backSplit)
      .join(paths.backWaistband.reverse())
      .join(paths.back)
      .join(paths.front)
      .join(paths.frontWaistband)
      .join(paths.frontSplit)
      .close()

    // paths.backSplit.addClass('lining').unhide()
    // paths.back.addClass('note').unhide()
    // paths.front.addClass('mark').unhide()
    // paths.frontSplit.addClass('contrast').unhide()
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    snippets.middle = new Snippet('notch', points.frontUpperLeg)
    snippets.front0 = new Snippet('notch', paths.front.shiftFractionAlong(0.5))
    snippets.front1 = new Snippet('notch', paths.frontSplit.shiftFractionAlong(0.2))
    snippets.front2 = new Snippet('notch', paths.frontSplit.shiftFractionAlong(0.4))
    snippets.front3 = new Snippet('notch', paths.frontSplit.shiftFractionAlong(0.6))
    snippets.front4 = new Snippet('notch', paths.frontSplit.shiftFractionAlong(0.8))
    snippets.back0 = new Snippet('notch', paths.back.shiftFractionAlong(0.5))
    snippets.back1 = new Snippet('notch', paths.backSplit.shiftFractionAlong(0.2))
    snippets.back2 = new Snippet('notch', paths.backSplit.shiftFractionAlong(0.4))
    snippets.back3 = new Snippet('notch', paths.backSplit.shiftFractionAlong(0.6))
    snippets.back4 = new Snippet('notch', paths.backSplit.shiftFractionAlong(0.8))

    return part
  },
}
