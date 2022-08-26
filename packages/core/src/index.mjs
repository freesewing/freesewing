import Design from './design.mjs'
import Pattern from './pattern.mjs'
import Point from './point.mjs'
import Path from './path.mjs'
import Snippet from './snippet.mjs'
import * as utils from './utils.mjs'
import pkg from '../package.json' assert { type: 'json' }

const { version } = pkg

/*
 * Named exports will become the default in FreeSewing v3
 */
export {
  version,
  Design,
  Pattern,
  Point,
  Path,
  Snippet,
  utils,
}

// This is a helper for configuration files
export const pctBasedOn = utils.pctBasedOn

// This is a helper for manual layouts
export const generatePartTransform = utils.generatePartTransform

/*
 * Default exports will be removed in FreeSewing v3
 */
export default {
  version,
  Design,
  Pattern,
  Point,
  Path,
  Snippet,
  utils,
  pctBasedOn,
}
