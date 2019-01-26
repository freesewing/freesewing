import freesewing from "freesewing";

var pluginCutonfold = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Path, paths, macro} = part.shorthand();

    points.topLeft = new Point(0, 0);
    points.topRight = new Point(150, 0);
    points.bottomRight = new Point(150, 50);
    points.bottomLeft = new Point(0, 50);

    paths.box = new Path()
      .move(points.topLeft)
      .line(points.topRight)
      .line(points.bottomRight)
      .line(points.bottomLeft)
      .close();

    macro("cutonfold", {
      from: points.topRight,
      to: points.topLeft,
      grainline: true
    });

    return part;
  }
};

export default pluginCutonfold;
