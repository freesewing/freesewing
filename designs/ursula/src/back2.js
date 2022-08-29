export default function (part) {
  const {
    points,
    paths,
    Snippet,
    snippets,
    store,
  } = part.shorthand()

  points.waist2 = points.backWaistBandMid

  points.leg4L = points.backLegOpeningLeft
  points.leg4R = points.leg4L.flipX(points.backWaistMid)

  snippets.waist2 = new Snippet('notch', points.waist2)
  snippets.leg4L = new Snippet('notch', points.leg4L)
  snippets.leg4R = new Snippet('notch', points.leg4R)

  if (store.get('numWaistMarkersFront') < 3) {
    // backWaistBand extends from right to left, so use (0.5 - waistMarkerFrac)
    points.waist1R = paths.backWaistBand.shiftFractionAlong(0.5 - store.get('waistMarkerFrac'))
    points.waist1L = points.waist1R.flipX(points.backWaistMid)

    snippets.waist1L = new Snippet('notch', points.waist1L)
    snippets.waist1R = new Snippet('notch', points.waist1R)
  }

  if (store.get('numLegMarkersFront') + store.get('numLegMarkersGusset') < 2) {
    // draw second marker, on back
    // use (1 - frac) because the path is drawn from gusset to waist
    points.leg2R = paths.backLegOpening.shiftFractionAlong(1 - store.get('legMarker2Frac'))
    points.leg2L = points.leg2R.flipX(points.backWaistMid)

    snippets.leg2L = new Snippet('notch', points.leg2L)
    snippets.leg2R = new Snippet('notch', points.leg2R)
  }

  if (store.get('numLegMarkersFront') + store.get('numLegMarkersGusset') < 3) {
    // draw third marker, on back
    // use (1 - frac) because the path is drawn from gusset to waist
    points.leg3R = paths.backLegOpening.shiftFractionAlong(1 - store.get('legMarker3Frac'))
    points.leg3L = points.leg3R.flipX(points.backWaistMid)

    snippets.leg3L = new Snippet('notch', points.leg3L)
    snippets.leg3R = new Snippet('notch', points.leg3R)
  }

  return part
}
