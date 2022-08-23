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
  // Front Waistband
  // (There are either 1 or 3 markers on the front waistband.)

  // There is always one marker on mid-waist.
  points.waist0 = points.frontWaistBandMid
  snippets.waist0 = new Snippet('notch', points.waist0)

  // If there are 3 total waist markers, draw 2 more.
  if (store.get('numWaistMarkersFront') > 1) {
    // frontWaistBandLength extends from right to left,
    //   so use (0.5 - waistMarkerFrac)
    points.waist1R = paths.frontWaistBand.shiftFractionAlong(0.5 -
      store.get('waistMarkerFrac'))
    points.waist1L = points.waist1R.flipX(points.frontWaistMid)

    snippets.waist1L = new Snippet('notch', points.waist1L)
    snippets.waist1R = new Snippet('notch', points.waist1R)
  }

  //-----
  // Front Leg opeining
  // There are either 1, 2, or 3 markers on each leg opening.

  // There is always 1 marker at the start of each opening.
  points.leg0L = points.frontLegOpeningLeft
  points.leg0R = points.leg0L.flipX(points.frontWaistMid)
  snippets.leg0L = new Snippet('notch', points.leg0L)
  snippets.leg0R = new Snippet('notch', points.leg0R)

  // Now, there are either 1 or 2 additional markers on each leg.
  //
  const numberOfMarkersOnFront = store.get('numLegMarkersFront')

  if (numberOfMarkersOnFront >= 1) {
    // use (1 - frac) because the path is drawn from gusset to side seam
    points.leg1L = paths.frontLegOpening.shiftFractionAlong(1 -
      store.get('legMarker1Frac'))
    points.leg1R = points.leg1L.flipX(points.frontWaistMid)

    snippets.leg1L = new Snippet('notch', points.leg1L)
    snippets.leg1R = new Snippet('notch', points.leg1R)
  }

  if (numberOfMarkersOnFront >= 2) {
    // use (1 - frac) because the path is drawn from gusset to side seam
    points.leg2L = paths.frontLegOpening.shiftFractionAlong(1 -
      store.get('legMarker2Frac'))
    points.leg2R = points.leg2L.flipX(points.frontWaistMid)

    snippets.leg2L = new Snippet('notch', points.leg2L)
    snippets.leg2R = new Snippet('notch', points.leg2R)
  }

  return part
}
