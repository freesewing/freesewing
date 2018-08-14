import freesewing from "freesewing";

var front = {
  draft: function(part) {
    // prettier-ignore
    let {store, sa, Point, points, Path, paths, Snippet, snippets, options, measurements, final, paperless, macro} = part.shorthand();

    // Building on top of back, just need to change the text
    paths.example.attributes.set("data-text", "This is the back part");

    // Final?
    if (final) {
    }

    // Paperless?
    if (paperless) {
    }

    return part;
  }
};

export default front;
