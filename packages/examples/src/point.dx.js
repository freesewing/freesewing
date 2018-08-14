import freesewing from "freesewing";
import { box } from "./shared";

var pointDx = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Snippet, snippets, macro} = part.shorthand();

    box(part);

    points.from = new Point(10, 10);
    points.to = new Point(90, 40);

    macro('hd', {
      from: points.from,
      to: points.to,
      y: 25
    });

    snippets.notch1 = new Snippet("x", points.from);
    snippets.notch2 = new Snippet("x", points.to);

    return part;
  }
};

export default pointDx;
