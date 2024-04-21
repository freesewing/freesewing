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
// Editor & Swizzle hook
//import { PatternEditor } from './pattern-editor/index.mjs'
//import { useSwizzle } from './pattern-editor/swizzle/index.mjs'
// Links
//import {
//  linkClasses,
//  AnchorLink,
//  CardLink,
//  Link,
//  PageLink,
//  WebLink,
//} from './pattern-editor/swizzle/components/link.mjs'
//// Utils
//import {
//  nsMerge,
//  hasRequiredMeasurements,
//} from './pattern-editor/utils.mjs'
// Various components
//import { BaseAccordion, Accordion, SubAccordion } from './pattern-editor/swizzle/components/accordion.mjs'

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
  //PatternEditor,
  // Various Components
  //AnchorLink,
  //CardLink,
  //Link,
  //PageLink,
  //WebLink,
  // Hooks
  //useSwizzle,
  // These are not React components but pattern helpers
  getId,
  getProps,
  translateStrings,
  withinPartBounds,
  // These are not React components but various helpers
  //linkClasses,
  // Namespaces
  ns,
  // Utils
  //nsMerge,
  //hasRequiredMeasurements,
  // Various components
  //BaseAccordion,
  //Accordion,
  //SubAccordion,
}
