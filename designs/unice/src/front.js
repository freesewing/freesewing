export default function (part) {
  const { paths, Path, Point, points, store, complete, macro } = part.shorthand()
  // Complete?
  if (complete) {
    const legOpeningLength =
      store.get('frontLegOpeningLength') +
      store.get('backLegOpeningLength') +
      store.get('gussetSideLength')
    //stores
    store.set('legOpeningLength', legOpeningLength)
    //notches
    points.frontLegNotchLeft = new Path()
      .move(points.frontLegOpeningLeft)
      .curve(points.frontLegOpeningLeftCp1, points.frontGussetLeftCp1, points.frontGussetLeft)
      .shiftAlong(store.get('legOpeningLength') / 4)
    points.frontLegNotchRight = points.frontLegNotchLeft.flipX(points.frontWaistBandMid)

    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'frontWaistBandMid',
        'frontLegOpeningLeft',
        'frontLegOpeningRight',
        'frontLegNotchLeft',
        'frontLegNotchRight',
      ],
    })
  }

  return part
}
