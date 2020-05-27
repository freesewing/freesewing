export default function (part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();

    // Design pattern here
    points.topLeft = new Point(0, 0);    // origin
    points.topRight = points.topLeft.shift(0, measurements.naturalWaist / 2);
    points.bottomLeft = points.topLeft.shift(-90, options.waistBandWidth);
    points.bottomRight = points.bottomLeft.shift(0, measurements.naturalWaist / 2);

    paths.seam = new Path()
        .move(points.topLeft)
        .line(points.bottomLeft)
        .line(points.bottomRight)
        .line(points.topRight)
        .close();

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