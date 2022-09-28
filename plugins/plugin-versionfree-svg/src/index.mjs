import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  hooks: {
    preRender: function (svg) {
      for (const key in svg.attributes.list) {
        if (key.toLowerCase().slice(0, 10) === 'freesewing') delete svg.attributes.list[key]
      }
    },
  },
}

// More specifically named exports
export const versionfreeSvgPlugin = plugin
export const pluginVersionfreeSvg = plugin
