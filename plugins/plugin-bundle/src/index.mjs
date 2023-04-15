import { annotationsPlugin } from '../../plugin-annotations/src/index.mjs'

import { measurementsPlugin } from '../../plugin-measurements/src/index.mjs'
import { mirrorPlugin } from '../../plugin-mirror/src/index.mjs'
import { roundPlugin } from '../../plugin-round/src/index.mjs'
import { sprinklePlugin } from '../../plugin-sprinkle/src/index.mjs'
import { logoPlugin } from '../../plugin-logo/src/index.mjs'
import { name, version } from '../data.mjs'

const bundledPlugins = [
  annotationsPlugin,
  measurementsPlugin,
  mirrorPlugin,
  roundPlugin,
  sprinklePlugin,
  logoPlugin,
]

function bundleHooks() {
  const hooks = {}
  for (const plugin of bundledPlugins) {
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

function bundleMacros() {
  const macros = {}
  for (const plugin of bundledPlugins) {
    for (const i in plugin.macros) macros[i] = plugin.macros[i]
  }

  return macros
}

export const plugin = {
  name,
  version,
  hooks: bundleHooks(),
  macros: bundleMacros(),
}

// More specifically named exports
export const bundlePlugin = plugin
export const pluginBundle = plugin
