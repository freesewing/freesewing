import { Pattern } from './pattern'
import { Point } from './point'
import { Path } from './path'
import { Snippet } from './snippet'
import * as utils from './utils'

export class Freesewing {
  version: string;
  pattern: Pattern;
  point: Point;
  path: Path;
  snippet: Snippet;
  utils: utils;
  constructor() {
    this.version = '1.0.1';
    this.pattern = Pattern;
    this.point = Point;
    this.path = Path;
    this.snippet = Snippet;
    this.utils = utils;
  }
}
