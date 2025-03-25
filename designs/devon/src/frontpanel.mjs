// import { front as brianFront } from '@freesewing/brian'
import { front } from './front.mjs'

export const frontPanel = {
  name: 'devon.frontPanel',
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
  draft: ({ points, Path, paths, macro, options, part }) => {
    macro('rmcutonfold')
    for (const i in paths) {
      delete paths[i]
    }

    points.panelPocketTop = points.frontHemSidePanel.shiftFractionTowards(
      points.frontYokeSidePanel,
      options.pocketHeight
    )
    points.cfPocketBottom = points.cfHem.copy()
    points.cfPocketTop = points.cfPocketBottom.shiftFractionTowards(
      points.cfYoke,
      options.pocketHeight
    )

    macro('mirror', {
      clone: true,
      mirror: [points.frontHemSidePanel, points.frontYokeSidePanel],
      points: ['cfPocketBottom', 'cfPocketTop'],
    })

    paths.pocket = new Path()
      .move(points.panelPocketTop)
      .line(points.mirroredCfPocketTop)
      .line(points.mirroredCfPocketBottom)
      .line(points.frontHemSidePanel)

    paths.seam = new Path()
      .move(points.frontHemSidePanel)
      .line(points.frontHemPanel)
      .line(points.frontYokePanel)
      .line(points.frontYokeSidePanel)
      .line(points.frontHemSidePanel)
      .close()
      .attr('class', 'fabric')

    return part
  },
}
