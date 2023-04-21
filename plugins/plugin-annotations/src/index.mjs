import { name, version } from '../data.mjs'
// Defs only
import { buttonsDefs } from './buttons.mjs'
import { logoDefs } from './logo.mjs'
import { notchesDefs } from './notches.mjs'
// Macros only
import { bannerMacros } from './banner.mjs'
import { bannerboxMacros } from './bannerbox.mjs'
import { bartackMacros } from './bartack.mjs'
import { crossboxMacros } from './crossbox.mjs'
import { scaleboxMacros } from './scalebox.mjs'
import { titleMacros } from './title.mjs'
// Defs and Macros
import { cutonfoldMacros, cutonfoldDefs } from './cutonfold.mjs'
import { dimensionsMacros, dimensionsDefs } from './dimensions.mjs'
import { grainlineMacros, grainlineDefs } from './grainline.mjs'
import { pleatMacros, pleatDefs } from './pleat.mjs'
import { sewtogetherMacros, sewtogetherDefs } from './sewtogether.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    preRender: [
      function (svg) {
        const defs = [
          ...buttonsDefs,
          ...cutonfoldDefs,
          ...dimensionsDefs,
          ...grainlineDefs,
          ...logoDefs,
          ...notchesDefs,
          ...pleatDefs,
          ...sewtogetherDefs,
        ]
        for (const def of defs) {
          svg.defs.setIfUnset(
            def.name,
            typeof def.def === 'function' ? def.def(svg.pattern.settings[0].scale) : def.def
          )
        }
      },
    ],
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
}

export const annotationsPlugin = plugin
export const pluginAnnotations = plugin
