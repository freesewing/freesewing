import freesewing from "freesewing";
import { box } from "./shared";

var pointClone = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Snippet, snippets} = part.shorthand();

    box(part);

    points.A= new Point(50, 25)
      .attr('data-text', 'Point A')
      .attr('data-text-class', 'text-xl')
      .attr('data-text-fill-opacity', '0.5');
    points.B = points.A.clone().attr('data-text', 'Point B');

    snippets.x = new Snippet("x", points.A);

    return part;
  }
};

export default pointClone;
