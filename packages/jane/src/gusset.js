
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

const fullArmhole = measurements.biceps * (1 + 0.85)
const gussetMeasure = (fullArmhole / 2) * 0.44

points.gussetLeft = new Point(0,0)
points.gussetRight = new Point(0,gussetMeasure)
points.gussetBottomLeft = new Point(gussetMeasure,0)
points.gussetBottomRight = new Point(gussetMeasure,gussetMeasure)

paths.gusset = new Path()
    .move(points.gussetRight)
    .line(points.gussetLeft)
    .line(points.gussetBottomLeft)
    .line(points.gussetBottomRight)
    .close();

      // Complete?
  if (complete) {


    if (sa) {

    }
  }

  // Paperless?
  if (paperless) {

  }

  return part
