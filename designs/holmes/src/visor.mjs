import { pluginBundle } from '@freesewing/plugin-bundle'
import { pctBasedOn } from '@freesewing/core'

function draftHolmesVisor({
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  complete,
  sa,
  paperless,
  macro,
  absoluteOptions,
  store,
  part,
}) {
  let headCircumference = measurements.head + absoluteOptions.headEase
  let headRadius = headCircumference / 2 / Math.PI
  let visorRadius = headRadius / Math.sin((options.visorAngle * Math.PI) / 180)
  let sectorAngle = (Math.PI / 3) * options.visorLength
  let visorSectorAngle = (sectorAngle * headRadius) / visorRadius
  let cpDistance =
    ((4 / 3) * visorRadius * (1 - Math.cos(visorSectorAngle / 2))) / Math.sin(visorSectorAngle / 2)

  points.origin = new Point(0, 0)
  points.in1 = new Point(0, 0)
  points.in2 = points.in1.shift(
    (90 / Math.PI) * visorSectorAngle,
    2 * visorRadius * Math.sin(visorSectorAngle / 2)
  )
  //test circle
  //points.circleCentre = points.in1.shift(90,headRadius)
  //.attr("data-circle",headRadius)
  //points.circle60 = points.circleCentre.shift(-30,headRadius)
  //
  points.in1C = points.in1.shift(0, cpDistance)
  points.in2C = points.in2.shift(180 + (180 / Math.PI) * visorSectorAngle, cpDistance)
  points.in1CFlipped = points.in1C.flipX()
  points.in2Flipped = points.in2.flipX()
  points.in2CFlipped = points.in2C.flipX()

  points.ex1 = points.in1.shift(-90, absoluteOptions.visorWidth)
  points.ex1C = points.ex1.shift(0, 0.5 * points.in2.x)
  points.ex2C = points.in2.shift(
    -90,
    (points.ex1.y - points.in2.y) * (2 / (1 + Math.exp(-absoluteOptions.visorWidth / 15)) - 1)
  )
  points.ex1CFlipped = points.ex1C.flipX()
  points.ex2CFlipped = points.ex2C.flipX()

  paths.saInner = new Path()
    .move(points.in2)
    .curve(points.in2C, points.in1C, points.in1)
    .curve(points.in1CFlipped, points.in2CFlipped, points.in2Flipped)
    .hide()

  paths.saOuter = new Path()
    .move(points.in2Flipped)
    .curve(points.ex2CFlipped, points.ex1CFlipped, points.ex1)
    .curve(points.ex1C, points.ex2C, points.in2)
    .hide()

  paths.seam = paths.saOuter.join(paths.saInner).close()

  macro('grainline', { from: points.in1, to: points.ex1 })

  store.cutlist.addCut({ cut: 4 })
  store.cutlist.addCut({ cut: 2, material: 'insert' })

  // Complete?
  if (complete) {
    macro('title', { at: points.ex1.shift(45, 20), nr: 2, title: 'visor', scale: 0.4 })

    if (sa) {
      points.sa1 = new Point(points.in2.x + sa, paths.saInner.offset(sa * 2).start().y)
      points.sa2 = points.sa1.flipX(points.in1)
      paths.sa = paths.saOuter
        .offset(sa)
        .line(points.sa1)
        .join(paths.saInner.offset(sa * 2))
        .line(points.sa2)
        .close()
        .attr('class', 'fabric sa')
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.in2Flipped,
        to: points.in2,
        y: points.ex1.y + 15 + sa,
      })
      macro('vd', {
        from: points.ex1,
        to: points.in1,
        x: points.in2Flipped.x - 15 - sa,
      })
      macro('vd', {
        from: points.ex1,
        to: points.in2Flipped,
        x: points.in2Flipped.x - 30 - sa,
      })
    }
  }
  return part
}

export const visor = {
  name: 'holmes.visor',
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
    visorAngle: { deg: 45, min: 10, max: 90, menu: 'style' },
    visorWidth: { pct: 5, min: 1, max: 17, snap: 5, ...pctBasedOn('head'), menu: 'style' },
    visorLength: { pct: 100, min: 80, max: 150, menu: 'advanced' },
  },
  plugins: [pluginBundle],
  draft: draftHolmesVisor,
}
