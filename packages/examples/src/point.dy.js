import freesewing from "freesewing";

var pointDy = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Snippet, snippets, macro} = part.shorthand();

    points.from = new Point(10, 10);
    points.to = new Point(90, 40);

    macro("vd", {
      from: points.to,
      to: points.from,
      x: 50
    });

    snippets.notch1 = new Snippet("x", points.from);
    snippets.notch2 = new Snippet("x", points.to);

    return part;
  }
};

export default pointDy;
