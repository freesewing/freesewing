export default function (part, demo = false) {
  const { Point, points, store, options } = part.shorthand()

  if (options.only === 'circles' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    y += w / 8 + 5
    for (let i = 1; i < 6; i++) {
      points[`circles1-${i}`] = new Point(w / 3 - w / 6, y)
        .attr('data-circle', i * (w / 50))
        .attr('data-circle-class', store.get('colors')[i])
      points[`circles2-${i}`] = new Point((w / 3) * 2 - w / 6, y)
        .attr('data-circle', i * (w / 50))
        .attr(
          'data-circle-class',
          'fabric ' + store.get('styles')[i] + ' ' + store.get('colors')[i]
        )
      points[`circles3-${i}`] = new Point(w - w / 6, y)
        .attr('data-circle', i * (w / 50))
        .attr(
          'data-circle-class',
          'fabric ' +
            store.get('widths')[i] +
            ' ' +
            store.get('styles')[i] +
            ' ' +
            store.get('colors')[i]
        )
    }
    y += w / 8
    store.set('y', y)
  }

  return part
}
