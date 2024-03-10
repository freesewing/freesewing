import { shape } from './shape.mjs'

export const panel = {
  name: 'lumina.panel',
  from: shape,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, macro, store, part }) => {
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

    store.cutlist.addCut({ cut: 2, from: 'fabric' })
    points.gridAnchor = points.middleSeat.clone()

    points.title = points.middleSeat.clone()
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'panel',
      align: 'center',
    })

    const middleTop = points.frontPanelWaistband.shiftFractionTowards(
      points.backPanelWaistband,
      0.5
    )
    const middleBottom = new Point(middleTop.x, points.frontPanelHem.y)
    const back = paths.backPanel.edge('left')
    const front = paths.frontPanel.edge('right')

    macro('hd', {
      id: 'topFront',
      from: middleTop,
      to: points.frontPanelWaistband,
      y: middleTop.y - sa - 15,
    })
    macro('hd', {
      id: 'topBack',
      from: points.backPanelWaistband,
      to: middleTop,
      y: middleTop.y - sa - 15,
    })
    macro('hd', {
      id: 'middleFront',
      from: middleBottom,
      to: front,
      y: middleBottom.y + sa + 25,
    })
    macro('hd', {
      id: 'middleBack',
      from: back,
      to: middleBottom,
      y: middleBottom.y + sa + 25,
    })
    macro('hd', {
      id: 'bottomFront',
      from: middleBottom,
      to: points.frontPanelHem,
      y: middleBottom.y + sa + 15,
    })
    macro('hd', {
      id: 'bottomBack',
      from: points.backPanelHem,
      to: middleBottom,
      y: middleBottom.y + sa + 15,
    })
    macro('vd', {
      id: 'front',
      from: points.frontPanelWaistband,
      to: points.frontPanelHem,
      x: front.x + sa + 15,
    })
    macro('vd', {
      id: 'back',
      from: points.backPanelWaistband,
      to: points.backPanelHem,
      x: back.x - sa - 15,
    })

    return part
  },
}
