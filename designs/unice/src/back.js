export default function (part) {
  const { Path, Point, points, store, complete, macro } = part.shorthand()
  // Complete?
  if (complete) {
    //notches
    points.backLegNotchLeft = new Path()
      .move(points.backLegOpeningLeft)
      .curve(points.backLegOpeningLeftCp1, points.backGussetLeftCp1, points.backGussetLeft)
      .shiftAlong(store.get('legOpeningLength') / 4)
    points.backLegNotchRight = points.backLegNotchLeft.flipX(points.backWaistBandMid)
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'backWaistBandLeft',
        'backWaistBandMid',
        'backWaistBandRight',
        'backLegOpeningLeft',
        'backLegOpeningRight',
        'backLegNotchLeft',
        'backLegNotchRight',
      ],
    })
  }

  return part
}
