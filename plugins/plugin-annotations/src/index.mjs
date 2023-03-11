import { name, version } from '../data.mjs'
// Hooks only
import { buttonsHooks } from './buttons.mjs'
import { logoHooks } from './logo.mjs'
import { notchesHooks } from './notches.mjs'
// Macros only
import { bartackMacros } from './bartack.mjs'
import { crossboxMacros } from './crossbox.mjs'
import { scaleboxMacros } from './scalebox.mjs'
// Hooks and Macros
import { cutonfoldMacros, cutonfoldHooks } from './cutonfold.mjs'
import { grainlineMacros, grainlineHooks } from './grainline.mjs'
import { pleatMacros, pleatHooks } from './pleat.mjs'
import { sewtogetherMacros, sewtogetherHooks } from './sewtogether.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    preRender: [
      ...buttonsHooks.preRender,
      ...logoHooks.preRender,
      ...notchesHooks.preRender,
      ...cutonfoldHooks.preRender,
      ...grainlineHooks.preRender,
      ...pleatHooks.preRender,
      ...sewtogetherHooks.preRender,
    ],
  },
  macros: {
    ...bartackMacros,
    ...crossboxMacros,
    ...scaleboxMacros,
    ...cutonfoldMacros,
    ...grainlineMacros,
    ...pleatMacros,
    ...sewtogetherMacros,
  },
}

export const annotationPlugin = plugin
export const pluginAnnotation = plugin
