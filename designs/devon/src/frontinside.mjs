// import { front as brianFront } from '@freesewing/brian'
import { front } from './front.mjs'

export const frontInside = {
  name: 'devon.frontInside',
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
  draft: ({ points, Path, paths, macro, store, part }) => {
    macro('rmcutonfold')
    for (const i in paths) {
      delete paths[i]
    }

    // const panelLength = store.get('panelLength')
    // const frontLength = store.get('frontLength')

    // points.frontHemPanel = points.frontYokePanel.shiftTowards(points.frontHemPanel, panelLength)
    // points.cfHem = points.cfYoke.shiftTowards(points.cfHem, frontLength)

    paths.seam = new Path()
      .move(points.frontHemPanel)
      .line(points.cfHem)
      .line(points.cfYoke)
      .line(points.frontYokePanel)
      .line(points.frontHemPanel)
      .close()
      .attr('class', 'fabric')

    points.title = points.frontYokePanel.shiftFractionTowards(points.cfChest, 0.5)
    macro('title', { nr: 4, title: 'frontInside', at: points.title })

    return part
  },
}
