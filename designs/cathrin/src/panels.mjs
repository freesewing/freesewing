import { base } from './base.mjs'

function draftCathrinPanels({ measurements, options, store, points, paths, Point, Path, part }) {
  let count = 1
  let bottom = new Path()
    .move(points.bottomCF)
    .curve(points.bottomCFCp2, points.hipRiseCp1, points.hipRise)
    .curve(points.hipRiseCp2, points.backDropCp1, points.backDrop)
    .attr('class', 'lashed various stroke-xl')
  for (let gap of store.get('gaps')) {
    // Underbust
    points[`underbustGap${count}`] = new Point(store.get('width') * gap, 0)
    points[`underbustGap${count}Right`] = points[`underbustGap${count}`].shift(
      0,
      store.get('bustIntake') * 0.1
    )
    points[`underbustGap${count}Left`] = points[`underbustGap${count}`].shift(
      180,
      store.get('bustIntake') * 0.1
    )
    points[`underbustGap${count}RightCp`] = points[`underbustGap${count}Right`].shift(
      -90,
      measurements.waistToUnderbust * 0.15
    )
    points[`underbustGap${count}LeftCp`] = points[`underbustGap${count}Left`].shift(
      -90,
      measurements.waistToUnderbust * 0.15
    )

    // Waist
    points[`waistGap${count}`] = new Point(store.get('width') * gap, points.waistCF.y)
    points[`waistGap${count}Right`] = points[`waistGap${count}`].shift(
      0,
      store.get('waistIntake') * 0.1
    )
    points[`waistGap${count}Left`] = points[`waistGap${count}`].shift(
      180,
      store.get('waistIntake') * 0.1
    )
    points[`waistGap${count}RightCp1`] = points[`waistGap${count}Right`].shift(
      90,
      measurements.waistToUnderbust * 0.2
    )
    points[`waistGap${count}LeftCp2`] = points[`waistGap${count}Left`].shift(
      90,
      measurements.waistToUnderbust * 0.2
    )
    points[`waistGap${count}RightCp2`] = points[`waistGap${count}Right`].shift(
      -90,
      measurements.waistToHips * 0.2
    )
    points[`waistGap${count}LeftCp1`] = points[`waistGap${count}Left`].shift(
      -90,
      measurements.waistToHips * 0.2
    )

    // Hips
    points[`hipsGap${count}`] = new Point(store.get('width') * gap, points.hipsCF.y)
    points[`hipsGap${count}`] = bottom.intersectsX(points[`waistGap${count}`].x).pop()
    points[`hipsGap${count}Cp`] = points[`hipsGap${count}`].shiftFractionTowards(
      points[`waistGap${count}`],
      0.2
    )

    count++
  }
  // Paths
  paths.panel1 = bottom
    .split(points.hipsGap1)[0]
    .curve(points.hipsGap1Cp, points.waistGap1LeftCp1, points.waistGap1Left)
    .curve(points.waistGap1LeftCp2, points.underbustGap1LeftCp, points.underbustGap1Left)
    .curve(points.frontRiseStartCp2, points.topCFCp1, points.topCF)
    .line(points.bottomCF)
    .close()
    .attr('class', 'fabric')
  paths.panel2 = bottom
    .split(points.hipsGap2)[0]
    .split(points.hipsGap1)[1]
    .curve(points.hipsGap2Cp, points.waistGap2LeftCp1, points.waistGap2Left)
    .curve(points.waistGap2LeftCp2, points.underbustGap2LeftCp, points.underbustGap2Left)
    .line(points.underbustGap1Right)
    .curve(points.underbustGap1RightCp, points.waistGap1RightCp1, points.waistGap1Right)
    .curve(points.waistGap1RightCp2, points.hipsGap1Cp, points.hipsGap1)
    .close()
    .attr('class', 'fabric')
  let panel3 = new Path()
    .move(points.bottomCF)
    .curve(points.bottomCFCp2, points.hipRiseCp1, points.hipRise)
    .split(points.hipsGap2)[1]
  if (options.panels === '11') panel3 = panel3.split(points.hipsGap3)[0]
  paths.panel3 = panel3
    .curve(points.hipsGap3Cp, points.waistGap3LeftCp1, points.waistGap3Left)
    .curve(points.waistGap3LeftCp2, points.underbustGap3LeftCp, points.underbustGap3Left)
    .line(points.underbustGap2Right)
    .curve(points.underbustGap2RightCp, points.waistGap2RightCp1, points.waistGap2Right)
    .curve(points.waistGap2RightCp2, points.hipsGap2Cp, points.hipsGap2)
    .close()
    .attr('class', 'fabric')
  let topBack = new Path()
    .move(points.backRise)
    .curve(points.backRiseCp1, points.topSideCp1, points.topSide)
  points.underbustGap4Left = topBack.intersectsX(points.underbustGap4Left.x).pop()
  paths.panel4 = new Path()
    .move(points.hipRise)
    .curve(points.hipRiseCp2, points.backDropCp1, points.backDrop)
    .split(points.hipsGap4)[0]
    .curve(points.hipsGap4Cp, points.waistGap4LeftCp1, points.waistGap4Left)
    .curve(points.waistGap4LeftCp2, points.underbustGap4LeftCp, points.underbustGap4Left)
    .join(topBack.split(points.underbustGap4Left)[1])
  if (options.panels === '11') paths.panel4.line(points.underbustGap3Right)
  paths.panel4
    .curve(points.underbustGap3RightCp, points.waistGap3RightCp1, points.waistGap3Right)
    .curve(points.waistGap3RightCp2, points.hipsGap3Cp, points.hipsGap3)
  if (options.panels === '11') paths.panel4.line(points.hipRise)
  paths.panel4.close().attr('class', 'fabric')
  points.underbustGap4Right = topBack.intersectsX(points.underbustGap4Right.x).pop()
  points.underbustGap5Left = topBack.intersectsX(points.underbustGap5Left.x).pop()
  let top5 = topBack.split(points.underbustGap5Left)[1].split(points.underbustGap4Right)[0]
  paths.panel5 = bottom
    .split(points.hipsGap5)[0]
    .split(points.hipsGap4)[1]
    .curve(points.hipsGap5Cp, points.waistGap5LeftCp1, points.waistGap5Left)
    .curve(points.waistGap5LeftCp2, points.underbustGap5LeftCp, points.underbustGap5Left)
    .curve(top5.ops[1].cp1, top5.ops[1].cp2, top5.ops[1].to)
    .curve(points.underbustGap4RightCp, points.waistGap4RightCp1, points.waistGap4Right)
    .curve(points.waistGap4RightCp2, points.hipsGap4Cp, points.hipsGap4)
    .close()
    .attr('class', 'fabric')
  points.underbustGap5Right = topBack.intersectsX(points.underbustGap5Right.x).pop()
  paths.panel6 = bottom
    .split(points.hipsGap5)[1]
    .line(points.backRise)
    .join(topBack.split(points.underbustGap5Right)[0])
    .curve(points.underbustGap5RightCp, points.waistGap5RightCp1, points.waistGap5Right)
    .curve(points.waistGap5RightCp2, points.hipsGap5Cp, points.hipsGap5)
    .close()
    .attr('class', 'fabric')

  paths.outline.hide()

  return part
}

export const panels = {
  name: 'cathrin.panels',
  from: base,
  hide: { self: true },
  draft: draftCathrinPanels,
}
