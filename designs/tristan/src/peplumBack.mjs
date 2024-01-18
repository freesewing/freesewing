import { plugin as ringsectorPlugin } from '@freesewing/plugin-ringsector'
import { CreateShape, peplumFront } from './peplumFront.mjs'

export const peplumBack = {
  name: 'tristan.peplumBack',
  after: peplumFront,
  plugins: [ringsectorPlugin],
  draft: ({ points, paths, options, store, macro, sa, part }) => {
    if (false == options.peplum) {
      return part.hide()
    }

    const radius = store.get('peplumRadius')
    const width = store.get('peplumWidth')
    const ratio = store.get('peplumratio')

    CreateShape({
      points: points,
      paths: paths,
      options: options,
      macro: macro,
      store: store,
      sa: sa,
      type: 'back',
      radius: radius,
      width: width,
      ratio: 1 - ratio,
    })

    return part
  },
}
