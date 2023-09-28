import { body } from './body.mjs'

export const tail = {
  name: 'hi.tail',
  after: body,
  draft: ({ store, sa, Point, points, Path, paths, Snippet, snippets, macro, part }) => {
    const multiplier = store.get('multiplier')

    const tail01_02d = 192.0129724628 * multiplier
    const tail01_02a = 53.242955551234914
    const tail01_03d = 115.38057785000036 * multiplier
    const tail01_03a = 106.95066736265407
    const tail01_04d = 230.05210782342334 * multiplier
    const tail01_04a = 138.66344842617497
    const tail01_05d = 95.12771141996424 * multiplier
    const tail01_05a = 173.38284569091573
    const tail01cp1d = 156.52907796955816 * multiplier
    const tail01cp2d = 33.33694275124821 * multiplier
    const tail01cp1a = 40.69161792982998
    const tail01cp2a = 150.8191939475001
    const tail02cp1d = 20.1307852802616 * multiplier
    const tail02cp2d = 26.418081118809575 * multiplier
    const tail02cp1a = 129.66709301725697
    const tail02cp2a = 303.9168409570558
    const tail03cp1d = 41.577 * multiplier
    const tail03cp2d = 41.575999999999965 * multiplier
    const tail03cp1a = 180
    const tail03cp2a = -0
    const tail04cp1d = 18.83137554720844 * multiplier
    const tail04cp2d = 18.830271479721173 * multiplier
    const tail04cp1a = 218.47354143777738
    const tail04cp2a = 38.483984913053284
    const tail05cp1d = 38.59528397356339 * multiplier
    const tail05cp2d = 126.7372982195849 * multiplier
    const tail05cp1a = 14.169822482118544
    const tail05cp2a = 128.3396902984

    points.tail01 = new Point(0, 0)
    points.tail02 = points.tail01.shift(tail01_02a, tail01_02d)
    points.tail03 = points.tail01.shift(tail01_03a, tail01_03d)
    points.tail04 = points.tail01.shift(tail01_04a, tail01_04d)
    points.tail05 = points.tail01.shift(tail01_05a, tail01_05d)

    points.tail01cp1 = points.tail01.shift(tail01cp1a, tail01cp1d)
    points.tail01cp2 = points.tail01.shift(tail01cp2a, tail01cp2d)
    points.tail02cp1 = points.tail02.shift(tail02cp1a, tail02cp1d)
    points.tail02cp2 = points.tail02.shift(tail02cp2a, tail02cp2d)
    points.tail03cp1 = points.tail03.shift(tail03cp1a, tail03cp1d)
    points.tail03cp2 = points.tail03.shift(tail03cp2a, tail03cp2d)
    points.tail04cp1 = points.tail04.shift(tail04cp1a, tail04cp1d)
    points.tail04cp2 = points.tail04.shift(tail04cp2a, tail04cp2d)
    points.tail05cp1 = points.tail05.shift(tail05cp1a, tail05cp1d)
    points.tail05cp2 = points.tail05.shift(tail05cp2a, tail05cp2d)

    // Adjust tail opening:
    points.tail05 = points.tail01.shift(points.tail01.angle(points.tail05), store.get('tailWidth'))
    points.tail01cp2 = points.tail01.shift(
      points.tail01.angle(points.tail05) - store.get('tailCpAngle'),
      store.get('tailCpDist')
    )
    points.tail05cp1 = points.tail05.shift(
      points.tail05.angle(points.tail01) + store.get('tailCpAngle'),
      store.get('tailCpDist')
    )

    paths.seam = new Path()
      .move(points.tail01)
      .curve(points.tail01cp1, points.tail02cp2, points.tail02)
      .curve(points.tail02cp1, points.tail03cp2, points.tail03)
      .curve(points.tail03cp1, points.tail04cp2, points.tail04)
      .curve(points.tail04cp1, points.tail05cp2, points.tail05)
      .curve(points.tail05cp1, points.tail01cp2, points.tail01)
      .close()

    store.cutlist.addCut({ material: 'color1UpperBody' })

    points.tailSnippet = new Path()
      .move(points.tail01)
      .curve(points.tail01cp2, points.tail05cp1, points.tail05)
      .shiftFractionAlong(0.25)
    snippets.tail = new Snippet('bnotch', points.tailSnippet)

    paths.body = new Path()
      .move(points.tail05)
      .curve(points.tail05cp1, points.tail01cp2, points.tail01)
      .attr('class', 'hidden')
      .attr('data-text-class', 'text-xs')

    points.titleAnchor = points.tail03.shiftFractionTowards(points.tail01, 0.4)
    points.logoAnchor = points.tail03.shiftFractionTowards(points.tail05, 0.5)
    points.gridAnchor = points.tail03.clone()

    points.tailLeft = new Path()
      .move(points.tail03)
      .curve(points.tail03cp1, points.tail04cp2, points.tail04)
      .curve(points.tail04cp1, points.tail05cp2, points.tail05)
      .edge('left')
    points.tailRight = new Path()
      .move(points.tail01)
      .curve(points.tail01cp1, points.tail02cp2, points.tail02)
      .curve(points.tail02cp1, points.tail03cp2, points.tail03)
      .edge('right')
    points.tailTopLeft = new Path()
      .move(points.tail03)
      .curve(points.tail03cp1, points.tail04cp2, points.tail04)
      .curve(points.tail04cp1, points.tail05cp2, points.tail05)
      .edge('top')
    points.tailTopRight = new Path()
      .move(points.tail01)
      .curve(points.tail01cp1, points.tail02cp2, points.tail02)
      .curve(points.tail02cp1, points.tail03cp2, points.tail03)
      .edge('top')

    snippets.logo = new Snippet('logo', points.logoAnchor).attr(
      'data-scale',
      (multiplier > 1 ? 1 : multiplier) / 2
    )

    macro('title', {
      at: points.titleAnchor,
      nr: 3,
      title: 'tail',
      scale: (multiplier > 1 ? 1 : multiplier) / 2,
    })

    macro('banner', {
      path: paths.body,
      text: 'body',
      id: 'body',
      dy: 0,
      spaces: 10,
      repeat: 3,
    })

    macro('hd', {
      from: points.tailLeft,
      to: points.tail05,
      y: points.tail01.y + sa + 10,
      id: 'leftToBody',
    })
    macro('hd', {
      from: points.tail05,
      to: points.tail01,
      y: points.tail01.y + sa + 10,
      id: 'bodyWidth',
    })
    macro('hd', {
      from: points.tail01,
      to: points.tailRight,
      y: points.tail01.y + sa + 10,
      id: 'bodyToRight',
    })
    macro('hd', {
      from: points.tailLeft,
      to: points.tail03,
      y: points.tailTopRight.y - sa - 10,
      id: 'leftToMid',
    })
    macro('hd', {
      from: points.tail03,
      to: points.tailRight,
      y: points.tailTopRight.y - sa - 10,
      id: 'midToRight',
    })

    macro('vd', {
      from: points.tailTopLeft,
      to: points.tail03,
      x: points.tail03.x - 20,
      id: 'leftToMid',
    })
    macro('vd', {
      from: points.tail05,
      to: points.tailTopLeft,
      x: points.tailLeft.x - sa - 20,
      id: 'heightLeft',
    })
    macro('vd', {
      from: points.tailTopRight,
      to: points.tail01,
      x: points.tailRight.x + sa + 20,
      id: 'heightRight',
    })
    macro('vd', {
      from: points.tail03,
      to: points.tail01,
      x: points.tail01.x + 20,
      id: 'rightToMid',
    })
    macro('vd', {
      from: points.tail05,
      to: points.tail03,
      x: points.tail05.x - 20,
      id: 'leftToMid',
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    return part
  },
}
