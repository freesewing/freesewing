export default function (part) {
  const {
    points,
    paths,
    Snippet,
    snippets,
    store,
  } = part.shorthand()

  // draw markers to indicate elastic distribution
  points.waist0 = points.frontWaistBandMid

  points.leg0L = points.frontLegOpeningLeft
  points.leg0R = points.leg0L.flipX(points.frontWaistMid)

  snippets.waist0 = new Snippet('notch', points.waist0)
  snippets.leg0L = new Snippet('notch', points.leg0L)
  snippets.leg0R = new Snippet('notch', points.leg0R)

  if (store.get('numWaistMarkersFront') > 1) {
    // frontWaistBandLength extends from right to left, so use (0.5 - waistMarkerFrac)
    points.waist1R = paths.frontWaistBand.shiftFractionAlong(0.5 - store.get('waistMarkerFrac'))
    points.waist1L = points.waist1R.flipX(points.frontWaistMid)

    snippets.waist1L = new Snippet('notch', points.waist1L)
    snippets.waist1R = new Snippet('notch', points.waist1R)
  }

  if (store.get('numLegMarkersFront') > 0) {
    // use (1 - frac) because the path is drawn from gusset to side seam
    points.leg1L = paths.frontLegOpening.shiftFractionAlong(1 - store.get('legMarker1Frac'))
    points.leg1R = points.leg1L.flipX(points.frontWaistMid)

    snippets.leg1L = new Snippet('notch', points.leg1L)
    snippets.leg1R = new Snippet('notch', points.leg1R)
  }

  if (store.get('numLegMarkersFront') > 1) {
    // use (1 - frac) because the path is drawn from gusset to side seam
    points.leg2L = paths.frontLegOpening.shiftFractionAlong(1 - store.get('legMarker2Frac'))
    points.leg2R = points.leg2L.flipX(points.frontWaistMid)

    snippets.leg2L = new Snippet('notch', points.leg2L)
    snippets.leg2R = new Snippet('notch', points.leg2R)
  }

  return part
}
