import { name, version } from '../data.mjs'

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
export const svgAttrPlugin = plugin
export const svgattrPlugin = plugin
export const pluginSvgAttr = plugin
export const pluginSvgattr = plugin
