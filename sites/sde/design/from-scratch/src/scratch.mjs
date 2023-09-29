function draftScratch({ part, points, Point, paths, Path }) {
  /*
   * Do your magic here
   */

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(200, 0)
  points.bottomRight = new Point(200, 100)
  points.bottomLeft = new Point(0, 100)

  points.mid = points.topLeft
    .shiftFractionTowards(points.bottomRight, 0.5)
    .addText('fromscratch:whatWillYouCreateToday', 'fill-note center')

  paths.box = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('help note')

  return part
}

export const scratch = {
  name: 'fromscratch.front',
  draft: draftScratch,
}
