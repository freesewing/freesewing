export default function(part) {
  let {
    paperless,
    sa,
    store,
    complete,
    points,
    options,
    macro,
    Point,
    paths,
    Path,
    measurements
  } = part.shorthand();

  // Clean up
  delete paths.seam;

  paths.side.render = true;

  if (complete) {
    if (sa) {
    }

    if (paperless) {
    }
  }

  return part;
}
