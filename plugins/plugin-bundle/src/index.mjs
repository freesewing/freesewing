import { bannerPlugin } from '../../plugin-banner/src/index.mjs'
import { bartackPlugin } from '../../plugin-bartack/src/index.mjs'
import { buttonsPlugin } from '../../plugin-buttons/src/index.mjs'
import { cutonfoldPlugin } from '../../plugin-cutonfold/src/index.mjs'
import { dimensionPlugin } from '../../plugin-dimension/src/index.mjs'
import { grainlinePlugin } from '../../plugin-grainline/src/index.mjs'
import { logoPlugin } from '../../plugin-logo/src/index.mjs'
import { measurementsPlugin } from '../../plugin-measurements/src/index.mjs'
import { mirrorPlugin } from '../../plugin-mirror/src/index.mjs'
import { notchesPlugin } from '../../plugin-notches/src/index.mjs'
import { roundPlugin } from '../../plugin-round/src/index.mjs'
import { scaleboxPlugin } from '../../plugin-scalebox/src/index.mjs'
import { sprinklePlugin } from '../../plugin-sprinkle/src/index.mjs'
import { titlePlugin } from '../../plugin-title/src/index.mjs'
import { pluginCutlist } from '../../plugin-cutlist/src/index.mjs'
import { name, version } from '../data.mjs'

const bundledPlugins = [
  bannerPlugin,
  bartackPlugin,
  buttonsPlugin,
  cutonfoldPlugin,
  dimensionPlugin,
  grainlinePlugin,
  logoPlugin,
  measurementsPlugin,
  mirrorPlugin,
  notchesPlugin,
  roundPlugin,
  scaleboxPlugin,
  sprinklePlugin,
  titlePlugin,
  pluginCutlist,
]

const hooks = {}
const macros = {}
const store = []

function bundleHooks(plugin) {
  for (const i in plugin.hooks) {
    if (typeof hooks[i] === 'undefined') hooks[i] = []
    const hook = plugin.hooks[i]
    if (typeof hook === 'function') hooks[i].push(hook)
    else if (typeof hook === 'object') {
      for (let method of hook) hooks[i].push(method)
    }
  }
}

function bundleMacros(plugin) {
  for (const i in plugin.macros) macros[i] = plugin.macros[i]
}

function bundleStore(plugin) {
  if (plugin.store) store.push(...plugin.store)
}

for (const plugin of bundledPlugins) {
  bundleHooks(plugin)
  bundleMacros(plugin)
  bundleStore(plugin)
}

export const plugin = {
  name,
  version,
  hooks,
  macros,
  store,
}

// More specifically named exports
export const bundlePlugin = plugin
export const pluginBundle = plugin
