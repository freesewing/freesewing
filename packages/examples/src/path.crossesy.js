import freesewing from "freesewing";

var pathCrossesY = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Path, paths, Snippet, snippets, macro} = part.shorthand();

    points.A = new Point(55, 40);
    points.B = new Point(10, 70);
    points.BCp2 = new Point(40, 20);
    points.C = new Point(90, 60);
    points.CCp1 = new Point(50, -30);
    points.D = new Point(50, 80);
    points.DCp1 = new Point(140, 50);

    points.top = new Point(10, 58);
    points.bot = new Point(130, 58);
    paths.line = new Path()
      .move(points.top)
      .line(points.bot)
      .attr('class', 'lining dashed');
    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .curve(points.DCp1, points.DCp1, points.D);
    for (let p of paths.example.crossesY(58)) snippets[part.getUid()] = new Snippet('x', p);

    return part;
  }
};

export default pathCrossesY;
