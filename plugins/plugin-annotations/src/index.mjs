import { name, version } from '../data.mjs'
// Hooks only
import { buttonsHooks } from './buttons.mjs'
import { logoHooks } from './logo.mjs'
import { notchesHooks } from './notches.mjs'
// Macros only
import { bannerMacros } from './banner.mjs'
import { bannerboxMacros } from './bannerbox.mjs'
import { bartackMacros } from './bartack.mjs'
import { crossboxMacros } from './crossbox.mjs'
import { cutlistStores, cutlistHooks } from './cutlist.mjs'
import { scaleboxMacros } from './scalebox.mjs'
import { titleMacros } from './title.mjs'
// Hooks and Macros
import { cutonfoldMacros, cutonfoldHooks } from './cutonfold.mjs'
import { dimensionsMacros, dimensionsHooks } from './dimensions.mjs'
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
      ...dimensionsHooks.preRender,
      ...grainlineHooks.preRender,
      ...pleatHooks.preRender,
      ...sewtogetherHooks.preRender,
    ],
    prePartDraft: [...cutlistHooks.prePartDraft],
  },
  macros: {
    ...bannerMacros,
    ...bannerboxMacros,
    ...bartackMacros,
    ...crossboxMacros,
    ...scaleboxMacros,
    ...cutonfoldMacros,
    ...dimensionsMacros,
    ...grainlineMacros,
    ...pleatMacros,
    ...sewtogetherMacros,
    ...titleMacros,
  },
  store: [...cutlistStores],
}

export const annotationsPlugin = plugin
export const pluginAnnotations = plugin
