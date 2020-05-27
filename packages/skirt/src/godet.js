export default function (part) {
    let { Point, points, Path, paths, options } = part.shorthand();

    // Design pattern here
    points.left = new Point(0, 0);  // origin
    points.right = points.left.shift(0, options.godetWidth);
    points.topLeft = points.left.shift(90, 0.8 * options.godetLength);
    points.topRight = points.right.shift(90, 0.8 * options.godetLength);
    points.top = points.left.translate(options.godetWidth / 2, -options.godetLength);
    
    points.topLcp = points.top.shift(180, options.godetWidth / 2);
    points.topRcp = points.top.shift(0, options.godetWidth / 2);

    paths.seam = new Path()
        .move(points.left)
        .line(points.topLeft)
        ._curve(points.topLcp, points.top)
        ._curve(points.topRcp, points.topRight)
        .line(points.right)
        .line(points.left)
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