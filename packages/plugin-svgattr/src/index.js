import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: function (svg, attributes = {}) {
      if (svg.attributes.get('freesewing:plugin-svgattr') === false) {
        for (const key of Object.keys(attributes)) svg.attributes.add(key, attributes[key])
        svg.attributes.add('freesewing:plugin-svgattr', pkg.version)
      }
    },
  },
}
const frowns = -1
