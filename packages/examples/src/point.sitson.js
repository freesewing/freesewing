import freesewing from "freesewing";
import { box } from "./shared";

var pointDx = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Snippet, snippets, macro} = part.shorthand();

    box(part);

    let s;
    for (let i = 0; i < 10; i++) {
      points[`a${i}`] = new Point(i * 10, 40);
      points[`b${i}`] = new Point(i * 10, i * 8);
      if (points[`a${i}`].sitsOn(points[`b${i}`])) s = "notch";
      else s = "x";
      snippets[`b${i}`] = new Snippet(s, points[`b${i}`]);
      snippets[`a${i}`] = new Snippet(s, points[`a${i}`]);
    }

    return part;
  }
};

export default pointDx;
