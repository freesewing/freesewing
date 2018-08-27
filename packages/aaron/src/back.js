import { dimensions } from './shared';

var back = {
  draft: function(part) {
    // prettier-ignore
    let {store, sa, Point, points, Path, paths, Snippet, snippets, options, final, paperless, macro, utils, units} = part.shorthand();

    points.strapLeftCp2 = utils.beamsIntersect(
      points.strapLeft,
      points.strapCenter.rotate(90, points.strapLeft),
      points.cbNeck,
      points.cbNeck.shift(0,10)
    );

    points.armholeCp2 = points.aaronArmhole.shiftFractionTowards(points.armholeCorner, options.backlineBend);
    points.strapRightCp1 = points.strapRight.shiftFractionTowards(points.armholeCorner, options.backlineBend);

    // Seamline
    paths.seam = new Path()
      .move(points.cbNeck)
      .line(points.cbHips)
      .line(points.hips)
      .line(points.waist)
      .join(paths.side)
      .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
      .line(points.strapLeft)
      .curve(points.strapLeftCp2, points.cbNeck, points.cbNeck)
      .close()
      .attr("class", "fabric");

    // Final?
    if (final) {
      let neckOpeningLength = new Path()
        .move(points.strapLeft)
        .curve(points.strapLeftCp2, points.cbNeck, points.cbNeck)
        .length() + store.get('frontNeckOpeningLength');
      let armholeLength = new Path()
        .move(points.aaronArmhole)
        .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
        .length() + store.get('frontArmholeLength');
      points.bindinAnchor = new Point(points.aaronArmhole.x / 4, points.aaronArmhole.y)
        .attr('data-text', 'cutTwoStripsToFinishTheArmholes')
        .attr('data-text', ":\n")
        .attr('data-text', "width")
        .attr('data-text', ":")
        .attr('data-text', units(sa*6))
        .attr('data-text', "\n")
        .attr('data-text', "length")
        .attr('data-text', ":")
        .attr('data-text', units(armholeLength * 0.95 + 2*sa))
        .attr('data-text', "\n&nbsp;\n")
        .attr('data-text', 'cutOneStripToFinishTheNeckOpening')
        .attr('data-text', ":\n")
        .attr('data-text', "width")
        .attr('data-text', ":")
        .attr('data-text', units(sa*6))
        .attr('data-text', "\n")
        .attr('data-text', "length")
        .attr('data-text', ":")
        .attr('data-text', units(neckOpeningLength * 0.95 + 2*sa))
        .attr('data-text-lineheight', 6);

      macro("cutonfold", {
        from: points.cfNeck,
        to: points.cfHips,
        grainline: true
      });

      macro("title", { at: points.title, nr: 2, title: "back" });
      points.scaleboxAnchor = points.scalebox = points.title.shift(90, 100);
      macro("scalebox", { at: points.scalebox });
    }

    // Paperless?
    if (paperless) {
      dimensions(macro, points, sa);
      macro("vd", {
        from: points.cbHips,
        to: points.cbNeck,
        x: points.cbHips.x - sa - 15
      });
    }

    return part;
  }
};

export default back;
