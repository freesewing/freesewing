import { plugin as ringsectorPlugin } from '@freesewing/plugin-ringsector'
import { CreateShape, peplumFront } from './peplumFront.mjs'

export const peplumBack = {
  name: 'tristan.peplumBack',
  after: peplumFront,
  plugins: [ringsectorPlugin],
  draft: ({ Point, points, paths, options, store, macro, sa, part }) => {
    if (false == options.peplum) {
      return part.hide()
    }

    const radius = store.get('peblumRadius')
    const width = store.get('peblumWidth')
    const ratio = store.get('peblumratio')

    CreateShape({
      Point: Point,
      points: points,
      paths: paths,
      options: options,
      macro: macro,
      store: store,
      sa: sa,
      type: 'back',
      radius: radius,
      width: width,
      offset: 0,
      ratio: 1 - ratio,
    })

    return part
  },
}
