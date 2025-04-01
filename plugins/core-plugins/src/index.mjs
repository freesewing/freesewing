import { annotationsPlugin, i18n as annotationsI18n } from '@freesewing/plugin-annotations'
import { measurementsPlugin } from '@freesewing/plugin-measurements'
import { mirrorPlugin } from '@freesewing/plugin-mirror'
import { roundPlugin } from '@freesewing/plugin-round'
import { sprinklePlugin } from '@freesewing/plugin-sprinkle'
import { binpackPlugin } from '@freesewing/plugin-bin-pack'
import about from '../about.json' with { type: 'json' }

const bundledPlugins = [
  annotationsPlugin,
  measurementsPlugin,
  mirrorPlugin,
  roundPlugin,
  sprinklePlugin,
  binpackPlugin,
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
  ...about,
  store,
  hooks,
  macros,
}

// Specific named export
export const corePlugins = plugin

// Translation (only annotations plugin has them)
export const i18n = annotationsI18n
