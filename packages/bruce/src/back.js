import { init } from "./shared";

var back = {
  draft: function(part) {
    // prettier-ignore
    let {store, sa, Point, points, Path, paths, Snippet, snippets, options, measurements, final, paperless, macro, utils} = part.shorthand();

    // Initialize
    init(part);

    // Center back
    points.defaultCenter = new Point(0,0);
    points.elasticCenter = new Point(0, options.rise * -1 * store.get('yScale'));
    points.center = new Point(0, points.elasticCenter.y + options.elasticWidth);

    // Sides top
    points.sideRight = new Point(store.get('hipsBack') / 2, points.center.y);
    points.sideLeft = points.sideRight.flipX(points.center);

    // Gusset
    points.gussetTop = new Point(0, store.get('riseLength'));
    points.gussetBottom = new Point(0, points.gussetTop.y + store.get('gusset'));
    points.gussetRight = new Point(store.get('gusset') / 2, points.gussetBottom.y);
    points.gussetLeft = points.gussetRight.flipX(points.center);
    points.gussetCpRight = new Point(points.gussetRight.x, points.gussetTop.y);
    points.gussetCpLeft = new Point(points.gussetLeft.x, points.gussetTop.y);

    // Find leg edge
    let isect = utils.circlesIntersect(points.gussetRight, store.get('legBack'), points.sideRight, store.get('fullLength'));
    points.legRight = isect[1];
    points.legLeft = points.legRight.flipX(points.center);

    // Store back seam length and (half of the) crotch seam length
    store.set('backSeamLength', points.sideRight.dist(points.legRight));
    store.set('crotchSeamLength', new Path()
      .move(points.gussetTop)
      .curve(points.gussetCpRight, points.gussetRight, points.gussetRight)
      .length()
    );

    // Handle back rise
    points.center = points.center.shift(90, store.get('backRise'));
    points.sideRight = points.sideRight.shift(90, store.get('sideRise'));
    points.sideLeft = points.sideLeft.shift(90, store.get('sideRise'));
    points.centerCpRight = new Point(points.sideRight.x/2, points.center.y);
    points.centerCpLeft = points.centerCpRight.flipX(points.center);

    paths.seam = new Path()
      .move(points.gussetTop)
      .curve(points.gussetCpRight, points.gussetRight, points.gussetRight)
      .line(points.legRight)
      .line(points.sideRight)
      .curve(points.sideRight, points.centerCpRight, points.center)
      .line(points.gussetTop)
      .close()
      .attr('class', 'fabric');

    // Final?
    if (final) {
      if(sa) {
        let sa1 = new Path()
          .move(points.legRight)
          .line(points.sideRight)
          .curve(points.sideRight, points.centerCpRight, points.center)
          .offset(sa);
        let sa2 = new Path()
          .move(points.gussetTop)
          .curve(points.gussetCpRight, points.gussetRight, points.gussetRight)
          .offset(sa)
        let hemSa = new Path()
          .move(points.gussetRight)
          .line(points.legRight)
          .offset(sa * 2)
        paths.sa = new Path()
          .move(points.gussetTop)
          .line(sa2.start())
          .join(sa2)
          .join(hemSa)
          .join(sa1)
          .line(points.center)
          .attr('class', 'fabric sa');
      }
      points.title = new Point(points.sideRight.x * 0.6, points.gussetTop.y * 0.6);
      macro('title', {
        at: points.title,
        nr: 1,
        title: 'back'
      });
      macro('cutonfold', {
        from: points.center,
        to: points.gussetTop,
        grainline: true
      });
      snippets.logo = new Snippet(
        'logo',
        points.title.shift(90, 50)
      );
    }

    // Paperless?
    if (paperless) {
      macro('vd', {
        from: points.gussetTop,
        to: points.center,
        x: points.center.x - 15
      });
      macro('vd', {
        from: points.gussetRight,
        to: points.center,
        x: points.center.x - 30
      });
      macro('vd', {
        from: points.legRight,
        to: points.sideRight,
        x: points.legRight.x + 15 + sa
      });
      macro('vd', {
        from: points.legRight,
        to: points.center,
        x: points.legRight.x + 30 + sa
      });
      macro('hd', {
        from: points.center,
        to: points.sideRight,
        y: points.center.y - 15 - sa
      });
      macro('hd', {
        from: points.gussetTop,
        to: points.gussetRight,
        y: points.gussetRight.y + 15 + sa * 2
      });
      macro('hd', {
        from: points.gussetTop,
        to: points.legRight,
        y: points.gussetRight.y + 30 + sa * 2
      });
      macro('ld', {
        from: points.gussetRight,
        to: points.legRight,
        d: -15 - sa * 2
      });
    }

    return part;
  }
};

export default back;
