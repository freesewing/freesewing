import { draftRibbing } from "./shared";

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

  if (!options.ribbing) return part;
  let length =
    measurements.wristCircumference *
    (1 + options.cuffEase) *
    (1 - options.ribbingStretch);
  draftRibbing(part, length);

  // Complete pattern?
  if (complete) {
    macro("title", {
      at: points.title,
      nr: 5,
      title: "cuff"
    });
    if (sa) {
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};
