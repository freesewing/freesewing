import { name, version } from '../package.json'

export const plugin = {
  name,
  version,
  hooks: {
    preRender: function (svg, attributes = {}) {
      for (const key of Object.keys(attributes)) svg.attributes.set(key, attributes[key])
    },
  },
}

// More specifically named exports
export const bannerPlugin = plugin
export const pluginBanner = plugin

