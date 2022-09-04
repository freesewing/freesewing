export default function (part) {
  const {
    points,
    paths,
    Snippet,
    snippets,
    store,
  } = part.shorthand()

  // draw markers to indicate elastic distribution
  if ((store.get('numLegMarkersFront') < 1) && (store.get('numLegMarkersGusset') > 0)) {
    // draw first marker, on gusset
    // use (1 - frac) because the path is drawn from back to front
    points.leg1L = paths.gussetLegOpening.shiftFractionAlong(1 - store.get('legMarker1Frac'))
    points.leg1R = points.leg1L.flipX(store.get('frontGussetMid'))

    snippets.leg1L = new Snippet('notch', points.leg1L)
    snippets.leg1R = new Snippet('notch', points.leg1R)
  }
  if (
    (store.get('numLegMarkersFront') < 2) &&
    (store.get('numLegMarkersFront') + store.get('numLegMarkersGusset') > 1)
  ) {
    // draw second marker, on gusset
    // use (1 - frac) because the path is drawn from back to front
    points.leg2L = paths.gussetLegOpening.shiftFractionAlong(1 - store.get('legMarker2Frac'))
    points.leg2R = points.leg2L.flipX(store.get('frontGussetMid'))

    snippets.leg2L = new Snippet('notch', points.leg2L)
    snippets.leg2R = new Snippet('notch', points.leg2R)
  }
  if (
    (store.get('numLegMarkersFront') < 3) &&
    (store.get('numLegMarkersFront') + store.get('numLegMarkersGusset') > 3)
  ) {
    // draw third marker, on gusset
    // use (1 - frac) because the path is drawn from back to front
    points.leg3L = paths.gussetLegOpening.shiftFractionAlong(1 - store.get('legMarker3Frac'))
    points.leg3R = points.leg3L.flipX(store.get('frontGussetMid'))

    snippets.leg3L = new Snippet('notch', points.leg3L)
    snippets.leg3R = new Snippet('notch', points.leg3R)
  }

  return part
}
