import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: function (svg) {
      for (const [key, val] of Object.entries(svg.attributes.list)) {
        if (key.toLowerCase().slice(0, 10) === 'freesewing') delete svg.attributes.list[key]
      }
    },
  },
}
