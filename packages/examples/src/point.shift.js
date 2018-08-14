import freesewing from "freesewing";
import { box } from "./shared";

var pointShift = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Snippet, snippets, macro} = part.shorthand();

    box(part);

    points.A = new Point(90, 40).attr('data-text', 'Point A');
    points.B = points.A.shift(155, 70)
      .attr('data-text', "Point B is point A shifted 7cm\nat a 155 degree angle")
      .attr('data-text-lineheight', 6);

    snippets.A = new Snippet("x", points.A);
    snippets.B = new Snippet("x", points.B);

    macro('ld', {
      from: points.B,
      to: points.A,
      d: -10
    });

    return part;
  }
};

export default pointShift;
