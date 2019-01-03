import { frontBackShared } from "./shared";

export default part => {
  frontBackShared(part);
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

  // Complete pattern?
  if (complete) {
    if (sa) {
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};
