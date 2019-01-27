export default part => {
  let { Point, points, Path, paths, macro } = part.shorthand();

  points.anchor = new Point(0, 0);

  macro("scalebox", {
    at: points.anchor
  });

  return part;
};
