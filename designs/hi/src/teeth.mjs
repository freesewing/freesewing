import { utils } from '@freesewing/core'
const { Bezier } = utils

/*
 * This method generates Hi's teeth.
 * Growing teeth is not easy and it was making the pattern slow.
 * So this method was optimized by @joostdeock to use the underlying
 * Bezier object * rather than the higher-level path object
 */
export function createTeeth(pnts, toothCount, toothStartSize, toothEndSize, part) {

  // Deconstruct what we need from the part via shorthand()
  const { Path, points, Point, options } = part.shorthand()

  // These 4 points make up our cubic bezier curve which in turn is half of the mouth
  const [ start, cp1, cp2, end ] = pnts

  // Create the Bezier object from the 4 points
  const halfMouth = new Bezier(...pnts)

  // Center of the mouth
  const center = pnts[3]
  // Path that makes up the left half
  const left = new Path().move(pnts[0])
  // Path that makes up the right half
  const right = new Path().move(pnts[0].flipX(center))

  // Get a lookup table (LUT) of points along the Bezier
  const lut = halfMouth.getLUT(toothCount + 2)

  // Get size increase for each tooth
  const sizeIncrease = (toothEndSize -toothStartSize) /toothCount

  // Iterating over our LUT where p holds a number ID that we'll
  // use to 'look back' to the other side of the tooth
  for (const p in lut) {

    // Tooth size varies across the curve
    const size = toothStartSize +(sizeIncrease *(p-1))

    // Coordinates from the LUT
    const { x, y } = lut[p]
    // Create left half point at p
    points[`leftTooth${p}`] = new Point(x, y)
    // Mirror (flipX)to find right half point at p
    points[`rightTooth${p}`] = points[`leftTooth${p}`].flipX(center)

    // This returns the normalized vector (nv) at p,
    // in other words, the tangent + 90 degrees
    const nv = halfMouth.normal(lut[p].t)

    // Create control points for left half at p
    points[`leftTooth${p}Cp`] = new Point(x-size*nv.x, y-size*nv.y)
    // Mirror (flipX) to find control points for right half at p
    points[`rightTooth${p}Cp`] = points[`leftTooth${p}Cp`].flipX(center)

    // Skip the start point, the every 2 points, draw a teeth
    // p = end of the tooth
    // p - 2 = start of the tooth
    if (p > 0 && p%2 === 0) {
      if (options.aggressive) {
        // For pointy tooth, find point between the two control points to form the tip
        points[`leftTooth${p}Tip`] = points[`leftTooth${(p - 2)}Cp`].shiftFractionTowards(points[`leftTooth${(p)}Cp`], 0.5)
        points[`rightTooth${p}Tip`] = points[`leftTooth${p}Tip`].flipX(center)
        // Now draw tooth with shared control points for that pointy look
        left.curve(
          points[`leftTooth${(p)}Tip`],
          points[`leftTooth${(p)}Tip`],
          points[`leftTooth${p}`]
        )
        // Do the same for the right half
        right.curve(
          points[`rightTooth${(p)}Tip`],
          points[`rightTooth${(p)}Tip`],
          points[`rightTooth${p}`]
        )
      } else {
        // Draw regular tooth in the left half
        left.curve(
          points[`leftTooth${(p - 2)}Cp`],
          points[`leftTooth${p}Cp`],
          points[`leftTooth${p}`]
        )
        // Do the same for the right half
        right.curve(
          points[`rightTooth${(p - 2)}Cp`],
          points[`rightTooth${p}Cp`],
          points[`rightTooth${p}`]
        )
      }
    }
  }

  // Return joined paths to get the full set of teeth
  return left.join(right.reverse())
}
