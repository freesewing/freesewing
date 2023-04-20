export function bottomAndSide(centerWaistline, sideWaistline, armhole, waistlineCp, Path) {
  return new Path().move(centerWaistline).line(sideWaistline).curve_(waistlineCp, armhole)
}

export function sleevecap(armhole, sleeveEnd, cp1, cp2, Path) {
  return new Path().move(armhole).curve(cp2, cp1, sleeveEnd)
}

export function shoulderAndNeck(sleeveEnd, neckSide, neckCenter, neckCp1, neckCp2, Path) {
  return new Path().move(sleeveEnd).line(neckSide).curve(neckCp2, neckCp1, neckCenter)
}

export function waistlineHeight(waistToUnderbust, hpsToWaistBack, lowerPct) {
  return hpsToWaistBack - waistToUnderbust * (1 - lowerPct)
}

export const draftRingSector = (part, rot, an, radIn, radEx, rotate = false) => {
  const { utils, Point, points, Path } = part.shorthand()

  const roundExtended = (radius, angle = 90) => {
    const arg = utils.deg2rad(angle / 2)

    return (radius * 4 * (1 - Math.cos(arg))) / Math.sin(arg) / 3
  }

  /**
   * Calculates the distance of the control point for the internal
   * and external arcs using bezierCircleExtended
   */
  const distIn = roundExtended(radIn, an / 2)
  const distEx = roundExtended(radEx, an / 2)
  // The centre of the circles
  points.center = new Point(0, 0)

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
  points.in1 = points.center.shift(-90, radIn)

  /**
   * The control point for 'in1'. It's situated at a
   * distance $distIn calculated with bezierCircleExtended
   * and the line between it and 'in1' is perpendicular to
   * the line between 'in1' and the centre, so it's
   * shifted in the direction 0º
   */
  points.in1C = points.in1.shift(0, distIn)

  /**
   * The second point of the internal arc, situated at
   * a $radIn distance of the centre in the direction
   * $an/2 - 90º
   */
  points.in2 = points.center.shift(an / 2 - 90, radIn)

  /**
   * The control point for 'in2'. It's situated at a
   * distance $distIn calculated with bezierCircleExtended
   * and the line between it and 'in2' is perpendicular to
   * the line between 'in2' and the centre, so it's
   * shifted in the direction $an/2 + 180º
   */
  points.in2C = points.in2.shift(an / 2 + 180, distIn)

  /**
   * The points for the external arc are generated in the
   * same way, using $radEx and $distEx instead
   */
  points.ex1 = points.center.shift(-90, radEx)
  points.ex1C = points.ex1.shift(0, distEx)
  points.ex2 = points.center.shift(an / 2 - 90, radEx)
  points.ex2C = points.ex2.shift(an / 2 + 180, distEx)

  // Flip all the points to generate the full ring sector
  for (const id of ['in2', 'in2C', 'in1C', 'ex1C', 'ex2C', 'ex2'])
    points[id + 'Flipped'] = points[id].flipX()

  // Rotate all the points an angle rot
  for (const id of [
    'in1',
    'in1C',
    'in2',
    'in2C',
    'ex1',
    'ex1C',
    'ex2',
    'ex2C',
    'in2Flipped',
    'in2CFlipped',
    'in1CFlipped',
    'ex1CFlipped',
    'ex2CFlipped',
    'ex2Flipped',
  ])
    points[id + 'Rotated'] = points[id].rotate(rot, points.center)

  if (rotate) {
    // Rotate all points so the line from in1Rotated to ex1Rotated is vertical
    const deg = 270 - points.in2Flipped.angle(points.ex2Flipped)
    for (const id in points) {
      points[id] = points[id].rotate(deg, points.in2Flipped)
    }
  }
  // Return the path of the full ring sector
  return new Path()
    .move(points.in2Flipped)
    .curve(points.in2CFlipped, points.in1CFlipped, points.in1)
    .curve(points.in1C, points.in2C, points.in2)
    .line(points.ex2)
    .curve(points.ex2C, points.ex1C, points.ex1)
    .curve(points.ex1CFlipped, points.ex2CFlipped, points.ex2Flipped)
    .close()
}
