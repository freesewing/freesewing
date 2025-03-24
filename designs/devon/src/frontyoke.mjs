// import { front as brianFront } from '@freesewing/brian'
import { front } from './front.mjs'

export const frontYoke = {
  name: 'devon.frontYoke',
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
  draft: ({ points, Path, paths, macro, part }) => {
    macro('rmcutonfold')
    for (const i in paths) {
      if (['frontArmholeComplete', 'frontCollar'].indexOf(i) === -1) delete paths[i]
    }
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    paths.frontYokeSeam = new Path()
      .move(points.cfYoke)
      .line(points.frontArmholeYoke)
      .attr('class', 'fabric')

    paths.frontYokeArmhole = paths.frontArmholeComplete.split(points.frontArmholeYoke)[1].hide()

    paths.seam = new Path()
      .move(points.frontArmholeYoke)
      .join(paths.frontYokeArmhole)
      .line(points.s3CollarSplit)
      .join(paths.frontCollar)
      .join(paths.frontYokeSeam)
      .close()
      .attr('class', 'fabric')

    return part
  },
}
