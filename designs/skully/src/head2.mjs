import { cheek } from './cheek.mjs'
import { head1 } from './head1.mjs'

export const head2 = {
  name: 'skully.head2',
  after: [cheek, head1],
  draft: ({ Point, Path, points, paths, sa, complete, log, store, macro, part }) => {
    const textAttribute = 'text-xs center'
    const sizeFactor = store.get('sizeFactor')

    points.point0 = new Point(0, 0)
    points.point0Cp2 = points.point0.shift(0, 15 * sizeFactor)
    points.point1 = points.point0.shift(257.7901473243395, 66.12988849226953 * sizeFactor)
    points.point1Cp1 = points.point1.shift(270, 30.242724116719366 * sizeFactor)
    points.point1Cp2 = points.point1.shift(90, 18.83053830882166 * sizeFactor)
    points.point2 = points.point0.shift(272.3327760921532, 153.20596573567235 * sizeFactor)
    points.point3 = points.point0.shift(282.5001868336755, 164.15422647315543 * sizeFactor)
    points.point3Cp1 = points.point3.shift(81.44269285511335, 54.758598457228615 * sizeFactor)
    points.point4 = points.point0.shift(340.927384878832, 52.16879559660159 * sizeFactor)
    points.point4Cp2 = points.point4.shift(274.04106104609286, 50.57373626695976 * sizeFactor)

    const secondSeam = store.get('secondSeam')

    let iterations = 0
    var p
    do {
      iterations++

      p = new Path()
        .move(points.point0)
        ._curve(points.point1Cp2, points.point1)
        .curve_(points.point1Cp1, points.point2)

      if (secondSeam - p.length() > 0.1 || secondSeam - p.length() < -0.1) {
        points.point0 = points.point0.shift(90, secondSeam - p.length())
        points.point1 = points.point1.shift(90, secondSeam - p.length())
        points.point1Cp1 = points.point1.shift(270, 30.242724116719366 * sizeFactor)
        points.point1Cp2 = points.point1.shift(90, 18.83053830882166 * sizeFactor)
        points.point0Cp2 = points.point0.shift(0, 15 * sizeFactor)
      }
    } while (iterations < 100 && (secondSeam - p.length() > 1 || secondSeam - p.length() < -1))
    if (iterations >= 100) {
      log.error('Generating head2 could not be made to fit in 100 iterations!')
    }

    points.dartPoint0 = new Path()
      .move(points.point3)
      .curve(points.point3Cp1, points.point4Cp2, points.point4)
      .shiftAlong(99.23273836900117 * sizeFactor)
    points.dartPoint1 = points.point0.shift(285.96197961706986, 65.4910471438654 * sizeFactor)
    points.dartPoint1Cp1 = points.dartPoint1.shift(
      354.74216521134053,
      13.662486193954589 * sizeFactor
    )
    points.dartPoint1Cp2 = points.dartPoint1.shift(
      356.55115250146685,
      13.680777207454268 * sizeFactor
    )
    points.dartPoint2 = new Path()
      .move(points.point3)
      .curve(points.point3Cp1, points.point4Cp2, points.point4)
      .shiftAlong(92.81578231343269 * sizeFactor)

    paths.secondSeam = new Path()
      .move(points.point0)
      ._curve(points.point1Cp2, points.point1)
      .curve_(points.point1Cp1, points.point2)
      .setText(complete ? '17' : '', textAttribute)
      .addClass('hidden')

    paths.thirdSeam = new Path()
      .move(points.point3)
      .curve(points.point3Cp1, points.point4Cp2, points.point4)
      .setText(complete ? '18' : '', textAttribute)
      .addClass('hidden')

    paths.top = new Path()
      .move(points.point4)
      .curve(points.point4, points.point0Cp2, points.point0)
      .setText(complete ? '19' : '', textAttribute)
      .addClass('hidden')

    paths.bottom = new Path()
      .move(points.point2)
      .line(points.point3)
      .setText(complete ? '21' : '', textAttribute)
      .addClass('hidden')

    store.set('thirdSeam', paths.thirdSeam.length() - points.dartPoint0.dist(points.dartPoint2))
    store.set('head2width', points.point2.dist(points.point3))
    paths.dart = new Path()
      .move(points.dartPoint0)
      ._curve(points.dartPoint1Cp2, points.dartPoint1)
      .curve_(points.dartPoint1Cp1, points.dartPoint2)

    paths.seam = new Path()
      .move(points.point0)
      .join(paths.secondSeam)
      .join(paths.bottom)
      .join(paths.thirdSeam)
      .join(paths.top)
      .close()

    store.cutlist.addCut({ cut: 2, from: 'Fabric' })

    points.gridAnchor = points.dartPoint1.clone()
    points.title = points.dartPoint1.shiftFractionTowards(points.point2, 0.35)
    macro('title', {
      nr: 4,
      at: points.title,
      scale: 0.5,
      title: 'head' + '2',
    })
    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    points.pointX = paths.seam.edge('right')

    macro('hd', {
      from: points.point0,
      to: points.point4,
      y: points.point0.y - sa - 15,
      id: 'topWidth',
    })
    macro('hd', {
      from: points.point0,
      to: points.pointX,
      y: points.point0.y - sa - 25,
      id: 'topToRight',
    })
    macro('hd', {
      from: points.point1,
      to: points.pointX,
      y: points.point0.y - sa - 35,
      id: 'totalWidth',
    })
    macro('hd', {
      from: points.point3,
      to: points.pointX,
      y: points.point3.y + sa + 15,
      id: 'bottomRightToRight',
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('hd', {
      from: points.point2,
      to: points.point3,
      y: points.point3.y + sa + 15,
      id: 'bottomWidth',
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('hd', {
      from: points.point1,
      to: points.point2,
      y: points.point3.y + sa + 15,
      id: 'leftToBottomLeft',
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('hd', {
      from: points.point0,
      to: points.dartPoint1,
      y: points.dartPoint1.y,
      id: 'leftTopToDartPoint',
      noStartMarker: true,
      noEndMarker: true,
    })

    macro('vd', {
      from: points.point1,
      to: points.point0,
      x: points.point1.x - sa - 15,
      id: 'leftToTop',
    })
    macro('vd', {
      from: points.point2,
      to: points.point1,
      x: points.point1.x - sa - 15,
      id: 'leftToBottomLeft',
    })
    macro('vd', {
      from: points.point3,
      to: points.point1,
      x: points.point1.x - sa - 25,
      id: 'leftToBottomRight',
    })
    macro('vd', {
      from: points.point0,
      to: points.point4,
      x: points.point4.x + sa + 15,
      id: 'topRightToTopLeft',
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('vd', {
      from: points.point4,
      to: points.dartPoint0,
      x: points.point4.x + sa + 15,
      id: 'topDartToTopRight',
    })
    macro('vd', {
      from: points.point4,
      to: points.dartPoint2,
      x: points.point4.x + sa + 25,
      id: 'bottomDartToTopRight',
    })
    macro('vd', {
      from: points.dartPoint2,
      to: points.point3,
      x: points.point4.x + sa + 25,
      id: 'bottomRightToBottomDart',
    })
    macro('vd', {
      from: points.point0,
      to: points.dartPoint1,
      x: points.dartPoint1.x,
      id: 'dartPointToTopLeft',
    })

    return part
  },
}
