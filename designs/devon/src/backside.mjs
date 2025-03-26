import { back } from './back.mjs'

export const backSide = {
  name: 'devon.backSide',
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
      if (['backArmholeComplete'].indexOf(i) === -1) delete paths[i]
    }

    // paths.backSideSeam = new Path()
    //   .move(points.cbYoke)
    //   .line(points.backArmholeYoke)
    //   .attr('class', 'fabric')

    paths.backYokeArmhole = paths.backArmholeComplete.split(points.backArmholeYoke)[0].hide()

    paths.seam = new Path()
      .move(points.backArmholeYoke)
      .line(points.backYokePanel)
      .line(points.backHemPanel)
      .line(points.hem)
      .join(paths.backYokeArmhole)
      .close()
      .attr('class', 'fabric')

    points.title = points.backArmholeYoke.shiftFractionTowards(points.hem, 0.2)
    macro('title', { nr: 2, title: 'backSide', at: points.title })

    return part
  },
}
