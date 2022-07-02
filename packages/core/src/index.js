import Design from './design'
import Pattern from './pattern'
import Point from './point'
import Path from './path'
import Snippet from './snippet'
import * as utils from './utils'
import { version } from '../package.json'

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
