import { name, version } from '../data.mjs'

import { bartackPlugin } from './bartack.mjs'
import { buttonsPlugin } from './buttons.mjs'
import { crossboxPlugin } from './crossbox.mjs'
import { cutonfoldPlugin } from './cutonfold.mjs'
import { grainlinePlugin } from './grainline.mjs'
import { logoPlugin } from './logo.mjs'
import { notchesPlugin } from './notches.mjs'
import { pleatPlugin } from './pleat.mjs'
import { scaleboxPlugin } from './scalebox.mjs'
import { sewtogetherPlugin } from './sewtogether.mjs'

const annotationPlugins = [
  bartackPlugin,
  buttonsPlugin,
  crossboxPlugin,
  cutonfoldPlugin,
  grainlinePlugin,
  logoPlugin,
  notchesPlugin,
  pleatPlugin,
  scaleboxPlugin,
  sewtogetherPlugin,
]

function annotationHooks() {
  const hooks = {}
  for (const plugin of annotationPlugins) {
    for (const i in plugin.hooks) {
      if (typeof hooks[i] === 'undefined') hooks[i] = []
      const hook = plugin.hooks[i]
      if (typeof hook === 'function') hooks[i].push(hook)
      else if (typeof hook === 'object') {
        for (let method of hook) hooks[i].push(method)
      }
    }
  }

  return hooks
}

function annotationMacros() {
  const macros = {}
  for (const plugin of annotationPlugins) {
    for (const i in plugin.macros) macros[i] = plugin.macros[i]
  }

  return macros
}

export const plugin = {
  name,
  version,
  hooks: annotationHooks(),
  macros: annotationMacros(),
}

export const annotationPlugin = plugin
export const pluginAnnotation = plugin
