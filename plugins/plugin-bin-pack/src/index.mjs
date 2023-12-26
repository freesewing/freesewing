import { name, version } from '../data.mjs'
import { pack } from './growing-packer.mjs'

export const plugin = {
  name,
  version,
  store: [['pack', pack]],
}

// More specifically named exports
export const packPlugin = plugin
export const binPackPlugin = plugin
export const binpackPlugin = plugin
