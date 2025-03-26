import { back } from './back.mjs'

export const backPanel = {
  name: 'devon.backPanel',
  from: back,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    // Parameters
  },
  draft: ({ points, Path, paths, macro, part }) => {
    macro('rmcutonfold')
    for (const i in paths) {
      delete paths[i]
    }

    paths.seam = new Path()
      .move(points.backYokePanel)
      .line(points.cbYoke)
      .line(points.cbHem)
      .line(points.backHemPanel)
      .line(points.backYokePanel)
      .close()
      .attr('class', 'fabric')

    points.title = points.backYokePanel.shiftFractionTowards(points.cbChest, 0.5)
    macro('title', { nr: 1, title: 'backPanel', at: points.title })

    return part
  },
}
