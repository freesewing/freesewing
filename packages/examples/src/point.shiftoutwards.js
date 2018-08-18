import freesewing from "freesewing";

var pointShiftOutwards = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Path, paths, Snippet, snippets, macro} = part.shorthand();

    points.A = new Point(90, 70).attr('data-text', 'Point A');
    points.B = new Point(10, 10).attr('data-text', 'Point B');
    points.C = points.A.shiftOutwards(points.B, 30)
      .attr('data-text', "Point C is point A shifted 3cm\nbeyond point B")
      .attr('data-text-lineheight', 6);

    snippets.A = new Snippet("x", points.A);
    snippets.B = new Snippet("x", points.B);
    snippets.C = new Snippet("x", points.C);

    paths.direction = new Path()
      .move(points.A)
      .line(points.C)
      .attr('class', 'note dashed');

    macro('ld', {
      from: points.C,
      to: points.B,
      d: -10
    });

    return part;
  }
};

export default pointShiftOutwards;
