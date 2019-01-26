import freesewing from "freesewing";

var pathOps = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Path, paths, Snippet, snippets, macro} = part.shorthand();

    points.A = new Point(10, 10)
      .attr("data-text", "Move to point A")
      .attr("data-text-class", "center text-xs");
    points.B = new Point(70, 30);
    points.BCp2 = new Point(40, 10);
    points.C = new Point(90, -50);
    points.CCp1 = new Point(125, -30);

    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .close();

    paths.handle1 = new Path()
      .move(points.B)
      .line(points.BCp2)
      .attr("class", "note dashed");
    paths.handle2 = new Path()
      .move(points.C)
      .line(points.CCp1)
      .attr("class", "note dashed");

    snippets.A = new Snippet("notch", points.A);
    snippets.B = new Snippet("notch", points.B);
    snippets.C = new Snippet("notch", points.C);
    snippets.Bcp2 = new Snippet("x", points.BCp2);
    snippets.Ccp1 = new Snippet("x", points.CCp1);

    paths.textLine = new Path()
      .move(points.A)
      .line(points.B)
      .attr("data-text", "Line to point B")
      .attr("data-text-class", "center text-xs");

    paths.textCurve = new Path()
      .move(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .attr(
        "data-text",
        "Curve to point C, using BCp2 and CCp1 as control points"
      )
      .attr("data-text-class", "center text-xs");

    paths.textClose = new Path()
      .move(points.A)
      .line(points.C)
      .attr("data-text", "Close path")
      .attr("data-text-class", "center text-xs");

    return part;
  }
};

export default pathOps;
