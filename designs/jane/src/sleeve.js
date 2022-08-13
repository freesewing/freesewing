export default function (part) {
    let {
      options,
      Point,
      Path,
      points,
      paths,
      Snippet,
      snippets,
      complete,
      sa,
      paperless,
      macro,
      measurements,

    } = part.shorthand()
//design pattern here

const sleeveWidth = measurements.biceps * (1 + options.bicepsEase)

const sleeveLength = measurements.shoulderToElbow * options.sleeveBonus

points.sleeveLeft = new Point(0, 0)
points.sleeveRight = new Point(0, sleeveWidth)
points.sleeveBottomLeft = new Point(sleeveLength, 0)
points.sleeveBottomRight = new Point(sleeveLength, sleeveWidth)

paths.sleeve = new Path()
  .move(points.sleeveRight)
  .line(points.sleeveLeft)
  .line(points.sleeveBottomLeft)
  .line(points.sleeveBottomRight)
  .close();



      // Complete?
  if (complete) {


    if (sa) {
      paths.sa = paths.sleeve.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.sleeveLeft,
      to: points.sleeveBottomLeft,
      x: points.sleeveLeft.x + sa + 30
    })

    macro('vd', {
      from: points.sleeveLeft,
      to: points.sleeveRight,
      x: points.sleeveLeft.y + sa + 30
    })

  }

  return part
}
