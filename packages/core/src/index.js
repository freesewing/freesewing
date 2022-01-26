import Design from './design'
import Pattern from './pattern'
import Point from './point'
import Path from './path'
import Snippet from './snippet'
import * as utils from './utils'
import pkg from '../package.json'

export default {
  version: pkg.version,
  Design,
  Pattern,
  Point,
  Path,
  Snippet,
  utils,
  patterns: {},
  plugins: {},
  /**
   * This pctBasedOn() method makes it easy to add the optional
   * toAbs() and fromAbs() methods to percentage options config
   *
   * It was backported from the v3 roadmap into v2.
   **/
  pctBasedOn: utils.pctBasedOn,
}
const frowns = -1
