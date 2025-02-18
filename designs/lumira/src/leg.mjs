import { shape } from './shape.mjs'

export const leg = {
  name: 'lumira.leg',
  from: shape,
  draft: ({ store, sa, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    const backGusset = options.cyclingchamois ? true : options.backgusset

    paths.backAnnotated = paths.backTop.clone().addClass('hidden').unhide()

    if (options.frontbulge || options.cyclingchamois) {
      snippets.front = new Snippet('notch', paths.front.shiftFractionAlong(0.5))
    } else {
      paths.frontAnnotated = paths.frontTop.clone().addClass('hidden').unhide().reverse()
      macro('banner', { path: paths.frontAnnotated, text: '-', id: 'front' })
    }
    macro('banner', { path: paths.backAnnotated, text: '+', id: 'back' })

    paths.front = new Path()
      .move(points.frontWaistband)
      .join(paths.front)
      .join(paths.frontLeg)
      .hide()

    paths.back = new Path().move(points.backWaistband).join(paths.back).join(paths.backLeg).hide()

    paths.seam = new Path()
      .move(points.backWaistband)
      .join(paths.back)
      .join(paths.bottom)
      .join(paths.front.reverse())
      .join(paths.waist)
      .close()

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    macro('grainline', {
      from: points.centerWaistband,
      to: points.centerBottom,
    })

    store.cutlist.addCut({ cut: 2, from: 'fabric' })

    points.gridAnchor = points.centerWaistband.clone()

    points.logo = points.centerUpperLeg.shiftFractionTowards(points.frontWaistband, 0.6)
    snippets.logo = new Snippet('logo', points.logo)

    points.title = points.centerKnee.shiftFractionTowards(points.frontWaistband, 0.5)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'leg',
      align: 'center',
    })

    points.scalebox = points.centerSeat
      .shiftFractionTowards(points.frontWaistband, 0.5)
      .shiftFractionTowards(points.title, 0.5)
    macro('scalebox', {
      at: points.scalebox,
    })

    snippets.circle6 = new Snippet('notch', points.frontGusset)
    snippets.circle7 = new Snippet('notch', points.backGusset)

    if (backGusset) {
      snippets.circle1 = new Snippet('notch', paths.backCircle.shiftFractionAlong(0.25))
      snippets.circle2 = new Snippet('notch', paths.backCircle.shiftFractionAlong(0.5))
      snippets.circle3 = new Snippet('notch', paths.backCircle.shiftFractionAlong(0.75))
      snippets.circle4 = new Snippet('notch', points.backHips)
      snippets.circle5 = new Snippet('notch', points.backCircleGusset)
      const backCircle = paths.backCircle.edge('right')
      macro('hd', {
        id: 'backCircleGusset',
        from: points.backCircleGusset,
        to: points.centerUpperLeg,
        y: points.backCircleGusset.y,
      })
      macro('hd', {
        id: 'backCircle',
        from: backCircle,
        to: points.centerUpperLeg,
        y: backCircle.y,
      })
      macro('vd', {
        id: 'backCircle',
        from: backCircle,
        to: points.backHips,
        x: points.backHips.x - sa - 15,
      })
      macro('vd', {
        id: 'backHips',
        from: points.backHips,
        to: points.backWaistband,
        x: points.backHips.x - sa - 15,
        noStartMarker: true,
        noEndMarker: true,
      })
    } else {
      macro('hd', {
        id: 'backCircleGusset',
        from: points.backGussetJoin,
        to: points.centerUpperLeg,
        y: points.backGussetJoin.y,
      })
    }
    macro('hd', {
      id: 'frontBottom',
      from: points.centerBottom,
      to: points.frontBottom,
      y: points.centerBottom.y + sa + 15,
    })
    macro('hd', {
      id: 'backBottom',
      from: points.backBottom,
      to: points.centerBottom,
      y: points.centerBottom.y + sa + 15,
    })
    macro('hd', {
      id: 'frontGusset',
      from: points.centerBottom,
      to: points.frontGusset,
      y: points.centerBottom.y + sa + 25,
    })
    macro('hd', {
      id: 'backGusset',
      from: points.backGusset,
      to: points.centerBottom,
      y: points.centerBottom.y + sa + 25,
    })
    macro('hd', {
      id: 'frontWaistband',
      from: points.gridAnchor,
      to: points.frontWaistband,
      y: points.backWaistband.y - sa - 15,
    })
    macro('hd', {
      id: 'backWaistband',
      from: points.backWaistband,
      to: points.gridAnchor,
      y: points.backWaistband.y - sa - 15,
    })

    macro('vd', {
      id: 'frontGusset',
      from: points.frontBottom,
      to: points.frontGusset,
      x: points.frontGusset.x + sa + 15,
    })
    macro('vd', {
      id: 'frontWaistband',
      from: points.frontGusset,
      to: points.frontWaistband,
      x: points.frontGusset.x + sa + 15,
    })
    macro('vd', {
      id: 'backGusset',
      from: points.backBottom,
      to: points.backGusset,
      x: points.backGusset.x - sa - 15,
    })
    macro('vd', {
      id: 'backWaistband',
      from: points.backGusset,
      to: points.backWaistband,
      x: points.backGusset.x - sa - 15,
    })

    if (!(options.frontbulge || options.cyclingchamois)) {
      macro('hd', {
        id: 'frontGussetJoin',
        from: points.centerUpperLeg,
        to: points.frontGussetJoin,
        y: points.frontGussetJoin.y,
      })
      macro('vd', {
        id: 'frontGussetJoin',
        from: points.frontGussetJoin,
        to: points.frontWaistband,
        x: points.frontGussetJoin.x + sa + 15,
      })
      macro('vd', {
        id: 'frontGussetJoinToTop',
        from: points.frontGussetJoin,
        to: points.centerWaistband,
        x: points.frontGussetJoin.x + sa + 25,
      })
    }

    return part
  },
}
