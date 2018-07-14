import { Pattern } from './lib/pattern'
import { Point } from './lib/point'
import { Path } from './lib/path'
import { config } from './config/config'
import * as utils from './lib/utils'
import bezier from 'bezier-js'

var Freesewing = {
  version: '1.0.1',
  config,
  pattern: Pattern,
  point: Point,
  path: Path,
  utils,
  bezier
}

export default Freesewing;
