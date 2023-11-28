import { shape } from './shape.mjs'

export const leg = {
  name: 'lumira.leg',
  from: shape,
  draft: ({ store, sa, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    if (options.frontBulge || options.cyclingChamois) {
      snippets.front = new Snippet('notch', paths.front.shiftFractionAlong(0.5))
    }

    paths.front = new Path()
      .move(points.frontWaistband)
      .join(paths.front)
      ._curve(points.frontKneeCp2, points.frontKnee)
      .curve_(points.frontKneeCp1, points.frontAnkle)
      .hide()
    paths.back = new Path()
      .move(points.backWaistband)
      .join(paths.back)
      .join(paths.backCircle)
      .join(paths.backGusset)
      ._curve(points.backKneeCp2, points.backKnee)
      .curve_(points.backKneeCp1, points.backAnkle)
      .hide()

    paths.seam = new Path()
      .move(points.backWaistband)
      .join(paths.back)
      .join(paths.ankle)
      .join(paths.front.reverse())
      .join(paths.waist)
      .close()

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    macro('grainline', {
      from: points.centerHips,
      to: points.centerKnee,
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

    snippets.circle1 = new Snippet('notch', paths.backCircle.shiftFractionAlong(0.25))
    snippets.circle2 = new Snippet('notch', paths.backCircle.shiftFractionAlong(0.5))
    snippets.circle3 = new Snippet('notch', paths.backCircle.shiftFractionAlong(0.75))
    snippets.circle4 = new Snippet('notch', points.backHips)
    snippets.circle5 = new Snippet('notch', points.backCircleGusset)
    snippets.circle6 = new Snippet('notch', points.frontGusset)

    return part
  },
}
