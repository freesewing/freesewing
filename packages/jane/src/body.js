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
  //body
  const lengthBody = (measurements.waistToKnee + measurements.hpsToWaistBack) * (1 + options.shiftLength)
  const workingHip = measurements.hips / 2
  const widthBody = workingHip * (1 + options.bodyEase)

  const maxLength = ( lengthBody > (measurements.waistToFloor + measurements.hpsToWaistBack))
    ? measurements.waistToFloor + measurements.hpsToWaistBack
    : lengthBody

  points.topLeft = new Point(0,0)
  points.topRight = new Point(widthBody, 0)
  points.bottomLeft = new Point(0, lengthBody)
  points.bottomRight = new Point(widthBody, lengthBody)

  points.gorestartLeft = points.bottomLeft.shiftTowards(points.topLeft, lengthBody / 2)
  points.gorestartRight = points.bottomRight.shiftTowards(points.topRight, lengthBody / 2)

  points.middle = points.topLeft.shiftTowards(points.topRight, widthBody / 2)
  points.leftShoulder = points.middle.shiftTowards(points.topLeft, measurements.shoulderToShoulder / 2)
  points.rightShoulder = points.middle.shiftTowards(points.topRight, measurements.shoulderToShoulder / 2)

  paths.sideseam = new Path()
    .move(points.topRight)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .close();

  paths.leftGore = new Path()
    .move(points.leftShoulder)
    .line(points.leftShoulder)
    .line(points.gorestartLeft)
    .close();

  paths.rightGore = new Path()
    .move(points.rightShoulder)
    .line(points.gorestartRight)
    .line(points.rightShoulder)
    .close();


 //neckline

 const neckWidth = measurements.neck * options.neckWidth

 points.neckLeft = points.middle.shiftTowards(points.leftShoulder, neckWidth /2)
 points.neckRight = points.middle.shiftTowards(points.rightShoulder, neckWidth /2)

  const neckDepthFront = measurements.hpsToBust * options.neckDepthFront

  points.middleHem = points.bottomLeft.shiftTowards(points.bottomRight, widthBody /2)

  points.neckFront = points.middle.shiftTowards(points.middleHem, neckDepthFront)

  points.neckCp1 = points.neckRight.shift(90, (points.neckFront.dy(points.neckRight) * 0.8))
  points.neckCp2 = points.neckFront.shift(180, (points.neckFront.dy(points.neckRight) * 0.8))

    paths.neckLine = new Path()
      .move(points.neckRight)
      .curve(points.neckCp1, points.neckCp2, points.neckFront)


  points.neckCp3 = points.neckLeft.shift(90, (points.neckFront.dy(points.neckLeft) * 0.8))
  points.neckCp4 = points.neckFront.shift(360, (points.neckFront.dy(points.neckLeft) * 0.8))

    paths.neckLine2 = new Path()
      .move(points.neckFront)
      .curve(points.neckCp4, points.neckCp3, points.neckLeft)


  const neckDepthBack = measurements.hpsToBust * options.neckDepthBack

  points.neckBack = points.middle.shiftTowards(points.neckFront, neckDepthBack)

  points.neckBackCp1 = points.neckBack.shift(360, (points.neckFront.dy(points.neckLeft) * 0.8))
  points.neckBackCp2 = points.neckBack.shift(180, (points.neckFront.dy(points.neckRight) * 0.8))
  points.neckBackCp3 = points.neckLeft.shift(90, (points.neckBack.dy(points.neckLeft) * 0.8))
  points.neckBackCp4 = points.neckRight.shift(90, (points.neckBack.dy(points.neckRight)* 0.8))

    paths.NecklineBack1 = new Path()
      .move(points.neckRight)
      .curve(points.neckBackCp4, points.neckBackCp2, points.neckBack)

    paths.necklineBack2 = new Path()
      .move(points.neckBack)
      .curve(points.neckBackCp1, points.neckBackCp3, points.neckLeft)




  // Complete?
  if (complete) {


    if (sa) {

    }
  }

  // Paperless?
  if (paperless) {

  }

  return part
}
