import freesewing from "freesewing";

var back = {
  draft: function(part) {
    // prettier-ignore
    let {store, sa, Point, points, Path, paths, Snippet, snippets, options, measurements, final, paperless, macro} = part.shorthand();

    // Do your work here :)
    points.start = new Point(0, 0);
    points.end = new Point(75, 0);

    paths.example = new Path()
      .move(points.start)
      .line(points.end)
      .attr("data-text", "This is the front part")
      .attr("data-text-class", "center");

    // Final?
    if (final) {
    }

    // Paperless?
    if (paperless) {
    }

    return part;
  }
};

export default back;
