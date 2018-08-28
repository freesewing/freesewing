import freesewing from "freesewing";

var pluginGrainline = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, macro} = part.shorthand();

    points.grainlineFrom = new Point(10, 10);
    points.grainlineTo = new Point(100, 10);

    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo
    });

    return part;
  }
};

export default pluginGrainline;
