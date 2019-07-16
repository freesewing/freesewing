export default function(part) {
  let {
    macro,
    measurements,
    Point,
    points,
    Path,
    paths,
    complete,
    sa,
    paperless
  } = part.shorthand();

  paths.seam.attributes.set("class", "interfacing");
  paths.welt.attributes.set("class", "interfacing dashed");

  // Complete pattern?
  if (complete) {
    macro("title", {
      at: points.title,
      title: "backPocketInterfacing",
      nr: 13
    });
    macro("grainline", false);
  }

  // Paperless?
  if (paperless) {
  }

  return part;
}
