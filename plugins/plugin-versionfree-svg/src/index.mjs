import { name, version } from '../package.json'

export const plugin = {
  name,
  version,
  hooks: {
    preRender: function (svg) {
      for (const [key, val] of Object.entries(svg.attributes.list)) {
        if (key.toLowerCase().slice(0, 10) === 'freesewing') delete svg.attributes.list[key]
      }
    },
  },
}

// More specifically named exports
export const versionfreeSvgPlugin = plugin
export const pluginVersionfreeSvg = plugin

