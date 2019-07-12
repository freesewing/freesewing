import draftRingSector from "./shared";

export default function(part) {
  /**
   * The curved waistband is just a ring sector with external
   * and intenal radius and angle calculated from measurements
   * and options
   */
  let {
    utils,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro
  } = part.shorthand();

  // Calculate the angle of the ring sector and the radius of the upper arc
  const an =
    utils.rad2deg(
      store.get("bottomCircumference") - store.get("topCircumference")
    ) / options.waistbandWidth;

  const rad = store.get("topCircumference") / utils.deg2rad(an);

  // Extra angle to extend the waistband to overlap according to waistbandOverlap
  const anExtra = utils.rad2deg(
    store.get("waistbandOverlap") / (rad + options.waistbandWidth)
  );

  // The curved waistband is shown with no rotation
  const rot = 0;
  // Call draftRingSector to draft the part
  paths.seam = draftRingSector(
    part,
    rot,
    an + anExtra,
    rad,
    rad + options.waistbandWidth
  ).attr("class", "fabric");

  // Anchor samples to the centre of the waist
  points.gridAnchor = points.in1.clone();

  // Complete pattern?
  if (complete) {
    if (sa) {
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
}
