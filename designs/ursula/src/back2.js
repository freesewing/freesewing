export default function (part) {
  const {
    points,
    paths,
    Snippet,
    snippets,
    store,
  } = part.shorthand()

  // draw markers to indicate elastic distribution

  //-----
  // Back Waistband
  // (There are either 1 or 3 markers on the back waistband.)

  // There is always one marker on mid-waist.
  points.waist2 = points.backWaistBandMid
  snippets.waist2 = new Snippet('notch', points.waist2)

  // If there are less than 3 markers on the front, that means that
  // there are 3 on the back. Draw 2 more markers.
  if (store.get('numWaistMarkersFront') < 3) {
    // backWaistBand extends from right to left, so use (0.5 - waistMarkerFrac)
    points.waist1R = paths.backWaistBand.shiftFractionAlong(0.5 - store.get('waistMarkerFrac'))
    points.waist1L = points.waist1R.flipX(points.backWaistMid)

    snippets.waist1L = new Snippet('notch', points.waist1L)
    snippets.waist1R = new Snippet('notch', points.waist1R)
  }

  //-----
  // Back Leg opeining
  // There are either 1, 2, or 3 markers on each leg opening.

  // There is always 1 marker at the start of each opening.
  points.leg4L = points.backLegOpeningLeft
  points.leg4R = points.leg4L.flipX(points.backWaistMid)
  snippets.leg4L = new Snippet('notch', points.leg4L)
  snippets.leg4R = new Snippet('notch', points.leg4R)

  // Now, there are either 1 or 2 additional markers on each leg.

  const numberOfMarkersOnFrontAndGusset =
    store.get('numLegMarkersFront') + store.get('numLegMarkersGusset');

  if (numberOfMarkersOnFrontAndGusset < 2) {
    // draw second marker, on back
    // use (1 - frac) because the path is drawn from gusset to waist
    points.leg2R = paths.backLegOpening.shiftFractionAlong(1 - store.get('legMarker2Frac'))
    points.leg2L = points.leg2R.flipX(points.backWaistMid)

    snippets.leg2L = new Snippet('notch', points.leg2L)
    snippets.leg2R = new Snippet('notch', points.leg2R)
  }

  if (numberOfMarkersOnFrontAndGusset < 3) {
    // draw third marker, on back
    // use (1 - frac) because the path is drawn from gusset to waist
    points.leg3R = paths.backLegOpening.shiftFractionAlong(1 - store.get('legMarker3Frac'))
    points.leg3L = points.leg3R.flipX(points.backWaistMid)

    snippets.leg3L = new Snippet('notch', points.leg3L)
    snippets.leg3R = new Snippet('notch', points.leg3R)
  }

  return part
}
