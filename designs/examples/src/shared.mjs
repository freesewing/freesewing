/**
 * This draws a (diagonal in a) box
 * with with w and height h with a non-visible line.
 * This is to force our examples parts to a certain size
 */
export function box(part, w = 100, h = 50) {
  part.paths.box = new part.Path()
    .move(new part.Point(0, 0))
    .line(new part.Point(w, h))
    .attr('class', 'hidden')

  return part
}
