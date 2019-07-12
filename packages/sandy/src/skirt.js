import draftRingSector from "./shared";

export default function(part) {
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

  const oundExtended = (radius, angle = 90) => {
    let arg = utils.deg2rad(angle / 2);

    return (radius * 4 * (1 - Math.cos(arg))) / Math.sin(arg) / 3;
  };

  const raftRingSector = (rot, an, radIn, radEx) => {
    /**
     * Calculates the distance of the control point for the internal
     * and external arcs using bezierCircleExtended
     */
    let distIn = roundExtended(radIn, an / 2);
    let distEx = roundExtended(radEx, an / 2);
    // The centre of the circles
    points.center = new Point(0, 0);

    /**
     * This function is expected to draft ring sectors for
     * angles up to 180%. Since roundExtended works
     * best for angles until 90º, we generate the ring
     * sector using the half angle and then duplicate it
     */

    /**
     * The first point of the internal arc, situated at
     * a radIn distance below the centre
     */
    points.in1 = points.center.shift(-90, radIn);

    /**
     * The control point for 'in1'. It's situated at a
     * distance $distIn calculated with bezierCircleExtended
     * and the line between it and 'in1' is perpendicular to
     * the line between 'in1' and the centre, so it's
     * shifted in the direction 0º
     */
    points.in1C = points.in1.shift(0, distIn);

    /**
     * The second point of the internal arc, situated at
     * a $radIn distance of the centre in the direction
     * $an/2 - 90º
     */
    points.in2 = points.center.shift(an / 2 - 90, radIn);

    /**
     * The control point for 'in2'. It's situated at a
     * distance $distIn calculated with bezierCircleExtended
     * and the line between it and 'in2' is perpendicular to
     * the line between 'in2' and the centre, so it's
     * shifted in the direction $an/2 + 180º
     */
    points.in2C = points.in2.shift(an / 2 + 180, distIn);

    /**
     * The points for the external arc are generated in the
     * same way, using $radEx and $distEx instead
     */
    points.ex1 = points.center.shift(-90, radEx);
    points.ex1C = points.ex1.shift(0, distEx);
    points.ex2 = points.center.shift(an / 2 - 90, radEx);
    points.ex2C = points.ex2.shift(an / 2 + 180, distEx);

    // Flip all the points to generate the full ring sector
    for (let id of ["in2", "in2C", "in1C", "ex1C", "ex2C", "ex2"])
      points[id + "Flipped"] = points[id].flipX();

    // Rotate all the points an angle rot
    for (let id of [
      "in1",
      "in1C",
      "in2",
      "in2C",
      "ex1",
      "ex1C",
      "ex2",
      "ex2C",
      "in2Flipped",
      "in2CFlipped",
      "in1CFlipped",
      "ex1CFlipped",
      "ex2CFlipped",
      "ex2Flipped"
    ])
      points[id + "Rotated"] = points[id].rotate(rot, points.center);

    // Return the path of the full ring sector
    return new Path()
      .move(points.in2Flipped)
      .curve(points.in2CFlipped, points.in1CFlipped, points.in1)
      .curve(points.in1C, points.in2C, points.in2)
      .line(points.ex2)
      .curve(points.ex2C, points.ex1C, points.ex1)
      .curve(points.ex1CFlipped, points.ex2CFlipped, points.ex2Flipped)
      .close();
  };

  // Circumference of the top of the waistband, calculated from the waistbandPosition option
  store.set(
    "topCircumference",
    options.waistbandPosition * measurements.hipsCircumference +
      (1 - options.waistbandPosition) * measurements.naturalWaist
  );
  // Circumference of the bottom of the waistband
  if (options.waistbandShape === "curved") {
    // If the waistband is curved, the bottom circumference is calculated from the measurements
    store.set(
      "bottomCircumference",
      store.get("topCircumference") +
        (options.waistbandWidth *
          (measurements.hipsCircumference - measurements.naturalWaist)) /
          measurements.naturalWaistToHip
    );
  } else {
    // If the waistband is straight, the bottom circumference is the same as the top circumference
    store.set("bottomCircumference", store.get("topCircumference"));
  }

  // Overlap of the waistband
  store.set(
    "waistbandOverlap",
    store.get("topCircumference") * options.waistbandOverlap
  );

  // The top circumference of the skirt corresponds to the bottom circumference of the waistband, plus the extraWaist option for gathering/pleating
  store.set(
    "skirtCircumference",
    store.get("bottomCircumference") * (1 + options.gathering)
  );

  // The length from the top of the skirt to the floor (max length available)
  store.set(
    "fullLength",
    measurements.naturalWaistToFloor -
      measurements.naturalWaistToHip * options.waistbandPosition
  );

  console.log("STORE", store.data);
  let radiusWaist, an;
  if (options.seamlessFullCircle) {
    /**
     * If the seamless full circle option is selected, the angle
     * is 90º, and the radius of the waist arc is half than if
     * it's not selected, because in this case the fabric is cut
     * in a double fold
     */
    an = 90;
    radiusWaist = store.get("skirtCircumference") / utils.deg2rad(an) / 4;
  } else {
    /**
     * If the seamless full circle option is not selected, the
     * angle is calculated using the circlePercent option
     */
    an = 180 * options.circleRatio;
    radiusWaist = store.get("skirtCircumference") / utils.deg2rad(an) / 2;

    /**
     * If the angle is too large, the seam allowance can fall out
     * of the fold of the fabric, so we limit the angle to a
     * maximum angle calculated so the seam allowance fits in the
     * fabric
     */
    if (an > 90 && sa) {
      let maxAn = utils.rad2deg(Math.atan(radiusWaist / sa));
      if (an > 90 + maxAn) an = 90 + maxAn;
    }
  }
  /**
   * The radius of the hem arc is the radius of the waist
   * arc with the length of the skirt added
   */
  let radiusHem =
    radiusWaist +
    store.get("fullLength") * options.lengthBonus -
    options.waistbandWidth;

  /**
   * The ring sector will be rotated an angle an/2 so we
   * display the part with one edge of the skirt vertical
   */
  let rot = an / 2;

  // Call draftRingSector to draft the part
  paths.seam = draftRingSector(part, rot, an, radiusWaist, radiusHem).attr(
    "class",
    "fabric"
  );

  // Anchor samples to the centre of the waist
  points.gridAnchor = points.in2Flipped.clone();

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
