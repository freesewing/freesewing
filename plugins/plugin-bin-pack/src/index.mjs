import about from '../about.json' with { type: 'json' }
import { pack } from './growing-packer.mjs'

export const plugin = {
  ...about,
  store: [['pack', pack]],
}

// More specifically named exports
export const packPlugin = plugin
export const binPackPlugin = plugin
export const binpackPlugin = plugin
