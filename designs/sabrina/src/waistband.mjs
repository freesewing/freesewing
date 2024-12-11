import { pctBasedOn } from '@freesewing/core'
import { base } from './base.mjs'
import { capitalize } from '@freesewing/core'

function draftWaistband({
  options,
  Point,
  Path,
  points,
  paths,
  sa,
  macro,
  units,
  expand,
  complete,
  absoluteOptions,
  store,
  part,
}) {
  const halfWaist = store.get('waistband') / 2
  const height = absoluteOptions.elasticWidth * (1 + options.waistbandEase)

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `sabrina:cut${capitalize(part.name.split('.')[1])}`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(2 * halfWaist + extraSa),
        l: units(2 * height + extraSa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(height * 2, 0)
  points.topFold = new Point(height, 0)
  points.bottomLeft = new Point(0, halfWaist)
  points.bottomRight = new Point(points.topRight.x, halfWaist)
  points.bottomFold = new Point(points.topFold.x, halfWaist)

  paths.seam = new Path()
    .move(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .close()
    .addClass('fabric')

  if (complete)
    paths.fold = new Path().move(points.topFold).line(points.bottomFold).addClass('various help')

  if (sa) {
    paths.sa = macro('sa', {
      paths: [
        new Path()
          .move(points.topLeft)
          .line(points.bottomLeft)
          .line(points.bottomRight)
          .line(points.topRight),
        null,
      ],
    })
  }
  /*
   * Annotations
   */
  // Title
  points.title = new Point(points.bottomRight.x * 0.45, points.bottomRight.y / 3)

  // Dimensions
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.topRight,
    y: points.topRight.y - sa - 15,
  })

  store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

  macro('title', {
    at: points.title,
    nr: 4,
    scale: height / 45,
    rotation: 90,
    title: 'waistband',
  })

  macro('cutonfold', {
    from: points.topRight,
    to: points.topLeft,
    grainline: true,
    scale: 0.5,
  })

  return part
}

export const waistband = {
  name: 'sabrina.waistband',
  measurements: ['chest'],
  after: base,
  options: {
    elasticWidth: {
      pct: 2,
      min: 0.25,
      max: 8,
      // snap doesn't really work well. This should probably be a mm property.
      // snap: {
      //   metric: 1,
      //   imperial: 1.27,
      // },
      menu: 'construction',
      ...pctBasedOn('chest'),
    },
    waistbandEase: 0.05,
  },
  draft: draftWaistband,
}
