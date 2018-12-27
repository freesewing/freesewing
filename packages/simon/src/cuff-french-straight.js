import {
  draftFrenchCuff,
  decorateFrenchCuff,
  paperlessFrenchCuff
} from "./shared";

export default part => {
  let {
    store,
    measurements,
    utils,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand();

  draftFrenchCuff(part);
  let height = store.get("barrelCuffHeight");

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr("class", "fabric");

  paths.fold = new Path()
    .move(points.midLeft)
    .line(points.midRight)
    .attr("class", "dotted");

  // Complete pattern?
  if (complete) {
    decorateFrenchCuff(part);
    if (sa) paths.sa = paths.seam.offset(sa);
  }

  // Paperless?
  if (paperless) paperlessFrenchCuff(part);

  return part;
};
