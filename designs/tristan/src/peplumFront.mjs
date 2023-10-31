import { backPoints } from './backpoints.mjs'
import { plugin as ringsectorPlugin } from '@freesewing/plugin-ringsector'

export const CreateShape = ({
  Point,
  points,
  paths,
  options,
  macro,
  sa,
  type,
  store,
  radius,
  width,
  offset,
  ratio,
}) => {
  const double =
    type == options.zipperLocation || (true == options.binding && type == options.bindingLocation)

  macro('ringsector', {
    id: type + 'Peblum',
    center: new Point(0, offset),
    angle: (options.peplumFullness / 2) * ratio * (double ? 0.5 : 1),
    insideRadius: radius,
    outsideRadius: radius + width,
    rotate: false,
  })

  macro('cutOnFold', {
    id: type,
    from: points['__macro_ringsector_' + type + 'Peblum_in2Flipped'],
    to: points['__macro_ringsector_' + type + 'Peblum_ex2Flipped'],
  })

  points[type + 'TitleAnchor'] = points[
    '__macro_ringsector_' + type + 'Peblum_in2FlippedRotated'
  ].shiftFractionTowards(points['__macro_ringsector_' + type + 'Peblum_ex2FlippedRotated'], 0.5)

  macro('title', {
    nr: 10 + ('front' == type ? 0 : 1),
    at: points[type + 'TitleAnchor'],
    id: type + 'Peblum',
    title: type + 'Peblum',
    align: 'center',
    scale: options.peplumSize * 2,
  })

  store.cutlist.addCut({ cut: double ? 2 : 1, from: 'fabric' })

  if (sa)
    paths[type + 'SA'] = paths['__macro_ringsector_' + type + 'Peblum_path']
      .reverse()
      .offset(sa)
      .attr('class', 'fabric sa')

  macro('hd', {
    id: 'topWidth',
    from: points['__macro_ringsector_' + type + 'Peblum_in2Flipped'],
    to: points['__macro_ringsector_' + type + 'Peblum_in1Rotated'],
    y: points['__macro_ringsector_' + type + 'Peblum_in1Rotated'].y - 15 - sa,
  })
  macro('hd', {
    id: 'bottomWidth',
    from: points['__macro_ringsector_' + type + 'Peblum_ex2Flipped'],
    to: points['__macro_ringsector_' + type + 'Peblum_ex1Rotated'],
    y: points['__macro_ringsector_' + type + 'Peblum_ex1Rotated'].y + 15 + sa,
  })
  macro('ld', {
    id: 'width',
    from: points['__macro_ringsector_' + type + 'Peblum_in1Rotated'],
    to: points['__macro_ringsector_' + type + 'Peblum_ex1Rotated'],
    d: 15 + sa,
  })
}

export const peplumFront = {
  name: 'tristan.peplumFront',
  after: backPoints,
  options: {
    // Options
    peplum: { bool: false, menu: 'style' },
    peplumSize: {
      pct: 10,
      min: 5,
      max: 50,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions.peplum === false ? false : 'peplum'),
    },
    peplumFullness: {
      deg: 180,
      min: 180,
      max: 360,
      // eslint-disable-next-line no-unused-vars
      menu: (settings, mergedOptions) => (mergedOptions.peplum === false ? false : 'peplum'),
    },
  },
  plugins: [ringsectorPlugin],
  draft: ({ sa, Point, points, paths, options, macro, store, part }) => {
    if (false == options.peplum) {
      return part.hide()
    }
    const backInsideWaistLength = store.get('backInsideWaistLength')
    const backOutsideWaistLength = store.get('backOutsideWaistLength')
    const frontInsideWaistLength = store.get('frontInsideWaistLength')
    const frontOutsideWaistLength = store.get('frontOutsideWaistLength')
    const length =
      backInsideWaistLength +
      backOutsideWaistLength +
      frontInsideWaistLength +
      frontOutsideWaistLength

    const radius = ((length / Math.PI) * (360 / options.peplumFullness)) / 2
    const width = options.peplumSize * store.get('frontLength')

    const frontLength = frontInsideWaistLength + frontOutsideWaistLength
    const ratio = frontLength / length

    store.set('peblumRadius', radius)
    store.set('peblumWidth', width)
    store.set('peblumratio', ratio)

    CreateShape({
      Point: Point,
      points: points,
      paths: paths,
      options: options,
      macro: macro,
      store: store,
      sa: sa,
      type: 'front',
      radius: radius,
      width: width,
      offset: 0,
      ratio: ratio,
    })

    return part
  },
}
