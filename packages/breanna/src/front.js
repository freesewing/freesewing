import frontWithPrimaryOnly from './front-primary-only'
import frontWithPrimaryAt600 from './front-primary-600'
import frontWithPrimaryAt700 from './front-primary-700'
import frontWithPrimaryAt800 from './front-primary-800'
import frontWithPrimaryAt1100 from './front-primary-1100'
import frontWithPrimaryAt1130 from './front-primary-1130'
import frontWithPrimaryAt1200 from './front-primary-1200'
import frontWithPrimaryAt1300 from './front-primary-1300'
import frontWithPrimaryAt1330 from './front-primary-1330'
import frontWithPrimaryAt1400 from './front-primary-1400'
import {
  getSecondaryDartRotationList,
  getDartInsertionPoint,
  getDartLocationsAsNumbers
} from './dart-utils'

export default part => {
  let { options, store, utils, points } = part.shorthand()

  // Store bust dart locations in the store for easy re-use
  let [loc1, loc2] = getDartLocationsAsNumbers(options)
  store.set('primaryBustDartLocation', loc1)
  store.set('secondaryBustDartLocation', loc2)

  /*
   * If there's a single (primary) bust dart, we have 15 possible combos
   * All of these are taken care of in one method, so return that
   */
  if (loc2 === 0 || loc1 === loc2) return frontWithPrimaryOnly(part)

  /*
   * We have two bust darts, which gives us an additional 115
   * To figure out what bust dart combo we're dealing with,
   * we will turn primary and secondary bust dart into a nr
   * (eg. 12:30 becomes 1500, 08:00 becomes 800)
   * Then, we join them together making sure the lowest goes first
   * this way 13:00 and 11:00 gives us the same as 11:00 and 13:00
   * and we only get the 105 unique combos.
   *
   * See the bottom of this file for a full list of all combos
   */

  // Start from the primary bust dart only front
  part = frontWithPrimaryOnly(part)

  // Angle of the secondary bust dart = Reduction of the primary bust dart
  let angle = store.get('bustDartAngle') * (1 - options.primaryBustDartShaping)

  // Figure out where the dart goes
  points.secondaryBustDart1 = getDartInsertionPoint(points, utils, loc2, angle)
  points.secondaryBustDart2 = points.secondaryBustDart1.rotate(angle, points.primaryBustDartTip)
  points.secondaryBustDartTip = points.primaryBustDartTip.clone()

  // Rotate the dart
  for (let p of getSecondaryDartRotationList(loc1, loc2))
    points[p] = points[p].rotate(angle, points.secondaryBustDartTip)

  // Now load the correct file based on the primary bust dart location
  switch (loc1) {
    case 600:
      return frontWithPrimaryAt600(part)
    case 700:
      return frontWithPrimaryAt700(part)
    case 800:
    case 900:
    case 1000:
      return frontWithPrimaryAt800(part)
    case 1100:
      return frontWithPrimaryAt1100(part)
    case 1130:
      return frontWithPrimaryAt1130(part)
    case 1200:
    case 1230:
      return frontWithPrimaryAt1200(part)
    case 1300:
      return frontWithPrimaryAt1300(part)
    case 1330:
      return frontWithPrimaryAt1330(part)
    case 1400:
    case 1500:
    case 1600:
      return frontWithPrimaryAt1400(part)
    default:
      return frontWithPrimaryOnly(part)
  }
}

/*
 * FYI: Here are all the possible bust dart combos:
 *
 *
   let combos = [
     600,
     700,
     800,
     900,
     1000,
     1100,
     1130,
     1200,
     1230,
     1300,
     1330,
     1400,
     1500,
     1600,
     1700
     600700,
     600800,
     600900,
     700800,
     700900,
     800900,
     6001000,
     6001100,
     6001130,
     6001200,
     6001230,
     6001300,
     6001330,
     6001400,
     6001500,
     6001600,
     6001700,
     7001000,
     7001100,
     7001130,
     7001200,
     7001230,
     7001300,
     7001330,
     7001400,
     7001500,
     7001600,
     7001700,
     8001000,
     8001100,
     8001130,
     8001200,
     8001230,
     8001300,
     8001330,
     8001400,
     8001500,
     8001600,
     8001700,
     9001000,
     9001100,
     9001130,
     9001200,
     9001230,
     9001300,
     9001330,
     9001400,
     9001500,
     9001600,
     9001700,
     10001100,
     10001130,
     10001200,
     10001230,
     10001300,
     10001330,
     10001400,
     10001500,
     10001600,
     10001700,
     11001130,
     11001200,
     11001230,
     11001300,
     11001330,
     11001400,
     11001500,
     11001600,
     11001700,
     11301200,
     11301230,
     11301300,
     11301330,
     11301400,
     11301500,
     11301600,
     11301700,
     12001230,
     12001300,
     12001330,
     12001400,
     12001500,
     12001600,
     12001700,
     12301300,
     12301330,
     12301400,
     12301500,
     12301600,
     12301700,
     13001330,
     13001400,
     13001500,
     13001600,
     13001700,
     13301400,
     13301500,
     13301600,
     13301700,
     14001500,
     14001600,
     14001700,
     15001600,
     15001700,
     16001700
  ]
  */
