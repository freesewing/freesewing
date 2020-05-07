export default function (part) {
  let { Point, points, Path, paths, measurements, options } = part.shorthand();
  const inch = 25.4;
  let topToBust = measurements.highBust / 4 - inch;

  // Design pattern here

  // Points
  points.nine = new Point(0, 0);  // origin
  points.one = points.nine.translate(-(measurements.highBust / 4 + inch / 2), measurements.naturalWaistToUnderarm-inch/2);
  points.four = points.one.shift(0, measurements.naturalWaist / 4 + inch / 8);
  points.eight = points.one.shift(0, measurements.bustSpan / 2);
  points.eightL = points.eight.shift(180, options.waistdartwidth  / 2);
  points.eightR = points.eight.shift(0,options.waistdartwidth/2);
  points.zero = points.one.shift(90, measurements.topToWaist); // reduntant in neck line
  points.two = points.zero.shift(-90, measurements.topToWaist - topToBust);
  points.seven = points.eight.shift(90,points.two.dy(points.eight) +options.waistdartlength);
  //points.eleven = points.zero.shift(-90, 2.5 * inch);   // reduntant in neck line

  // Path
  paths.seam = new Path()
    .move(points.neckbottom)
    .line(points.one)
    .line(points.eightL)
    .line(points.seven)
    .line(points.eightR)
    .line(points.four)
    .line(points.nine)
  paths.frontwithdart = new Path()
  .move(points.neckbottom)
  .line(points.one);
  
  if (options.frontdart === 'yes')
  paths.seam.setRender(false);

  

  // Complete?
  if (complete) {
    if (sa) {
    }
    // Paperless?
    if (paperless) {
    }
  }
  return part;
}