import { name, version } from '../data.mjs'
import { scalebox } from './scalebox.mjs'
import { miniscale } from './miniscale.mjs'

export const plugin = {
  name,
  version,
  macros: { scalebox, miniscale },
}

// More specifically named exports
export const scaleboxPlugin = plugin
export const pluginScalebox = plugin
