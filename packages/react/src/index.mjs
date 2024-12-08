// Pattern components
import { Defs } from './pattern/defs.mjs'
import { Grid } from './pattern/grid.mjs'
import { Group } from './pattern/group.mjs'
import { Part } from './pattern/part.mjs'
import { Path } from './pattern/path.mjs'
import { Pattern } from './pattern/index.mjs'
import { PatternXray } from './pattern-xray/index.mjs'
import { Point } from './pattern/point.mjs'
import { Stack } from './pattern/stack.mjs'
import { Snippet } from './pattern/snippet.mjs'
import { Svg } from './pattern/svg.mjs'
import { Text, TextOnPath } from './pattern/text.mjs'
// Pattern Utils
import { getId, getProps, translateStrings, withinPartBounds } from './pattern/utils.mjs'
// Stand alone components
import { Popout } from './popout.mjs'

/**
 * Translation namespaces used by these components
 */
const ns = ['editor']

/*
 * Export all components as named exports
 */
export {
  // Pattern components
  Pattern,
  Svg,
  Defs,
  Group,
  Stack,
  Part,
  Point,
  Path,
  Snippet,
  Grid,
  Text,
  TextOnPath,
  PatternXray,
  // These are not React components but pattern helpers
  getId,
  getProps,
  translateStrings,
  withinPartBounds,
  // These are not React components but various helpers
  ns,
  // Stand along components
  Popout,
}
