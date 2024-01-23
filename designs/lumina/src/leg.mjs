import { shape } from './shape.mjs'

export const leg = {
  name: 'lumina.leg',
  from: shape,
  draft: ({ sa, points, Path, paths, Snippet, snippets, macro, store, part }) => {
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

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    store.cutlist.addCut({ cut: 2, from: 'fabric' })
    points.gridAnchor = points.middleUpperLeg.clone()

    points.logo = points.middleUpperLeg.shiftFractionTowards(points.frontSplitUpperLeg, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    points.title = points.middleUpperLeg.shiftFractionTowards(points.backSplitUpperLeg, 0.6)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'leg',
      align: 'center',
    })

    points.scalebox = points.middleUpperLeg.shift(270, 50)
    macro('scalebox', {
      at: points.scalebox,
    })

    snippets.middle = new Snippet('notch', points.frontUpperLeg)
    snippets.front0 = new Snippet('notch', paths.front.shiftFractionAlong(0.5))
    snippets.front1 = new Snippet('notch', paths.frontSplit.shiftFractionAlong(0.2))
    snippets.front2 = new Snippet('notch', paths.frontSplit.shiftFractionAlong(0.4))
    snippets.front3 = new Snippet('notch', paths.frontSplit.shiftFractionAlong(0.6))
    snippets.front4 = new Snippet('notch', paths.frontSplit.shiftFractionAlong(0.8))
    snippets.back0 = new Snippet('notch', paths.back.shiftFractionAlong(0.5))
    snippets.back1 = new Snippet('notch', paths.backSplit.shiftFractionAlong(0.25))
    snippets.back2 = new Snippet('notch', paths.backSplit.shiftFractionAlong(0.5))
    snippets.back3 = new Snippet('notch', paths.backSplit.shiftFractionAlong(0.75))

    const middleBottom = points.frontSplitHem.shiftFractionTowards(points.backSplitHem, 0.5)
    middleBottom.x = 0
    const top = paths.seam.edge('top')
    top.x = 0
    const back = paths.seam.edge('right')
    const front = paths.seam.edge('left')

    if (!points.frontSplitWaistband.sitsRoughlyOn(front)) {
      macro('hd', {
        id: 'middleToFront',
        from: front,
        to: points.middleUpperLeg,
        y: top.y - sa - 35,
      })
    }
    if (!points.backSplitWaistband.sitsRoughlyOn(back)) {
      macro('hd', {
        id: 'middleToBack',
        from: points.middleUpperLeg,
        to: back,
        y: top.y - sa - 35,
      })
    }
    macro('hd', {
      id: 'middleToFrontSplitWaistband',
      from: points.frontSplitWaistband,
      to: points.middleUpperLeg,
      y: top.y - sa - 25,
    })
    macro('hd', {
      id: 'middleToBackSplitWaistband',
      from: points.middleUpperLeg,
      to: points.backSplitWaistband,
      y: top.y - sa - 25,
    })
    macro('hd', {
      id: 'middleToFrontWaistband',
      from: points.frontWaistband,
      to: points.middleUpperLeg,
      y: top.y - sa - 15,
    })
    macro('hd', {
      id: 'middleToBackWaistband',
      from: points.middleUpperLeg,
      to: points.backWaistband,
      y: top.y - sa - 15,
    })
    macro('hd', {
      id: 'bottomFront',
      from: points.frontSplitHem,
      to: middleBottom,
      y: middleBottom.y + sa + 15,
    })
    macro('hd', {
      id: 'bottomBack',
      from: middleBottom,
      to: points.backSplitHem,
      y: middleBottom.y + sa + 15,
    })

    macro('vd', {
      id: 'middle',
      from: points.middleUpperLeg,
      to: middleBottom,
      x: 0,
    })
    macro('vd', {
      id: 'front',
      from: points.frontWaistband,
      to: points.middleUpperLeg,
      x: -15,
    })
    macro('vd', {
      id: 'back',
      from: points.backWaistband,
      to: points.middleUpperLeg,
      x: 15,
    })
    macro('vd', {
      id: 'frontSplit',
      from: points.frontSplitWaistband,
      to: points.frontSplitHem,
      x: front.x - sa - 15,
    })
    macro('vd', {
      id: 'backSplit',
      from: points.backSplitWaistband,
      to: points.backSplitHem,
      x: back.x + sa + 15,
    })

    return part
  },
}
