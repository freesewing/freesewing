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
    backArmholeShift: 0.02,
    // Parameters
  },
  draft: ({ points, Path, paths, options, macro, part }) => {
    macro('rmcutonfold')
    for (const i in paths) {
      if (['backArmholeComplete'].indexOf(i) === -1) delete paths[i]
    }

    const downShift = options.backArmholeShift * points.cbYoke.dist(points.backArmholeYoke)

    paths.backYokeArmhole = paths.backArmholeComplete
      .split(points.backArmholeYoke)[0]
      .translate(0, downShift)
      .hide()

    const trans = ['hem', 'backArmholeYoke']
    for (let p of trans) {
      points[p] = points[p].translate(0, downShift)
    }

    points.backYokePanelCp1 = points.backYokePanel.shift(
      0,
      points.backYokePanel.dist(points.backArmholeYoke) * 0.5
    )
    console.log({ Ppoints: JSON.parse(JSON.stringify(points)) })

    paths.seam = new Path()
      .move(points.backArmholeYoke)
      .curve(points.backArmholeYoke, points.backYokePanelCp1, points.backYokePanel)
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
