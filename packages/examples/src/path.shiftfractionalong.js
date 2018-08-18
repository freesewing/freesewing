import freesewing from "freesewing";

var pathShiftFractionAlong = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Path, paths, Snippet, snippets, macro} = part.shorthand();

    points.A = new Point(45, 60);
    points.B = new Point(10, 30);
    points.BCp2 = new Point(40, 20);
    points.C = new Point(90, 30);
    points.CCp1 = new Point(50, -30);

    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C);


    points.X1 = paths.example.shiftFractionAlong(0.2)
      .attr('data-text', "Shifted 20%\nalong this path")
      .attr('data-text-class', 'center')
      .attr('data-text-lineheight', 6);
    points.X2 = paths.example.shiftFractionAlong(0.9)
      .attr('data-text', "Shifted 90%\nalong this path")
      .attr('data-text-class', 'center')
      .attr('data-text-lineheight', 6);

    snippets.Xl = new Snippet('x', points.X1);
    snippets.X2 = new Snippet('x', points.X2);

    return part;
  }
};

export default pathShiftFractionAlong;
