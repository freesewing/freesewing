import { Bezier } from 'bezier-js'
import { Attributes } from './attributes.mjs'
import { Design } from './design.mjs'
import { Pattern } from './pattern/index.mjs'
import { Part } from './part.mjs'
import { Point } from './point.mjs'
import { Path } from './path.mjs'
import { Snippet } from './snippet.mjs'
import { Store } from './store.mjs'
import { hidePresets } from './pattern/pattern-config.mjs'
import {
  beamIntersectsCircle,
  beamIntersectsX,
  beamIntersectsY,
  beamsIntersect,
  beamIntersectsCurve,
  capitalize,
  cbqc,
  circlesIntersect,
  curveEdge,
  curveIntersectsX,
  curveIntersectsY,
  curvesIntersect,
  deg2rad,
  generateStackTransform,
  getTransformedBounds,
  lineIntersectsCircle,
  lineIntersectsCurve,
  linesIntersect,
  mergeI18n,
  mergeOptions,
  pctBasedOn,
  pointOnBeam,
  pointOnCurve,
  pointOnLine,
  rad2deg,
  round,
  splitCurve,
  stretchToScale,
  units,
  goldenRatio,
} from './utils.mjs'
import { version } from '../data.mjs'

// Named exports
export {
  // Constructors
  Attributes,
  Design,
  Pattern,
  Point,
  Path,
  Part,
  Snippet,
  Store,
  // Various
  version,
  Bezier,
  // Constants
  cbqc,
  goldenRatio,
  hidePresets,
  // Utils
  beamIntersectsCircle,
  beamIntersectsCurve,
  beamIntersectsX,
  beamIntersectsY,
  beamsIntersect,
  capitalize,
  circlesIntersect,
  curveEdge,
  curveIntersectsX,
  curveIntersectsY,
  curvesIntersect,
  deg2rad,
  generateStackTransform,
  getTransformedBounds,
  lineIntersectsCircle,
  lineIntersectsCurve,
  linesIntersect,
  mergeI18n,
  mergeOptions,
  pctBasedOn,
  pointOnBeam,
  pointOnCurve,
  pointOnLine,
  rad2deg,
  round,
  splitCurve,
  stretchToScale,
  units,
}
