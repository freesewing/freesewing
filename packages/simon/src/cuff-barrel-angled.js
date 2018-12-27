import { draftBarrelCuff, decorateBarrelCuff } from "./shared";

export default part => {
  // prettier-ignore
  let {store, measurements, utils, sa, Point, points, Path, paths, Snippet, snippets, complete, paperless, macro, options} = part.shorthand();

  draftBarrelCuff(part);
  let height = store.get("cuffHeight");

  points.leftAngleTop = points.topLeft.shift(0, height / 3);
  points.leftAngleBottom = points.topLeft.shift(-90, height / 3);
  points.rightAngleTop = points.topRight.shift(180, height / 3);
  points.rightAngleBottom = points.topRight.shift(-90, height / 3);
  paths.seam = new Path()
    .move(points.leftAngleBottom)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.rightAngleBottom)
    .line(points.rightAngleTop)
    .line(points.leftAngleTop)
    .line(points.leftAngleBottom)
    .close()
    .attr("class", "fabric");

  // Complete pattern?
  if (complete) {
    decorateBarrelCuff(part);
    if (sa) paths.sa = paths.seam.offset(sa);
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};
