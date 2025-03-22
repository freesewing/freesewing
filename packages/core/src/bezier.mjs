import { Bezier as UpstreamBezier } from 'bezier-js'

/*
 * The BezierJS library has an issue where it does not find
 * the intersection of two paths under some circumstances.
 * See: https://github.com/Pomax/bezierjs/issues/203
 *
 * A PR was submitted to address this by Jonathan Haas
 * See: https://github.com/Pomax/bezierjs/pull/219
 *
 * However, that PR does not get any attention, and in general
 * the library seems to be rather unmaintained. The maintainer
 * (Pomax) says as much in the README.
 *
 * That being said, BezierJS is a great library and this stuff
 * is just hard because there is no closed-form integral solution
 * for this, so a lot of this is trial an error.
 *
 * Rather than maintain a fork, we extend the Bezier class and
 * implement our own reduce method.
 *
 * The changes to the reduce method where written by Jonathan <3
 */

/*
 * Extend the upstream Bezier class with a custom reduce method
 */
class Bezier extends UpstreamBezier {
  reduce(step = 0.01) {
    // Keep the linter happy
    const abs = this.abs
    const utils = this.utils

    // Vars we'll use
    let i,
      t1 = 0,
      t2 = 0,
      segment,
      pass1 = [],
      pass2 = []

    // First pass: split on extrema
    let extrema = this.extrema().values
    if (extrema.indexOf(0) === -1) {
      extrema = [0].concat(extrema)
    }
    if (extrema.indexOf(1) === -1) {
      extrema.push(1)
    }

    for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
      t2 = extrema[i]
      segment = this.split(t1, t2)
      segment._t1 = t1
      segment._t2 = t2
      pass1.push(segment)
      t1 = t2
    }

    try {
      // Second pass: further reduce these segments to simple segments
      pass1.forEach(function (p1) {
        t1 = 0
        t2 = 0
        while (t2 <= 1) {
          for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
            segment = p1.split(t1, t2)
            if (!segment.simple()) {
              t2 -= step
              if (abs(t1 - t2) < step) {
                throw new Error("Couldn't find a reduction")
              }
              segment = p1.split(t1, t2)
              segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2)
              segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2)
              pass2.push(segment)
              t1 = t2
              break
            }
          }
        }
        if (t1 < 1) {
          segment = p1.split(t1, 1)
          segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2)
          segment._t2 = p1._t2
          pass2.push(segment)
        }
      })
    } catch (e) {
      if (step <= 1e-6) {
        // FIXME: Do we want to throw here?
        throw new Error('Step size too small to continue reduction')
      }
      // Try again with a smaller step value
      return this.reduce(step / 10)
    }
    return pass2
  }
}

export { Bezier }
