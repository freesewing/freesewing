import { backPoints } from './backpoints.mjs'
import { plugin as ringsectorPlugin } from '@freesewing/plugin-ringsector'

export const CreateShape = ({
  points,
  paths,
  Path,
  options,
  macro,
  store,
  sa,
  type,
  radius,
  width,
  ratio,
}) => {
  const double =
    type == options.zipperLocation || (true == options.lacing && type == options.lacingLocation)

  const angle = (options.peplumFullness / 2) * ratio * (double ? 0.5 : 1)
  macro('ringsector', {
    id: type + 'Peblum',
    angle: angle,
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

  store.cutlist.addCut({ cut: double ? 2 : 1, from: 'fabric', onFold: true })

  macro('title', {
    nr: 10 + ('front' == type ? 0 : 1),
    at: points[type + 'TitleAnchor'],
    id: type + 'Peplum',
    title: 'tristan:' + type + 'Peplum',
    align: 'center',
    scale: options.peplumSize * 2,
  })

  if (sa) {
    paths[type + 'SA'] = new Path()
      .line(points['__macro_ringsector_' + type + 'Peblum_ex2Flipped'])
      .join(
        new Path()
          .move(points['__macro_ringsector_' + type + 'Peblum_ex2Flipped'])
          .circleSegment(angle, points['__macro_ringsector_' + type + 'Peblum_center'])
          .line(points['__macro_ringsector_' + type + 'Peblum_in2'])
          .circleSegment(-angle, points['__macro_ringsector_' + type + 'Peblum_center'])
          .offset(sa)
      )
      .line(points['__macro_ringsector_' + type + 'Peblum_in2Flipped'])
      .attr('class', 'fabric sa')
  }

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
    peplum: { bool: false, menu: 'options' },
    peplumSize: {
      pct: 10,
      min: 5,
      max: 250,
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
  draft: ({ sa, Point, points, paths, Path, options, macro, store, units, part }) => {
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

    store.set('peplumRadius', radius)
    store.set('peplumWidth', width)
    store.set('peplumratio', ratio)

    store.flag.note({
      msg: `tristan:peplumWidth`,
      replace: {
        peplumWidth: units(width),
      },
    })

    CreateShape({
      Point: Point,
      points: points,
      paths: paths,
      Path: Path,
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
