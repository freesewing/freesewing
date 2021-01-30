export default (part) => {

  // Shorthand
  let {
    points,
    Point,
    paths,
    Path,
    measurements,
    options,
    complete,
    paperless,
    store,
    macro,
    utils,
    snippets,
    Snippet,
    sa
  } = part.shorthand()

  macro('ld', {
    from: points.crotchSeamCurveStart,
    to: points.styleWaistIn
  })

  if (complete) {
    if (sa) {
    }

    if (paperless) {
    }
  }

  return part
}
