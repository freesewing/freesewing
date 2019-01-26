import freesewing from "freesewing";

var pathAttrs = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Path, paths, Snippet, snippets, macro} = part.shorthand();

    points.B = new Point(10, 30);
    points.BCp2 = new Point(40, 40);
    points.C = new Point(90, 30);
    points.CCp1 = new Point(50, -30);

    paths.example = new Path()
      .move(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .attr("class", "stroke-xl canvas")
      .attr("data-text", "I am text placed on a path")
      .attr("data-text-class", "center fill-note");

    return part;
  }
};

export default pathAttrs;
