import { back } from './back.mjs'

export const backYoke = {
  name: 'devon.backYoke',
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
      if (['backArmholeComplete', 'backCollar'].indexOf(i) === -1) delete paths[i]
    }

    paths.backYokeSeam = new Path()
      .move(points.cbYoke)
      .line(points.backArmholeYoke)
      .attr('class', 'fabric')

    paths.backYokeArmhole = paths.backArmholeComplete.split(points.backArmholeYoke)[1].hide()

    paths.seam = new Path()
      .move(points.backArmholeYoke)
      .join(paths.backYokeArmhole)
      .line(points.s3CollarSplit)
      .join(paths.backCollar)
      .join(paths.backYokeSeam)
      .close()
      .attr('class', 'fabric')

    points.title = points.backArmholeYoke.shiftFractionTowards(points.cbNeck, 0.5)
    macro('title', { nr: 3, title: 'backYoke', at: points.title })

    return part
  },
}
