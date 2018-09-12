import { init } from "./shared";

var back = {
  draft: function(part) {
    // prettier-ignore
    let {store, sa, Point, points, Path, paths, Snippet, snippets, options, measurements, complete, paperless, macro, utils} = part.shorthand();

    // Initialize
    init(part);

    // Top left
    points.zero = new Point(0, 0);
    points.topLeft = points.zero.shift(90, store.get('rise'));

    // Top right
    points.topRight = new Point(store.get('hipsSide'), points.topLeft.y);

    // Bottom right
    points.bottomRight = points.topRight.shift(-90, store.get('fullLength'));

    // Find bottom left
    let isect = utils.circlesIntersect(points.bottomRight, store.get('legSide'), points.topLeft, store.get('backSeamLength'));
    points.bottomLeft = isect[0];

    // Store side seam length
    store.set('sideSeamLength', points.topRight.dist(points.bottomRight));

    // Handle back rise
    points.topLeft = points.topLeft.shift(90, store.get('sideRise'));
    points.topRight = points.topRight.shift(90, store.get('frontRise'));

    // Path
    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.topRight)
      .line(points.bottomRight)
      .line(points.bottomLeft)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric');


    // Anchor point for sampling
    points.anchor = points.topLeft;

    // Complete pattern?
    if (complete) {
      points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5);
      macro('title', {
        at: points.title.shift(90, 30),
        nr: 3,
        title: 'side'
      });
      if(sa) {
        paths.sa = paths.seam.offset(sa * -1).attr('class', 'fabric sa');
      }
      macro('grainline', {
        from: new Point(points.bottomRight.x / 2, points.bottomRight.y),
        to: new Point(points.bottomRight.x / 2, points.topRight.y)
      });
    }

    // Paperless?
    if (paperless) {
      macro('vd', {
        from: points.bottomLeft,
        to: points.topLeft,
        x: points.topLeft.x - 15 - sa
      });
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + 15 + sa
      });
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y - 15 - sa
      });
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + 15 + sa
      });
    }

    return part;
  }
};

export default back;
