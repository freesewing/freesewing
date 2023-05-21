import { pluginBundle } from '@freesewing/plugin-bundle'

function draftHolmesEar({
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  complete,
  sa,
  snippets,
  Snippet,
  paperless,
  macro,
  absoluteOptions,
  store,
  part,
}) {
  // Design pattern here
  let headCircumference = measurements.head + absoluteOptions.headEase
  let earFlapLength = ((options.lengthRatio * headCircumference) / 2) * options.earLength
  let earFlapWidth = (headCircumference / 12) * options.earWidth
  points.top = new Point(0, 0)
  points.bottom = new Point(earFlapWidth, earFlapLength)
  points.topC = points.top.shift(0, points.bottom.x)
  points.topCFlipped = points.topC.flipX()
  points.bottomFlipped = points.bottom.flipX()
  points.bottomC = points.bottom.shift(90, points.bottom.y - points.bottom.x)
  points.bottomCFlipped = points.bottomC.flipX()
  paths.saBase = new Path()
    .move(points.bottom)
    .curve(points.bottomC, points.topC, points.top)
    .curve(points.topCFlipped, points.bottomCFlipped, points.bottomFlipped)
    .hide()
  paths.hemBase = new Path().move(points.bottomFlipped).line(points.bottom).hide()
  paths.seam = paths.saBase.join(paths.hemBase).close()

  macro('grainline', { from: points.top, to: new Point(0, points.bottom.y) })

  store.cutlist.addCut({ cut: 4 })

  // Complete?
  if (complete) {
    points.logo = new Point(-0.5 * points.bottom.x, 0.75 * points.bottom.y)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.7)
    points.title = new Point(0.3 * points.bottom.x, 0.75 * points.bottom.y)
    macro('title', { at: points.title, nr: 3, title: 'ear flap', scale: 0.5 })
    macro('miniscale', { at: new Point(0, points.bottom.y * 0.3) })
    if (options.buttonhole) {
      let buttonholeDistance = (options.lengthRatio * headCircumference) / 2
      points.buttonhole = new Point(points.top.x, points.bottom.y - buttonholeDistance)
      snippets.buttonhole = new Snippet('buttonhole-start', points.buttonhole).attr('data-scale', 2)
    }
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hemBase.offset(sa * 2))
        .attr('class', 'fabric sa')
        .close()
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.bottomFlipped,
        to: points.bottom,
        y: points.bottom.y + 15 + sa * 2,
      })
      macro('vd', {
        from: points.bottomFlipped,
        to: points.top,
        x: points.bottomFlipped.x - 15 - sa,
      })
      if (options.buttonhole) {
        macro('vd', {
          from: points.buttonhole,
          to: points.bottom,
          x: points.bottom.x + 15 + sa,
        })
      }
    }
  }
  return part
}

export const ear = {
  name: 'holmes.ear',
  measurements: ['head'],
  options: {
    headEase: {
      pct: 3,
      min: 0,
      max: 9,
      snap: {
        metric: [6, 13, 19, 25, 32, 38, 44, 50],
        imperial: [6.35, 12.7, 19.05, 25.4, 31.75, 38.1, 44.45, 50.8],
      },
      toAbs: (pct, { measurements }) => measurements.head * pct,
      menu: 'fit',
    },
    lengthRatio: { pct: 55, min: 40, max: 60, menu: 'style' },
    earLength: { pct: 100, min: 80, max: 150, menu: 'style' },
    earWidth: { pct: 100, min: 80, max: 150, menu: 'style' },
    buttonhole: { bool: false },
  },
  plugins: [pluginBundle],
  draft: draftHolmesEar,
}
