import { shape } from './shape.mjs'

export const panel = {
  name: 'lumina.panel',
  from: shape,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, store, part }) => {
    paths.panelWaistband = new Path()
      .move(points.frontPanelWaistband)
      .line(points.backPanelWaistband)
      .setText('top', 'note center')
      .setClass('hidden')
    paths.panelHem = new Path()
      .move(points.backPanelHem)
      .line(points.frontPanelHem)
      .setText('bottom', 'note center')
      .setClass('hidden')
    paths.frontPanel.reverse().setText('front', 'note center').setClass('hidden')
    paths.backPanel = paths.backPanel.unhide().setText('back', 'note center').setClass('hidden')

    paths.seam = new Path()
      .move(points.backPanelHem)
      .join(paths.backPanel.reverse())
      .join(paths.panelWaistband.reverse())
      .join(paths.frontPanel)
      .join(paths.panelHem.reverse())
      .reverse()
      .close()

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    snippets.front1 = new Snippet('notch', paths.frontPanel.shiftFractionAlong(0.2))
    snippets.front2 = new Snippet('notch', paths.frontPanel.shiftFractionAlong(0.4))
    snippets.front3 = new Snippet('notch', paths.frontPanel.shiftFractionAlong(0.6))
    snippets.front4 = new Snippet('notch', paths.frontPanel.shiftFractionAlong(0.8))
    snippets.back1 = new Snippet('notch', paths.backPanel.shiftFractionAlong(0.25))
    snippets.back2 = new Snippet('notch', paths.backPanel.shiftFractionAlong(0.5))
    snippets.back3 = new Snippet('notch', paths.backPanel.shiftFractionAlong(0.75))

    return part
  },
}
