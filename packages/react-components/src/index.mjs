// Components
// Pattern
import { Pattern as PatternComponent } from './pattern/index.mjs'
import { Svg as SvgComponent } from './pattern/svg.mjs'
import { Defs as DefsComponent } from './pattern/defs.mjs'
import { Group as GroupComponent } from './pattern/group.mjs'
import { Stack as StackComponent } from './pattern/stack.mjs'
import { Part as PartComponent } from './pattern/part.mjs'
import { Point as PointComponent } from './pattern/point.mjs'
import { Snippet as SnippetComponent } from './pattern/snippet.mjs'
import { Path as PathComponent } from './pattern/path.mjs'
import { Grid as GridComponent } from './pattern/grid.mjs'
import { Text as TextComponent, TextOnPath as TextOnPathComponent } from './pattern/text.mjs'
// Pattern Utils
import { getProps, withinPartBounds, getId, translateStrings } from './pattern/utils.mjs'
// PatternXray
import { PatternXray as PatternXrayComponent } from './pattern-xray/index.mjs'

/*
 * Export all components as named exports
 */
export const Pattern = PatternComponent
export const Svg = SvgComponent
export const Defs = DefsComponent
export const Group = GroupComponent
export const Stack = StackComponent
export const Part = PartComponent
export const Point = PointComponent
export const Path = PathComponent
export const Snippet = SnippetComponent
export const Grid = GridComponent
export const Text = TextComponent
export const TextOnPath = TextOnPathComponent
export const PatternXray = PatternXrayComponent

/*
 * Export pattern utils
 */
export const utils = {
  getProps,
  withinPartBounds,
  getId,
  translateStrings,
}
