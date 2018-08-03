import freesewing from "freesewing";
import base from "./base";

var front = {
  draft: function(part) {
    // prettier-ignore
    let {sa, point, points, path, paths, snippet, snippets, final, paperless, macro} = freesewing.utils.shorthand(part);

    macro("title", { at: points.title, nr: 1 });
    return part;
  }
};

export default front;
