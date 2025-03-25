// import { front as brianFront } from '@freesewing/brian'
import { front } from './front.mjs'

export const frontSidePanel = {
  name: 'devon.frontSidePanel',
  from: front,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    // Parameters
  },
  draft: ({ points, Path, paths, macro, store, options, part }) => {
    macro('rmcutonfold')
    for (const i in paths) {
      if (['frontSidePanelArmhole'].indexOf(i) === -1) delete paths[i]
    }

    const upShift = store.get('frontSidePanelUpshift')
    const sidePanelLength = store.get('sidePanelLength')
    const useFBA = store.get('useFBA')
    let angleFBA = 0

    console.log({ upShift: upShift })

    points.frontYokeSidePanelCP1 = points.frontYokeSidePanel.shift(
      0,
      points.frontYokeSidePanel.dist(points.frontArmholeYoke) * 0.5
    )
    if (useFBA) {
      points.frontYokeSidePanelCp2 = points.frontYokeSidePanel.shiftFractionTowards(
        points.frontSidePanelBustPoint1,
        1.1
      )
      points.frontHemSidePanelCp1 = points.frontHemSidePanelSaved.shiftFractionTowards(
        points.frontSidePanelBustPoint1,
        1.1
      )
      angleFBA =
        points.frontHemSidePanelSaved.angle(
          new Path()
            .move(points.frontHemSidePanelSaved)
            .curve(
              points.frontHemSidePanelCp1,
              points.frontYokeSidePanelCp2,
              points.frontYokeSidePanel
            )
            .shiftAlong(2)
        ) - points.frontHemSidePanel.angle(points.frontYokeSidePanel)

      points.frontHemSidePanelCp2 = points.frontHemSidePanelSaved.shift(
        angleFBA,
        points.frontHemSidePanelSaved.dist(points.hem) * 0.3
      )
    }

    paths.frontSidePanelArmhole = paths.frontSidePanelArmhole.translate(0, upShift)
    points.armhole = points.armhole.translate(0, upShift)
    points.hem = points.hem.translate(0, upShift)
    points.frontArmholeYoke = points.frontArmholeYoke.translate(0, upShift)

    let iter = 0
    let diff = 0
    let angle = 1.5
    do {
      points.frontYokeSidePanel = points.frontYokeSidePanel.rotate(angle, points.hem)
      if (useFBA) {
        diff =
          sidePanelLength -
          new Path()
            .move(points.frontYokeSidePanel)
            .curve(
              points.frontYokeSidePanelCp2,
              points.frontHemSidePanelCp1,
              points.frontHemSidePanelSaved
            )
            .length()
      } else {
        diff = sidePanelLength - points.frontYokeSidePanel.dist(points.frontHemSidePanelSaved)
      }
      if (diff > 0) {
        angle = Math.abs(angle) * -0.7
      } else angle = Math.abs(angle) * 0.6
      console.log({
        iter: iter,
        diff: diff,
        angle: angle,
      })
    } while (iter++ < 100 && (diff > 1 || diff < -1))

    if (useFBA) {
      points.panelPocketTop = new Path()
        .move(points.frontHemSidePanelSaved)
        .curve(points.frontHemSidePanelCp1, points.frontYokeSidePanelCp2, points.frontYokeSidePanel)
        .shiftAlong(options.pocketHeight * sidePanelLength)
        .addCircle(9)
      points.cfPocketBottom = points.cfHem
        .rotate(angleFBA, points.frontHemSidePanelSaved)
        .addCircle(9)
      points.cfPocketTop = points.cfPocketBottom
        .shift(90 + angleFBA, points.cfHem.dist(points.cfYoke) * options.pocketHeight)
        .addCircle(9)

      paths.seam = new Path()
        .move(points.frontHemSidePanelSaved)
        .curve(points.frontHemSidePanelCp2, points.hem, points.hem)
        .line(points.armhole)
        .join(paths.frontSidePanelArmhole)
        .curve(points.frontArmholeYoke, points.frontYokeSidePanelCP1, points.frontYokeSidePanel)
        .curve(
          points.frontYokeSidePanelCp2,
          points.frontHemSidePanelCp1,
          points.frontHemSidePanelSaved
        )
        .close()
        .attr('class', 'fabric')
    } else {
      points.panelPocketTop = points.frontHemSidePanelSaved.shiftFractionTowards(
        points.frontYokeSidePanel,
        options.pocketHeight
      )
      points.cfPocketBottom = points.cfHem.copy()
      points.cfPocketTop = points.cfPocketBottom.shiftFractionTowards(
        points.cfYoke,
        options.pocketHeight
      )

      paths.seam = new Path()
        .move(points.frontHemSidePanelSaved)
        .line(points.hem)
        .line(points.armhole)
        .join(paths.frontSidePanelArmhole)
        .curve(points.frontArmholeYoke, points.frontYokeSidePanelCP1, points.frontYokeSidePanel)
        .line(points.frontHemSidePanelSaved)
        .close()
        .attr('class', 'fabric')
    }
    paths.pocket = new Path()
      .move(points.panelPocketTop)
      .line(points.cfPocketTop)
      .line(points.cfPocketBottom)
      .line(points.frontHemSidePanelSaved)

    return part
  },
}
