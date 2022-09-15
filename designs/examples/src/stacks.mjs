const stack = (settings, partName) => {
  if (settings?.options?.stackIt === 'Do stack') return 'example'
  else return partName
}

export const stacks_top = {
  name: 'examples.stacks_top',
  stack,
  measurements: ['head'],
  options: {
    size: { pct: 50, min: 5, max: 100, menu: 'stack' },
    x: { pct: 0, min: -100, max: 100, menu: 'stack' },
    y: { pct: 0, min: -100, max: 100, menu: 'stack' },
    stackIt: { dflt: 'Do stack', list: ['Do stack', 'Do not stack'], menu: 'stack' },
  },
  draft: ({ store, Point, points, Path, paths, options, measurements, part }) => {
    store.set('size', measurements.head * options.size)
    store.set('x', measurements.head * options.x)
    store.set('y', measurements.head * options.y)
    points.from = new Point(store.get('x'), store.get('y'))
    points.to = points.from.shift(0, store.get('size'))
    paths.line = new Path().move(points.from).line(points.to).attr('class', 'fabric stroke-4xl')

    return part
  },
}

export const stacks_right = {
  name: 'examples.stacks_right',
  stack,
  after: stacks_top,
  draft: ({ store, Point, points, Path, paths, part }) => {
    points.from = new Point(store.get('x') + store.get('size'), store.get('y'))
    points.to = points.from.shift(-90, store.get('size'))
    paths.line = new Path().move(points.from).line(points.to).attr('class', 'fabric stroke-4xl')

    return part
  },
}

export const stacks_bottom = {
  name: 'examples.stacks_bottom',
  stack,
  after: stacks_top,
  draft: ({ store, Point, points, Path, paths, part }) => {
    points.from = new Point(store.get('x') + store.get('size'), store.get('y') + store.get('size'))
    points.to = points.from.shift(180, store.get('size'))
    paths.line = new Path().move(points.from).line(points.to).attr('class', 'fabric stroke-4xl')

    return part
  },
}

export const stacks_left = {
  name: 'examples.stacks_left',
  stack,
  after: stacks_top,
  draft: ({ store, Point, points, Path, paths, part }) => {
    points.from = new Point(store.get('x'), store.get('y') + store.get('size'))
    points.to = points.from.shift(90, store.get('size'))
    paths.line = new Path().move(points.from).line(points.to).attr('class', 'fabric stroke-4xl')

    return part
  },
}

export const stacks_leftEye = {
  name: 'examples.stacks_leftEye',
  stack,
  after: stacks_top,
  draft: ({ store, Point, points, part }) => {
    points.leftEye = new Point(
      store.get('x') + store.get('size') * 0.35,
      store.get('y') + store.get('size') * 0.4
    )
      .attr('data-circle', store.get('size') * 0.1)
      .attr('data-circle-class', 'stroke-6xl')

    return part
  },
}

export const stacks_rightEye = {
  name: 'examples.stacks_rightEye',
  stack,
  after: stacks_top,
  draft: ({ store, Point, points, part }) => {
    points.rightEye = new Point(
      store.get('x') + store.get('size') * 0.65,
      store.get('y') + store.get('size') * 0.4
    )
      .attr('data-circle', store.get('size') * 0.08)
      .attr('data-circle-class', 'stroke-7xl')

    return part
  },
}

export const stacks_mouth = {
  name: 'examples.stacks_mouth',
  stack,
  after: stacks_top,
  draft: ({ store, Point, points, paths, Path, part }) => {
    points.left = new Point(
      store.get('x') + store.get('size') * 0.15,
      store.get('y') + store.get('size') * 0.5
    )
    points.right = new Point(
      store.get('x') + store.get('size') * 0.85,
      store.get('y') + store.get('size') * 0.5
    )
    points.leftCp = new Point(
      store.get('x') + store.get('size') * 0.35,
      store.get('y') + store.get('size') * 0.8
    )
    points.rightCp = new Point(
      store.get('x') + store.get('size') * 0.65,
      store.get('y') + store.get('size') * 0.8
    )

    paths.mouth = new Path()
      .move(points.left)
      .curve(points.leftCp, points.rightCp, points.right)
      .attr('class', 'fabric stroke-7xl')

    return part
  },
}
